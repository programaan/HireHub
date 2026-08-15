# 💼 HireHub — Full Stack Job Portal

<img width="1345" height="683" alt="HireHub" src="https://github.com/user-attachments/assets/575a6e2b-2a37-4f3c-a806-f49b9782af9a" />

A modern full-stack job portal designed to connect candidates and recruiters through job discovery, applications, saved jobs, recruiter job management, and role-based dashboards.

HireHub combines a responsive **React + Vite** frontend with a **Django REST Framework** backend, **MySQL** database, **JWT authentication**, **Cloudinary media storage**, and **Mailjet email services**.

---

## 🌐 Live Demo

**Frontend:** https://hire-hub-alpha-psi.vercel.app/

---

## ✨ Features

### 👤 Candidate

* Candidate registration and login
* Email verification
* Browse available jobs
* Search and filter jobs
* View job details
* Apply for jobs
* Upload resume
* Add cover letter
* Save and unsave jobs
* View saved jobs
* Track submitted applications
* View application status
* Manage candidate profile
* Candidate dashboard

### 🏢 Recruiter

* Recruiter registration and login
* Manage recruiter profile
* Post jobs
* Edit jobs
* Delete jobs
* Manage posted jobs
* View job applications
* Review candidates
* Update application status
* Recruiter dashboard

### 🔐 Authentication

* JWT authentication
* Access and refresh tokens
* Role-based authorization
* Protected routes
* Email verification
* Forgot password
* Password reset
* Persistent authentication state

### 💼 Job Management

* Job creation and management
* Job details
* Job type
* Location
* Salary
* Experience
* Required skills
* Application deadline
* Active/inactive jobs
* Job search and filtering
* Saved jobs

### 📄 Applications

Candidates can apply to jobs with a resume and optional cover letter.

Recruiters can review applications and update their status.

Application statuses include:

* Pending
* Accepted
* Rejected

### 📊 Dashboards

Candidate and recruiter dashboards provide an overview of their respective jobs, applications, and activity.

### 🏢 Companies

Company profiles include:

* Company name
* Description
* Website
* Logo
* Location
* Industry

### 📧 Email System

HireHub uses **Mailjet** for transactional email functionality.

Supported flows include:

* Account verification
* Password reset
* Authentication-related communication

### 🖼️ Media Management

**Cloudinary** is used for cloud-based media storage and delivery.

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Axios
* JavaScript
* Lucide React
* React Icons
* React Helmet Async
* Sonner
* Responsive CSS

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* REST APIs

### Database

* MySQL

### Authentication

* JWT Authentication
* Email Verification
* Password Reset
* Role-Based Authorization
* Protected Routes

### Integrations

* Cloudinary
* Mailjet

### Deployment

* Vercel — Frontend
* Render — Backend
* Aiven — MySQL

---

## 📁 Project Structure

```text
HireHub/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── accounts/
│   ├── applications/
│   ├── companies/
│   ├── dashboard/
│   ├── jobs/
│   ├── profiles/
│   ├── config/
│   ├── templates/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## 🔄 Authentication Flow

```text
Register
   │
   ▼
Email Verification
   │
   ▼
Login
   │
   ▼
JWT Access + Refresh Tokens
   │
   ▼
Authenticated Session
   │
   ▼
Role-Based Access
   │
   ├───────────────┐
   ▼               ▼
Candidate        Recruiter
   │               │
   ▼               ▼
Candidate       Recruiter
Dashboard       Dashboard
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/programaan/HireHub
cd HireHub
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

Open another terminal:

```bash
cd backend
```

Create a virtual environment.

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the development server:

```bash
python manage.py runserver
```

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
SECRET_KEY=
DEBUG=
ALLOWED_HOSTS=
CORS_ALLOWED_ORIGINS=

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

MAILJET_API_KEY=
MAILJET_API_SECRET=
DEFAULT_FROM_EMAIL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=
```

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=
```

> ⚠️ Never commit `.env` files or private credentials to GitHub.

---

## 🛡️ Security

The application includes:

* JWT-based authentication
* Access and refresh tokens
* Protected routes
* Role-based authorization
* Backend permission checks
* Password validation
* Email verification
* Password reset flow
* CORS configuration
* Environment-based secrets
---

## 🧠 What I Learned

Through HireHub, I gained hands-on experience with:

* React component architecture
* React Router
* Vite
* Axios API integration
* Context API
* Django REST Framework
* JWT authentication
* Role-based authorization
* Protected routes
* REST API design
* MySQL database integration
* Job management
* Application management
* Saved jobs functionality
* Candidate and recruiter workflows
* Dashboard development
* Email verification
* Password reset workflows
* Cloudinary media storage
* Mailjet integration
* Responsive UI development
* Environment configuration
* Full-stack application deployment

---

## 👨‍💻 Author

Made with ❤️ by **programaan**
