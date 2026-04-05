package com.placement.config;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * Configuration properties for the application (prefix: app).
 * Using Java Records for modern, immutable type-safe configuration.
 */
@ConfigurationProperties(prefix = "app")
public record AppProperties(Jwt jwt, Cors cors) {

    public record Jwt(
            String secret,
            long expirationMs,
            long refreshExpirationMs
    ) {}

    public record Cors(
            List<String> allowedOrigins
    ) {}
}
