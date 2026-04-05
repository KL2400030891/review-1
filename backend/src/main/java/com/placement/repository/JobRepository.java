package com.placement.repository;

import com.placement.model.Job;
import com.placement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByEmployer(User employer);

    List<Job> findByStatus(Job.JobStatus status);

    List<Job> findByTitleContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(
            String title, String companyName);

    @Query("SELECT j FROM Job j WHERE j.status = 'OPEN' ORDER BY j.createdAt DESC")
    List<Job> findAllOpenJobs();

    @Query("SELECT COUNT(j) FROM Job j WHERE j.employer.id = :employerId AND j.status = 'OPEN'")
    long countOpenJobsByEmployer(Long employerId);

    @Query("SELECT COUNT(j) FROM Job j WHERE j.status = 'OPEN'")
    long countOpenJobs();

    List<Job> findByCategoryIgnoreCase(String category);
}
