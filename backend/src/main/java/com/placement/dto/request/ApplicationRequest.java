package com.placement.dto.request;

public record ApplicationRequest(
    Long jobId,
    String coverLetter,
    String resumeUrl
) {}
