package com.placement.service;

import com.placement.dto.request.ApplicationRequest;
import com.placement.dto.response.ApplicationResponse;
import com.placement.exception.DuplicateApplicationException;
import com.placement.exception.ResourceNotFoundException;
import com.placement.exception.UnauthorizedActionException;
import com.placement.model.Application;
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
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    // ---- Student: Apply ----

    @Transactional
    public ApplicationResponse applyToJob(ApplicationRequest request, User student) {
        Long jobId = Objects.requireNonNull(request.jobId(), "Job ID must not be null");
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + jobId));

        if (job.getStatus() != Job.JobStatus.OPEN) {
            throw new IllegalStateException("This job is no longer accepting applications.");
        }

        if (applicationRepository.existsByStudentAndJob(student, job)) {
            throw new DuplicateApplicationException("You have already applied to this job.");
        }

        Application application = Application.builder()
                .student(student)
                .job(job)
                .status(Application.ApplicationStatus.APPLIED)
                .coverLetter(request.coverLetter())
                .resumeUrl(request.resumeUrl() != null
                        ? request.resumeUrl()
                        : student.getResumeUrl())
                .build();

        Application saved = applicationRepository.save(application);
        log.info("Student [{}] applied to Job [{}]", student.getEmail(), job.getId());
        return mapToResponse(saved);
    }

    // ---- Student: View own applications ----

    public List<ApplicationResponse> getMyApplications(User student) {
        return applicationRepository.findByStudent(student)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void withdrawApplication(Long applicationId, User student) {
        Application app = getApplicationOwnedBy(applicationId, student);
        if (app.getStatus() == Application.ApplicationStatus.SELECTED) {
            throw new IllegalStateException("Cannot withdraw an accepted offer.");
        }
        app.setStatus(Application.ApplicationStatus.WITHDRAWN);
        applicationRepository.save(app);
    }

    // ---- Employer: View applicants for their jobs ----

    public List<ApplicationResponse> getApplicationsForJob(Long jobId, User employer) {
        Objects.requireNonNull(jobId, "Job ID must not be null");
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + jobId));

        if (!job.getEmployer().getId().equals(employer.getId())) {
            throw new UnauthorizedActionException("You don't own this job listing");
        }
        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId,
                                                        Application.ApplicationStatus newStatus,
                                                        User requester) {
        Objects.requireNonNull(applicationId, "Application ID must not be null");
        Objects.requireNonNull(newStatus, "Status must not be null");
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found: " + applicationId));

        // Employer can update only their own job's applications; Officer/Admin can update any
        if (requester.getRole() == User.Role.EMPLOYER
                && !app.getJob().getEmployer().getId().equals(requester.getId())) {
            throw new UnauthorizedActionException("Not authorized to update this application");
        }

        app.setStatus(newStatus);
        Application saved = applicationRepository.save(app);
        log.info("Application [{}] status updated to [{}] by [{}]",
                applicationId, newStatus, requester.getEmail());
        return mapToResponse(saved);
    }

    // ---- Officer / Admin ----

    public List<ApplicationResponse> getAllApplications() {
        return applicationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationResponse addNotes(Long applicationId, String notes, User officer) {
        Objects.requireNonNull(applicationId, "Application ID must not be null");
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found: " + applicationId));
        app.setNotes(notes);
        return mapToResponse(applicationRepository.save(app));
    }

    // ---- Private helpers ----

    private Application getApplicationOwnedBy(Long id, User student) {
        Objects.requireNonNull(id, "ID must not be null");
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found: " + id));
        if (!app.getStudent().getId().equals(student.getId())) {
            throw new UnauthorizedActionException("This application doesn't belong to you");
        }
        return app;
    }

    public ApplicationResponse mapToResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .companyName(app.getJob().getCompanyName())
                .studentId(app.getStudent().getId())
                .studentName(app.getStudent().getName())
                .studentEmail(app.getStudent().getEmail())
                .branch(app.getStudent().getBranch())
                .cgpa(app.getStudent().getCgpa())
                .status(app.getStatus())
                .coverLetter(app.getCoverLetter())
                .resumeUrl(app.getResumeUrl())
                .notes(app.getNotes())
                .appliedAt(app.getAppliedAt())
                .updatedAt(app.getUpdatedAt())
                .build();
    }
}
