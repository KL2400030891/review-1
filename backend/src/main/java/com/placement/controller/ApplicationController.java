package com.placement.controller;

import com.placement.dto.request.ApplicationRequest;
import com.placement.dto.response.ApplicationResponse;
import com.placement.model.Application;
import com.placement.model.User;
import com.placement.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@SuppressWarnings("null")
public class ApplicationController {

    private final ApplicationService applicationService;

    // ---- Student: Apply ----

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationResponse> apply(@RequestBody ApplicationRequest request,
                                                     @AuthenticationPrincipal User student) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(applicationService.applyToJob(request, student));
    }

    // ---- Student: View own applications ----

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(@AuthenticationPrincipal User student) {
        return ResponseEntity.ok(applicationService.getMyApplications(student));
    }

    @DeleteMapping("/{id}/withdraw")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> withdraw(@PathVariable Long id,
                                         @AuthenticationPrincipal User student) {
        applicationService.withdrawApplication(id, student);
        return ResponseEntity.noContent().build();
    }

    // ---- Employer: Manage applicants ----

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'OFFICER', 'ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getJobApplicants(
            @PathVariable Long jobId,
            @AuthenticationPrincipal User requester) {

        // Officers/Admins can view any job's applicants; employers only their own
        List<ApplicationResponse> results;
        if (requester.getRole() == User.Role.EMPLOYER) {
            results = applicationService.getApplicationsForJob(jobId, requester);
        } else {
            results = applicationService.getAllApplications().stream()
                    .filter(a -> a.jobId().equals(jobId))
                    .toList();
        }
        return ResponseEntity.ok(results);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'OFFICER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User requester) {

        Application.ApplicationStatus status =
                Application.ApplicationStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(
                applicationService.updateApplicationStatus(id, status, requester));
    }

    // ---- Officer / Admin ----

    @GetMapping
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @PatchMapping("/{id}/notes")
    @PreAuthorize("hasAnyRole('OFFICER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> addNotes(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User officer) {
        String notes = body.getOrDefault("notes", "");
        return ResponseEntity.ok(
                applicationService.addNotes(id, notes, officer));
    }
}
