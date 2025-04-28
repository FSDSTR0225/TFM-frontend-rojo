/// src/router/AppRouter.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';



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
      { path: 'projects/:projectid', element: <ProjectDetails /> },
      { path: 'developers/:developerid', element: <DeveloperProfilePublic /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      // --- Private Dev (developers) ---
      {
        path: 'private-dev',
        element: <ProtectedRoute allowedRoles={['developer']} />,
        loader: authLoader,
        children: [
          //{ path: 'dashboard', element: <DeveloperDashboard />, loader: developerLoader },
          { path: 'profile', element: <DeveloperProfilePublic /> },
          { path: 'profile/edit', element: <DeveloperEditProfile />},
          { path: 'projects', element: <DeveloperProjects /> },
          { path: 'projects/new', element: <DevProjectForm /> },
          {path: 'projects/:projectId/edit', element: <DevProjectForm />},
          { path: 'applications', element: <DeveloperApplications /> }
        ]
      },

      // --- Private Rec (recruiters) ---
      {
        path: 'private-rec',
        element: <ProtectedRoute allowedRoles={['recruiter']} />,
        loader: authLoader,  // Verifica token y rol antes de cualquiera de sus hijos
        children: [
          // 1. Dashboard principal
           { path: 'dashboard', element: <RecDashboard />},
      
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



