package com.placement.dto.response;

import com.placement.model.Application;
import lombok.Builder;
import java.time.LocalDateTime;

@Builder
public record ApplicationResponse(
    Long id,
    Long jobId,
    String jobTitle,
    String companyName,
    Long studentId,
    String studentName,
    String studentEmail,
    String branch,
    Double cgpa,
    Application.ApplicationStatus status,
    String coverLetter,
    String resumeUrl,
    String notes,
    LocalDateTime appliedAt,
    LocalDateTime updatedAt
) {}
