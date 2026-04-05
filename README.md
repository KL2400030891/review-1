# 🎓 Placement Interaction System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.13-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java 21](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/technologies/downloads/#java21)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Empowering Careers through Seamless Connectivity.** A modern, high-performance university placement management platform designed for the next generation of recruitment.

---

## ✨ Overview

The **Placement Interaction System** is a sophisticated full-stack solution designed to bridge the gap between students, educators, and recruiters. Built with a focus on **visual excellence** and **operational efficiency**, it provides a centralized hub for managing the end-to-end recruitment lifecycle.

### 🌟 Premium UX/UI
- **Glassmorphic Design**: A sleek, translucent interface that feels modern and lightweight.
- **Micro-Animations**: Smooth transitions and interactive feedback powered by **Framer Motion**.
- **Dark Mode First**: Optimized for eye comfort and focus with a deep, professional color palette.
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **Strict Architecture**: Modern Spring Boot 3 backend with package-level null safety (`@NonNullApi`).

---

## 🛠️ Key Features

### 🏢 Four Dedicated Dashboards
1.  **Student Hub**: Professional profile management, one-click applications, and real-time status tracking.
2.  **Employer Portal**: Intuitive job posting, recruitment tools, and applicant screening pipelines.
3.  **Placement Officer Control**: Branch-wise performance tracking and institutional statistics.
4.  **Admin Master-Suite**: User auditing, system logs, and global configuration management.

### 🚀 Core Modules
-   **Smart Auth**: JWT-based secure authentication with granular Role-Based Access Control (RBAC).
-   **Job Engine**: Dynamic searching, filtering, and live application updates.
-   **Analytics Suite**: Visual charts and data-driven insights for administrators.
-   **Security First**: Strict null-safety implementation and modernized configuration using Java Records.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Modern CSS Properties & Glassmorphism)

### Backend
- **Framework**: **Spring Boot 3.5.13**
- **Language**: **Java 21 (LTS)**
- **Security**: **Spring Security 6 (JWT & RBAC)**
- **Database**: **H2 In-Memory** (for development) / JPA Hibernate
- **Build Tool**: Maven

---

## 🚀 Getting Started

### Prerequisites
- **Java 21 JDK**
- **Node.js** (v18 or higher)
- **Git**

### Installation & Execution

#### 1. Backend (Spring Boot)
```bash
cd backend
# For Windows
.\mvnw.cmd spring-boot:run
# For Linux/macOS
./mvnw spring-boot:run
```
*The API will be available at `http://localhost:8080`.*

#### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*The application will be available at `http://localhost:5173`.*

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@placement.edu` | `Admin@1234` |
| **Officer** | `officer@placement.edu` | `Officer@1234` |
| **Employer** | `hr@google.com` | `Employer@1234` |
| **Student** | `arjun@student.edu` | `Student@1234` |

*Note: Database is volatile (H2 in-memory). Restarting the backend will reset all data to these defaults.*

---

## 📦 Project Structure

```bash
Placement-Interaction-System/
├── backend/                # Spring Boot 3 Application
│   ├── src/main/java/      # Core logic (NonNullApi enforced)
│   ├── src/main/resources/ # Configuration & Properties
│   └── pom.xml             # Dependencies (v3.5.13)
├── frontend/               # React + Vite application
│   ├── src/                # UI Components, Pages, & Context
│   └── package.json        
├── setup-and-run.ps1       # Automated setup script
└── README.md
```

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 🤝 Contact

**Sruthi** - *Main Author*
- Project Link: [https://github.com/KL2400030891/review-1](https://github.com/KL2400030891/review-1)

---
*Created with ❤️ for better placements.*
