
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { ErrorPage } from "../pages/ErrorPage";
// import { Home } from '../pages/Home';
import { ProjectsPage } from "../features/developer/pages/ProjectsPage";
import { NewProjectPage } from "../features/developer/pages/NewProjectPage";
import { ProjectDetailsPage } from "../features/developer/pages/ProjectDetailsPage";
import { EditProjectDetailsPage } from "../features/developer/pages/EditProjectDetailsPage";
import { ProfileDevPage } from "../features/developer/pages/ProfileDevPage";
import { EditDevProfilePage } from "../features/developer/pages/EditDevProfilePage";
import { InfoEditDevPage } from "../features/developer/pages/InfoEditDevPage";
import { DevsPage } from "../features/developer/pages/DevsPage";

import { RecProfile } from "../features/recruiters/pages/RecProfile";

import { RecOffers } from "../features/recruiters/pages/RecOffers";

import { MainLayout } from "../layout/MainLayout";
import { Register } from "../features/auth/register";
import { Login } from "../features/auth/login";
import { ResetPassword } from "../features/auth/ResetPassword";
import { OffersInfoPage } from "../features/recruiters/pages/OffersInfoPage";
import { OfferInfoPage } from "../features/recruiters/pages/OfferInfoPage";
import { DashBoardLayout } from "../layout/DashBoardLayout";
import { DashBoarPage } from "../features/recruiters/pages/DashBoarPage";
import { Onboarding } from "../pages/Onboarding/Onboarding";
import { Home } from "../pages/Home";
import { SettingsPage } from "../pages/SettingsPage";
import { TermsPage, PrivacyPage, CookiesPage, AboutPage } from "./LegalRoutes";
import { Contact } from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, // Protección general
        children: [
          // Rutas públicas
          { index: true, element: <Home /> },
          { path: "offers", element: <OffersInfoPage /> },
          { path: "offers/:id", element: <OfferInfoPage /> },
          { path: "projects", element: <ProjectsPage /> },
          { path: "projects/:id", element: <ProjectDetailsPage /> },
          { path: "profile/:developerid", element: <ProfileDevPage /> },
          { path: "developers", element: <DevsPage /> },
          { path: "recruiter/:id", element: <RecProfile /> },

          { path: "onboarding", element: <Onboarding /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "reset-password/:token", element: <ResetPassword /> },

          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "about", element: <AboutPage /> },
          { path: "legal/terms", element: <TermsPage /> },
          { path: "legal/privacy", element: <PrivacyPage /> },
          { path: "legal/cookies", element: <CookiesPage /> },
          { path: "contact", element: <Contact /> },

          // --- Private Dev (developers) ---
          {
            path: "private-dev",
            //element: <ProtectedRoute allowedRoles={['developer']} />,
            //loader: authLoader,
            children: [
              //{ path: 'dashboard', element: <DeveloperDashboard />, loader: developerLoader },
              { path: "profile", element: <ProfileDevPage /> },
              { path: "profile/edit", element: <EditDevProfilePage /> },
              { path: "projects", element: <ProjectsPage /> },
              { path: "projects/new", element: <NewProjectPage /> },
              {
                path: "projects/:projectId/edit",
                element: <EditProjectDetailsPage />,
              },
              {
                path: "developers/:developerid/edit",
                element: <InfoEditDevPage />,
              },
              { path: "profile", element: <RecProfile /> },
            ],
          },

          // --- Private Rec (recruiters) ---
          {
            path: "private-rec",
            element: <DashBoardLayout />,
            //element: <ProtectedRoute allowedRoles={['recruiter']} />,
            //loader: authLoader,  // Verifica token y rol antes de cualquiera de sus hijos
            children: [
              // 1. Dashboard principal
              { path: "dashboard/:offerId", element: <DashBoarPage /> },

              // 2. Perfil de recruiter (ver y editar)
              { path: "profile", element: <RecProfile /> },

              // 3. Gestión de ofertas
              { path: "offers", element: <RecOffers /> },

              // 4. Ver candidaturas recibidas
              
            ],
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
