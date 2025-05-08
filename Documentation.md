# Documentación del Proyecto TFM-Frontend-Rojo

Este documento mantiene un registro actualizado del proyecto, sus funcionalidades y los cambios realizados por el equipo.

## Beli Ochando - 02-05

Frontend:
Create new branch: feature/DevProfile
Create mains developers and projects pages and components
Import routers to new pages and components in "AppRouter.jsx".
Change in header: name of file "ofertas" to "jobs". The link is keeping "offers". Maybe we had to change in the future to "/jobs".
Change in header: name of file "porfolios" to "projects". The link is changed to "projects".
Test new pages in web.
Logotype provisional implementation in header and footer. Two differents styles.

New Branch: feature/Projects.
Creation of generic ProjectCard.jsx component: Created with basic initial styles. Needs to be refined later using daisyUI.
Implementation in ProjectPage with a frontend array for layout purposes. Once the layout is complete, we’ll fetch data from the backend.
Implementation of 8px-based sizing for components and gaps between them. Responsive layout adjustment of the website.
Maximum width: 1360px
Card width (max 3 cards): 432px
Card height: 256px
Gap between components: 32px

---

## Carlos Damota - 04-05

Frontend:
Create new branch: feature/offers
Enhanced the offers page with several improvements:

- Added timestamp display showing days since post creation
- Implemented improved card layout with better styling
- Created reusable OfferCard component
- Added applicant count display for each offer
- Integrated new icons for better visual feedback
- Improved responsive design with proper spacing
- Added link functionality to offer cards for navigation

---

## Carlos Damota - 06-05

Frontend:
Enhanced offers page interface and components:

- Created new EditButton reusable component with integrated onClick handler
- Added new SectionOffers component for consistent layout
- Enhanced OfferInfoPage with detailed recruiter information display:
  - Recruiter logo
  - Recruiter contact details
  - Website links
  - Email contact
- Improved overall layout and styling:
  - Enhanced card shadows and borders
  - Adjusted grid layout for better responsiveness
  - Refined spacing and alignment
  - Updated color scheme in MainLayout
- Enhanced OffertList component with improved grid system
- Added new icons for external links and email contacts

---

## Beli Ochando - 06-05

Frontend:

- Accent color correction for developers.
- Created a projectServices file to centralize all project-related fetch calls.
- Implemented the getAllProjects fetch function.
- Created and commented the ProjectsPage component, including the import of getAllProjects from projectServices, and the useEffect to fetch data from the backend (to be completed once we can render the full project card).
- Verified that the frontend receives data from the backend, but rendering is pending until the database is cleaned and image imports are available.
- Created the Pagination component with styles to allow functional page transitions.
- Renamed badge component to Badge.
- Added small category labels in the “All” tab. These disappear when switching to a different category.
- Added a loading animation when switching pages.
- Updated logo colors in reversed order: green for devs and projects, blue for offers and recruiters.
- Updated ProjectCard.jsx, separating name and surname.

---

## Carlos Damota - 08-05

Frontend:
Continued enhancement of offers functionality and components:

- Added new MainRecButton component for consistent recruiter-related actions
- Created SectionContainer component for standardized layout sections
- Refactored OfferCard and OfferInfoPage components for improved functionality:
  - Implemented proper loading states
  - Enhanced data handling and passing
  - Updated component structure for better maintainability
- Refactored RecContactCard component for better user experience
- Updated OfferInfo component with loading state management
- Fixed component naming consistency in OfferList
- Added new offers service functions for data management

---
