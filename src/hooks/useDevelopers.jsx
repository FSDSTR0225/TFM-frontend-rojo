import { useEffect, useState } from "react";
import { getAllDevelopers } from "../services/devService";
import { getAllProjects } from "../services/projectService";

export const useDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devResponse, projectResponse] = await Promise.all([
          getAllDevelopers(),
          getAllProjects(),
        ]);

        if (devResponse?.error || projectResponse?.error) {
          console.error("Error fetching developers or projects");
          setDevelopers([]);
          return;
        }

        const projectsByDev = {};
        projectResponse.forEach((project) => {
          const devId = project.owner?._id;
          if (!devId) return;

          if (!projectsByDev[devId]) projectsByDev[devId] = [];
          projectsByDev[devId].push(project);
        });

        const now = new Date();
        const THIRTY_DAYS_AGO = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const enrichedDevs = devResponse.map((dev) => {
          const devId = dev._id;
          const devProjects = projectsByDev[devId] || [];

          const devCategories = devProjects.map((p) => p.category);
          const uniqueCategories = [...new Set(devCategories)];
          const categories = uniqueCategories.length > 0 ? uniqueCategories : ["Other"];

          let coverImage = null;
          const firstProject = devProjects[0];
          if (firstProject?.gallery?.length > 0) {
            coverImage = firstProject.gallery[0];
          }

          let totalLikes = 0;
          let recentLikes = 0;

          devProjects.forEach((p) => {
            totalLikes += p.likes || 0;

            const createdAt = new Date(p.createdAt || p.updatedAt || now);
            if (createdAt >= THIRTY_DAYS_AGO) {
              recentLikes += p.likes || 0;
            }
          });

          const professionalPosition = dev.role?.developer?.professionalPosition || null;
          const skills = dev.role?.developer?.skills || [];

          const hasNameSurnameAvatar = !!dev.name && !!dev.surname && !!dev.avatar;
          const hasProfessionalPosition = professionalPosition !== null;
          const hasSkills = Array.isArray(skills) && skills.length > 0;

          // Mínimos para entrar en la lista
          const hasMinimumRequiredData =
            hasNameSurnameAvatar && hasProfessionalPosition && hasSkills;

          // Cumple todo incluyendo imagen
          const hasRequiredData = hasMinimumRequiredData && !!coverImage;

          // Sólo falta la imagen del proyecto
          const missingOnlyProjectImage = hasMinimumRequiredData && !coverImage;

          return {
            ...dev,
            categories,
            coverImage,
            projects: devProjects,
            totalLikes,
            recentLikes,
            professionalPosition,
            skills,
            hasRequiredData,
            missingOnlyProjectImage,
          };
        });

        // Solo los que cumplen mínimos y tienen imagen
        const withAllData = enrichedDevs.filter((d) => d.hasRequiredData);

        withAllData.sort((a, b) => b.recentLikes - a.recentLikes);

        let topDevs = withAllData.slice(0, 4);

        if (topDevs.length < 4) {
          const remainingNeeded = 4 - topDevs.length;

          // Candidatos que cumplen mínimos pero sólo falta imagen
          const candidates = enrichedDevs.filter(
            (d) => d.missingOnlyProjectImage && !topDevs.includes(d)
          );

          const notInTop = candidates
            .sort((a, b) => b.totalLikes - a.totalLikes)
            .slice(0, remainingNeeded);

          topDevs = [...topDevs, ...notInTop];
        }

        setDevelopers(topDevs);
      } catch (error) {
        console.error("Error loading developers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { developers, loading };
};
