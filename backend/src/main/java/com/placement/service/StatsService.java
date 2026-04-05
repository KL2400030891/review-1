package com.placement.service;

import com.placement.model.SystemLog;
import com.placement.model.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import com.placement.repository.SystemLogRepository;
import com.placement.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final SystemLogRepository systemLogRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // User counts
        stats.put("totalStudents",  userRepository.countByRole(User.Role.STUDENT));
        stats.put("totalEmployers", userRepository.countByRole(User.Role.EMPLOYER));
        stats.put("totalOfficers",  userRepository.countByRole(User.Role.OFFICER));

        // Job counts
        stats.put("totalJobs",   jobRepository.count());
        stats.put("openJobs",    jobRepository.countOpenJobs());

        // Application counts
        stats.put("totalApplications",  applicationRepository.count());
        stats.put("totalPlacements",    applicationRepository.countSelected());

        // Application status breakdown
        List<Object[]> statusCounts = applicationRepository.countGroupByStatus();
        Map<String, Long> statusMap = new HashMap<>();
        for (Object[] row : statusCounts) {
            statusMap.put(row[0].toString(), (Long) row[1]);
        }
        stats.put("applicationsByStatus", statusMap);

        return stats;
    }

    public Page<SystemLog> getLogs(int page, int size) {
        return systemLogRepository.findAllByOrderByTimestampDesc(
                PageRequest.of(page, size, Sort.by("timestamp").descending())
        );
    }

    @SuppressWarnings("null")
    public void log(String action, String entityType, Long entityId,
                    String details, User performedBy,
                    HttpServletRequest request,
                    SystemLog.LogLevel level) {
        String ip = request != null
                ? request.getRemoteAddr()
                : "system";

        SystemLog log = SystemLog.builder()
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .details(details)
                .performedBy(performedBy)
                .ipAddress(ip)
                .level(level)
                .build();

        systemLogRepository.save(log);
    }
}
