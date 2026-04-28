package com.placement.controller;

import com.placement.dto.request.LoginRequest;
import com.placement.dto.request.RegisterRequest;
import com.placement.dto.response.AuthResponse;
import com.placement.model.User;
import com.placement.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void register_shouldReturnCreated() throws Exception {
        // Arrange
        RegisterRequest request = new RegisterRequest("Test User", "test@example.com", "password123", User.Role.STUDENT, "Computer Science", "2025", 8.5, null, null);
        AuthResponse response = AuthResponse.builder()
            .accessToken("token")
            .tokenType("Bearer")
            .user(AuthResponse.UserInfo.builder()
                .id(1L)
                .name("Test User")
                .email("test@example.com")
                .role(User.Role.STUDENT)
                .status(User.UserStatus.ACTIVE)
                .build())
            .build();
        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.accessToken").value("token"));
    }

    @Test
    void login_shouldReturnOk() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("test@example.com", "password123");
        AuthResponse response = AuthResponse.builder()
            .accessToken("token")
            .tokenType("Bearer")
            .user(AuthResponse.UserInfo.builder()
                .id(1L)
                .name("Test User")
                .email("test@example.com")
                .role(User.Role.STUDENT)
                .status(User.UserStatus.ACTIVE)
                .build())
            .build();
        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.accessToken").value("token"));
    }
}