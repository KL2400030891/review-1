package com.placement.repository;

import com.placement.model.SystemLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {

    Page<SystemLog> findAllByOrderByTimestampDesc(Pageable pageable);

    Page<SystemLog> findByLevelOrderByTimestampDesc(SystemLog.LogLevel level, Pageable pageable);

    Page<SystemLog> findByEntityTypeOrderByTimestampDesc(String entityType, Pageable pageable);
}
