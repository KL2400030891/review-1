package com.placement.repository;

import com.placement.model.Application;
import com.placement.model.User;
import com.placement.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudent(User student);

    List<Application> findByJob(Job job);

    List<Application> findByJobId(Long jobId);

    Optional<Application> findByStudentAndJob(User student, Job job);

    boolean existsByStudentAndJob(User student, Job job);

    @Query("SELECT COUNT(a) FROM Application a WHERE a.job.employer.id = :employerId")
    long countByEmployerId(Long employerId);

    @Query("SELECT a FROM Application a WHERE a.job.employer.id = :employerId")
    List<Application> findByEmployerId(Long employerId);

    @Query("SELECT COUNT(a) FROM Application a WHERE a.status = 'SELECTED'")
    long countSelected();

    @Query("SELECT a.status, COUNT(a) FROM Application a GROUP BY a.status")
    List<Object[]> countGroupByStatus();
}
