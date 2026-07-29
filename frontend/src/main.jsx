import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/jobs.css";
import "./styles/job-details.css";
import "./styles/dashboard.css";
import "./styles/profile.css";
import "./styles/account.css";
import "./styles/companies.css";
import "./styles/postjob.css";
import "./styles/savedjobs.css";
import "./styles/loader.css";
import "./styles/applications.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HelmetProvider>
          <App />
            <Toaster
              position="top-right"
              richColors
              closeButton
              expand={true}
              offset={20}
            />
        </HelmetProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);