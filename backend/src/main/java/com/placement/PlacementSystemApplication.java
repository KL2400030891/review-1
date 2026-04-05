package com.placement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PlacementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlacementSystemApplication.class, args);
    }
}
