/// src/router/AppRouter.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ErrorPage } from '../pages/ErrorPage';
import { Home } from '../pages/Home';
import { Offers } from '../features/recruiters/pages/Offers';
import { Projects } from '../features/developer/pages/Projects';
import { ProjectsDetails } from '../features/developer/pages/ProjectsDetails';
import { DeveloperPublicProfile } from '../features/developer/pages/DeveloperPublicProfile';
import { DeveloperEditProfile } from '../features/developer/pages/DeveloperEditProfile';
import { DevProjectForm } from '../features/developer/pages/DevProjectForm';
import { DevApplications } from '../features/developer/pages/DevApplications';
import { RecDashBoar } from '../features/recruiters/pages/RecDashBoar';
import { RecProfile } from '../features/recruiters/pages/RecProfile';
import { RecruiterEditForm } from '../features/recruiters/pages/RecruiterEditForm';
import { RecOffers } from '../features/recruiters/pages/RecOffers';
import { RecOfferForm } from '../features/recruiters/pages/RecOfferForm';
import { RecApplications } from '../features/recruiters/pages/RecApplications';
import { MainLayout } from '../layout/MainLayout';
import { Register } from '../features/auth/register';



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Rutas públicas
      { index: true, element: <Home /> },
      { path: 'offers', element: <Offers />},
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:projectid', element: <ProjectsDetails /> },
      { path: 'developers/:developerid', element: <DeveloperPublicProfile /> },
      //{ path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      // --- Private Dev (developers) ---
      {
        path: 'private-dev',
        //element: <ProtectedRoute allowedRoles={['developer']} />,
        //loader: authLoader,
        children: [
          //{ path: 'dashboard', element: <DeveloperDashboard />, loader: developerLoader },
          { path: 'profile', element: <DeveloperPublicProfile /> },
          { path: 'profile/edit', element: <DeveloperEditProfile />},
          { path: 'projects', element: <Projects /> },
          { path: 'projects/new', element: <DevProjectForm /> },
          {path: 'projects/:projectId/edit', element: <DevProjectForm />},
          { path: 'applications', element: <DevApplications /> }
        ]
      },

      // --- Private Rec (recruiters) ---
      {
        path: 'private-rec',
        //element: <ProtectedRoute allowedRoles={['recruiter']} />,
        //loader: authLoader,  // Verifica token y rol antes de cualquiera de sus hijos
        children: [
          // 1. Dashboard principal
           { path: 'dashboard', element: <RecDashBoar />},
      
          // 2. Perfil de recruiter (ver y editar)
          {path: 'profile', element: <RecProfile />},
          {path: 'profile/edit', element: <RecruiterEditForm /> },
      
          // 3. Gestión de ofertas
          {path: 'offers', element: <RecOffers />},
          {path: 'offers/new', element: <RecOfferForm />},
          {path: 'offers/:offerId/edit', element: <RecOfferForm />},
      
          // 4. Ver candidaturas recibidas
          {path: 'applications', element: <RecApplications />}
        ]
      }
      
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}



