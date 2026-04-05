package com.placement.controller;

import com.placement.dto.request.JobRequest;
import com.placement.dto.response.JobResponse;
import com.placement.model.User;
import com.placement.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // ---- Public endpoints ----

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllOpenJobs(
            @RequestParam(required = false) String q) {
        List<JobResponse> jobs = (q != null && !q.isBlank())
                ? jobService.searchJobs(q)
                : jobService.getAllOpenJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // ---- Employer endpoints ----

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<JobResponse> postJob(@Valid @RequestBody JobRequest request,
                                               @AuthenticationPrincipal User employer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.postJob(request, employer));
    }

    @GetMapping("/my-listings")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<JobResponse>> getMyJobs(@AuthenticationPrincipal User employer) {
        return ResponseEntity.ok(jobService.getJobsByEmployer(employer));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id,
                                                 @Valid @RequestBody JobRequest request,
                                                 @AuthenticationPrincipal User employer) {
        return ResponseEntity.ok(jobService.updateJob(id, request, employer));
    }

    @PatchMapping("/{id}/close")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Void> closeJob(@PathVariable Long id,
                                         @AuthenticationPrincipal User employer) {
        jobService.closeJob(id, employer);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id,
                                          @AuthenticationPrincipal User requester) {
        jobService.deleteJob(id, requester);
        return ResponseEntity.noContent().build();
    }

    // ---- Officer / Admin ----

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN')")
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }
}
