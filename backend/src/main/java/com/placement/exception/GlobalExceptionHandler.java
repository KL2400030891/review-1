package com.placement.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler using RFC 7807 Problem Details for better standardized error formatting.
 */
@Slf4j
@RestControllerAdvice
@SuppressWarnings("null")
public class GlobalExceptionHandler {

    // ---- 400 Bad Request ----

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            fieldErrors.put(field, error.getDefaultMessage());
        });

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Input validation failed");
        problemDetail.setTitle("Validation Failed");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        problemDetail.setProperty("errors", fieldErrors);
        return problemDetail;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgument(IllegalArgumentException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage(), request);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ProblemDetail handleIllegalState(IllegalStateException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.CONFLICT, "Conflict", ex.getMessage(), request);
    }

    // ---- 401 Unauthorized ----

    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentials(BadCredentialsException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.UNAUTHORIZED, "Unauthorized", "Invalid email or password", request);
    }

    @ExceptionHandler(DisabledException.class)
    public ProblemDetail handleDisabled(DisabledException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.UNAUTHORIZED, "Account Disabled",
                "Your account has been disabled. Please contact support.", request);
    }

    @ExceptionHandler(LockedException.class)
    public ProblemDetail handleLocked(LockedException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.UNAUTHORIZED, "Account Locked",
                "Your account has been suspended.", request);
    }

    // ---- 403 Forbidden ----

    @ExceptionHandler({AccessDeniedException.class, UnauthorizedActionException.class})
    public ProblemDetail handleAccessDenied(RuntimeException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.FORBIDDEN, "Forbidden",
                "You don't have permission to perform this action", request);
    }

    // ---- 404 Not Found ----

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.NOT_FOUND, "Not Found", ex.getMessage(), request);
    }

    // ---- 409 Conflict ----

    @ExceptionHandler({EmailAlreadyExistsException.class, DuplicateApplicationException.class})
    public ProblemDetail handleConflict(RuntimeException ex, WebRequest request) {
        return buildProblemDetail(HttpStatus.CONFLICT, "Conflict", ex.getMessage(), request);
    }

    // ---- 500 Server Error ----

    @ExceptionHandler(Exception.class)
    @SuppressWarnings("null")
    public ProblemDetail handleGeneric(Exception ex, WebRequest request) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return buildProblemDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error",
                "An unexpected error occurred. Please try again later.", request);
    }

    // ---- Helper ----

    @SuppressWarnings("null")
    private ProblemDetail buildProblemDetail(HttpStatus status, String title, String detail, WebRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, detail != null ? detail : "No details provided");
        problemDetail.setTitle(title);
        String description = request.getDescription(false);
        String path = description != null ? description.replace("uri=", "") : "/";
        problemDetail.setInstance(java.net.URI.create(path));
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }
}
