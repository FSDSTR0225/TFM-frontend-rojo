import React, { useState, useEffect } from 'react';
import InfoDeveloper from "../components/InfoDeveloper";
import { getProfileDev } from "../../../services/profileService";
import { useParams } from 'react-router';

export function ProfileDevPage() {

   
  const [profile, setProfile] = useState("");
  // const [stuff, setStuff] = useState("");
  const {developerid} = useParams();


  useEffect(() => {
      const fetchProfile = async () => {
          try {
              console.log(developerid);
              const response = await getProfileDev(developerid);
              setProfile(response);

          } catch(error) {
          console.log("Error tocho al cargar el perfil", error);
          }
      };

  fetchProfile();
  }, []);


  return (
      <div>
        <InfoDeveloper profileInfo={profile}  /> 
      </div>
      

  );
};




