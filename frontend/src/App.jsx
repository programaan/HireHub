import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Account from "./pages/Account";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import Applications from "./pages/Applications";
import JobApplications from "./pages/JobApplications";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import CompanyProfile from "./pages/CompanyProfile";
import SavedJobs from "./pages/SavedJobs";
import Companies from "./pages/Companies";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/verify-email/:uid/:token" element={<VerifyEmail />} />

        <Route path="/candidate/dashboard"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/applications"
          element={
            <ProtectedRoute role="candidate">
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route path="/saved-jobs"
          element={
            <ProtectedRoute role="candidate">
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route path="/profile"
          element={
            <ProtectedRoute role="candidate">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/recruiter/post-job"
          element={
            <ProtectedRoute role="recruiter">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route path="/recruiter/jobs/:id/edit"
          element={
            <ProtectedRoute role="recruiter">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route path="/recruiter/jobs/:id/applications"
          element={
            <ProtectedRoute role="recruiter">
              <JobApplications />
            </ProtectedRoute>
          }
        />

        <Route path="/company-profile"
          element={
            <ProtectedRoute role="recruiter">
              <CompanyProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/companies" element={<Companies />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;