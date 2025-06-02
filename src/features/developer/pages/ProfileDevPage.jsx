import React, { useState, useEffect, useContext } from 'react';
import InfoDeveloper from "../components/InfoDeveloper";
import { getProfileDev } from '../../../services/profileService'; 
import { useParams } from 'react-router';
import { AuthContext } from '../../../context/authContext'; // Asegúrate de tener esto

export function ProfileDevPage() {
  const { developerid } = useParams();
  const { profile: authProfile, token } = useContext(AuthContext);
 
  const [profileToShow, setProfileToShow] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
          // Si hay developerid en la URL, vista pública
          if (developerid) {
            const response = await getProfileDev(developerid);
            setProfileToShow(response);
          } else {
            // Si no hay developerid, es perfil privado → usamos el del contexto
            setProfileToShow(authProfile);
          }
        } catch (error) {
          console.error("Error al cargar el perfil", error);
        }
    };

    fetchProfile(); 
  }, [developerid, authProfile]);

  if (!profileToShow) return <p>Cargando perfil...</p>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <InfoDeveloper 
        profileInfo={profileToShow}
        isOwner={!developerid} // si no hay id, estás viendo tu propio perfil
        token={token}
      />
    </div>
  );
}




