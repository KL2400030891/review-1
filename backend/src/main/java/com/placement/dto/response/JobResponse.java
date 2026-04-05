package com.placement.dto.response;

import com.placement.model.Job;
import lombok.Builder;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record JobResponse(
    Long id,
    String title,
    String description,
    String companyName,
    String location,
    String salary,
    List<String> requirements,
    Job.RoleType roleType,
    Job.JobStatus status,
    String category,
    Long employerId,
    String employerName,
    String employerEmail,
    LocalDateTime createdAt,
    LocalDateTime deadline,
    long applicantCount
) {}
