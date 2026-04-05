package com.placement.dto.request;

import com.placement.model.Job;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public record JobRequest(
    @NotBlank(message = "Job title is required")
    String title,

    @NotBlank(message = "Description is required")
    String description,

    @NotBlank(message = "Company name is required")
    String companyName,

    @NotBlank(message = "Location is required")
    String location,

    String salary,
    List<String> requirements,
    Job.RoleType roleType,
    String category,
    LocalDateTime deadline
) {}
