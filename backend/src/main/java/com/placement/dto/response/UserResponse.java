package com.placement.dto.response;

import com.placement.model.User;
import lombok.Builder;
import java.time.LocalDateTime;

@Builder
public record UserResponse(
    Long id,
    String name,
    String email,
    User.Role role,
    User.UserStatus status,
    String branch,
    String graduationYear,
    Double cgpa,
    String skills,
    String companyName,
    String designation,
    String resumeUrl,
    LocalDateTime createdAt
) {}
