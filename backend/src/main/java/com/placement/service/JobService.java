package com.placement.service;

import com.placement.dto.request.JobRequest;
import com.placement.dto.response.JobResponse;
import com.placement.exception.ResourceNotFoundException;
import com.placement.exception.UnauthorizedActionException;
import com.placement.model.Job;
import com.placement.model.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    // ---- Public ----

    public List<JobResponse> getAllOpenJobs() {
        return jobRepository.findAllOpenJobs()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public JobResponse getJobById(Long id) {
        Objects.requireNonNull(id, "Job ID must not be null");
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + id));
        return mapToResponse(job);
    }

    public List<JobResponse> searchJobs(String query) {
        return jobRepository.findByTitleContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(query, query)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ---- Employer ----

    @Transactional
    public JobResponse postJob(JobRequest request, User employer) {
        Job job = Job.builder()
                .title(request.title())
                .description(request.description())
                .companyName(request.companyName())
                .location(request.location())
                .salary(request.salary())
                .requirements(request.requirements())
                .roleType(request.roleType() != null ? request.roleType() : Job.RoleType.FULL_TIME)
                .status(Job.JobStatus.OPEN)
                .category(request.category())
                .employer(employer)
                .deadline(request.deadline())
                .build();

        Job saved = jobRepository.save(job);
        log.info("Job posted [{}] by employer [{}]", saved.getId(), employer.getEmail());
        return mapToResponse(saved);
    }

    public List<JobResponse> getJobsByEmployer(User employer) {
        return jobRepository.findByEmployer(employer)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobResponse updateJob(Long id, JobRequest request, User employer) {
        Job job = getJobOwnedBy(id, employer);

        job.setTitle(request.title());
        job.setDescription(request.description());
        job.setLocation(request.location());
        job.setSalary(request.salary());
        job.setRequirements(request.requirements());
        if (request.roleType() != null) job.setRoleType(request.roleType());
        job.setCategory(request.category());
        job.setDeadline(request.deadline());

        return mapToResponse(jobRepository.save(job));
    }

    @Transactional
    public void closeJob(Long id, User employer) {
        Job job = getJobOwnedBy(id, employer);
        job.setStatus(Job.JobStatus.CLOSED);
        jobRepository.save(job);
        log.info("Job [{}] closed by employer [{}]", id, employer.getEmail());
    }

    @Transactional
    public void deleteJob(Long id, User requester) {
        Objects.requireNonNull(id, "Job ID must not be null");
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + id));

        // Only owner or admin can delete
        if (!job.getEmployer().getId().equals(requester.getId())
                && requester.getRole() != User.Role.ADMIN) {
            throw new UnauthorizedActionException("Not authorized to delete this job");
        }
        jobRepository.delete(job);
        log.info("Job [{}] deleted by [{}]", id, requester.getEmail());
    }

    // ---- Admin / Officer ----

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ---- Private helpers ----

    private Job getJobOwnedBy(Long id, User employer) {
        Objects.requireNonNull(id, "Job ID must not be null");
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + id));
        if (!job.getEmployer().getId().equals(employer.getId())) {
            throw new UnauthorizedActionException("You don't own this job listing");
        }
        return job;
    }

    public JobResponse mapToResponse(Job job) {
        long applicantCount = applicationRepository.findByJob(job).size();
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .companyName(job.getCompanyName())
                .location(job.getLocation())
                .salary(job.getSalary())
                .requirements(job.getRequirements())
                .roleType(job.getRoleType())
                .status(job.getStatus())
                .category(job.getCategory())
                .employerId(job.getEmployer().getId())
                .employerName(job.getEmployer().getName())
                .employerEmail(job.getEmployer().getEmail())
                .createdAt(job.getCreatedAt())
                .deadline(job.getDeadline())
                .applicantCount(applicantCount)
                .build();
    }
}
