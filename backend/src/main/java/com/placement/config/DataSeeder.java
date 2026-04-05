package com.placement.config;

import com.placement.model.Application;
import com.placement.model.Job;
import com.placement.model.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import com.placement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Seeds demo data in local dev (H2) on every startup.
 * NOT active in production (profile "prod").
 * Following clean code practices and "better format" for configuration.
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
@SuppressWarnings("null")
public class DataSeeder {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    @Profile("!prod")
    public ApplicationRunner seedData() {
        return args -> {
            if (userRepository.count() > 0) {
                log.info("Database already seeded — skipping.");
                return;
            }

            log.info("Seeding demo data...");
            seedUsersAndJobs();
            log.info("✅ Demo data seeded successfully!");
            log.info("  Admin:    admin@placement.edu / Admin@1234");
            log.info("  Officer:  officer@placement.edu / Officer@1234");
            log.info("  Employer: hr@google.com / Employer@1234");
            log.info("  Student:  arjun@student.edu / Student@1234");
        };
    }

    @SuppressWarnings("null")
    private void seedUsersAndJobs() {
        // Users
        createUser("Admin User", "admin@placement.edu", "Admin@1234", User.Role.ADMIN);
        createUser("Prof. Placement Officer", "officer@placement.edu", "Officer@1234", User.Role.OFFICER);
        
        User employer1 = createUser("Google HR Team", "hr@google.com", "Employer@1234", User.Role.EMPLOYER);
        employer1.setCompanyName("Google");
        employer1.setDesignation("HR Manager");
        userRepository.save(employer1);

        User employer2 = createUser("Microsoft Recruiter", "hr@microsoft.com", "Employer@1234", User.Role.EMPLOYER);
        employer2.setCompanyName("Microsoft");
        employer2.setDesignation("Technical Recruiter");
        userRepository.save(employer2);

        User student1 = createUser("Arjun Kumar", "arjun@student.edu", "Student@1234", User.Role.STUDENT);
        student1.setBranch("Computer Science");
        student1.setGraduationYear("2025");
        student1.setCgpa(8.7);
        student1.setSkills("Java,Spring Boot,React,SQL");
        userRepository.save(student1);

        User student2 = createUser("Priya Sharma", "priya@student.edu", "Student@1234", User.Role.STUDENT);
        student2.setBranch("Electronics & Communication");
        student2.setGraduationYear("2025");
        student2.setCgpa(9.1);
        student2.setSkills("Python,ML,TensorFlow,Data Analysis");
        userRepository.save(student2);

        // Jobs
        Job job1 = createJob("Software Engineer (Java)", "Join our core engineering team working on scalable backend systems.", 
                "Google", "Bangalore, India", "₹18 LPA - ₹30 LPA", List.of("Java", "Spring Boot", "SQL"), employer1);
        
        Job job2 = createJob("Data Scientist Intern", "Work on ML research projects.", 
                "Google", "Hyderabad, India (Remote)", "₹60,000/month", List.of("Python", "TensorFlow"), employer1);

        Job job3 = createJob("Cloud Solutions Architect", "Design enterprise cloud solutions on Azure.", 
                "Microsoft", "Pune, India", "₹25 LPA - ₹45 LPA", List.of("Azure", "DevOps"), employer2);

        // Applications
        createApplication(student1, job1, Application.ApplicationStatus.INTERVIEWING, "I have 2 years of Spring Boot experience.");
        createApplication(student2, job2, Application.ApplicationStatus.SHORTLISTED, "My ML research aligns with this role.");
        createApplication(student1, job3, Application.ApplicationStatus.APPLIED, "Excited about cloud technologies.");
    }

    private User createUser(String name, String email, String password, User.Role role) {
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .status(User.UserStatus.ACTIVE)
                .build();
        return userRepository.save(user);
    }

    private Job createJob(String title, String desc, String company, String loc, String salary, List<String> reqs, User employer) {
        Job job = Job.builder()
                .title(title)
                .description(desc)
                .companyName(company)
                .location(loc)
                .salary(salary)
                .requirements(reqs)
                .roleType(Job.RoleType.FULL_TIME)
                .status(Job.JobStatus.OPEN)
                .category("Placement")
                .employer(employer)
                .deadline(LocalDateTime.now().plusDays(30))
                .build();
        return jobRepository.save(job);
    }

    private void createApplication(User student, Job job, Application.ApplicationStatus status, String coverLetter) {
        Application app = Application.builder()
                .student(student)
                .job(job)
                .status(status)
                .coverLetter(coverLetter)
                .build();
        applicationRepository.save(app);
    }
}
