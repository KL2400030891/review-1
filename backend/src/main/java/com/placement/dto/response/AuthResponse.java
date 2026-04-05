package com.placement.dto.response;

import com.placement.model.User;
import lombok.Builder;

@Builder
public record AuthResponse(
    String accessToken,
    String tokenType,
    UserInfo user
) {
    @Builder
    public record UserInfo(
        Long id,
        String name,
        String email,
        User.Role role,
        User.UserStatus status
    ) {}
}
