import React, { useState, useEffect, useContext } from 'react';
import InfoDeveloper from "../components/InfoDeveloper";
import { getProfileDev } from '../../../services/profileService'; 
import { useParams } from 'react-router';
import { AuthContext } from '../../../context/authContext';
export function ProfileDevPage() {
  const { developerid } = useParams();
  const { profile: authProfile, token } = useContext(AuthContext);
 
  const [profileToShow, setProfileToShow] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
          if (developerid) {
            const response = await getProfileDev(developerid);
            setProfileToShow(response);
          } else {
            setProfileToShow(authProfile);
          }
        } catch (error) {
          console.error("Error loading profile", error);
        }
    };

    fetchProfile(); 
  }, [developerid, authProfile]);

  const handleUpdate = (updatedProfile) => {
    setProfileToShow(updatedProfile);
  };

  if (!profileToShow) return <p>Loading profile...</p>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <InfoDeveloper
        profileInfo={profileToShow}
        token={token}
        setProfileData={setProfileToShow}
        onProfileUpdated={handleUpdate}
      />
    </div>
  );
}




