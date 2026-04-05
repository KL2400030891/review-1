package com.placement.service;

import com.placement.dto.response.UserResponse;
import com.placement.exception.ResourceNotFoundException;
import com.placement.model.User;
import com.placement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse getCurrentUser(User user) {
        return mapToResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<UserResponse> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        return mapToResponse(getUser(id));
    }

    @Transactional
    public UserResponse updateProfile(Long id, Map<String, Object> updates, User requester) {
        User user = getUser(id);

        // Only self or admin can update
        if (!user.getId().equals(requester.getId()) && requester.getRole() != User.Role.ADMIN) {
            throw new SecurityException("Not authorized to update this profile");
        }

        updates.forEach((field, value) -> {
            if (value == null || value.toString().isBlank()) return;
            switch (field) {
                case "name"           -> user.setName(value.toString());
                case "branch"         -> user.setBranch(value.toString());
                case "graduationYear" -> user.setGraduationYear(value.toString());
                case "cgpa"           -> user.setCgpa(Double.parseDouble(value.toString()));
                case "skills"         -> user.setSkills(value.toString());
                case "resumeUrl"      -> user.setResumeUrl(value.toString());
                case "companyName"    -> user.setCompanyName(value.toString());
                case "designation"    -> user.setDesignation(value.toString());
                case "companyWebsite" -> user.setCompanyWebsite(value.toString());
            }
        });

        return mapToResponse(userRepository.save(user));
    }

    @Transactional
    public void changePassword(User user, String currentPassword, String newPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional
    public UserResponse updateUserStatus(Long id, User.UserStatus status) {
        User user = getUser(id);
        user.setStatus(status);
        User saved = userRepository.save(user);
        log.info("User [{}] status changed to [{}]", id, status);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = getUser(id);
        userRepository.delete(Objects.requireNonNull(user));
        log.info("User [{}] deleted", id);
    }

    // ---- Stats for admin/officer ----

    public Map<String, Long> getUserStats() {
        return Map.of(
                "totalStudents",  userRepository.countByRole(User.Role.STUDENT),
                "totalEmployers", userRepository.countByRole(User.Role.EMPLOYER),
                "totalOfficers",  userRepository.countByRole(User.Role.OFFICER),
                "totalAdmins",    userRepository.countByRole(User.Role.ADMIN)
        );
    }

    // ---- Helpers ----

    private User getUser(Long id) {
        Objects.requireNonNull(id, "User ID must not be null");
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    public UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .branch(user.getBranch())
                .graduationYear(user.getGraduationYear())
                .cgpa(user.getCgpa())
                .skills(user.getSkills())
                .resumeUrl(user.getResumeUrl())
                .companyName(user.getCompanyName())
                .designation(user.getDesignation())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
