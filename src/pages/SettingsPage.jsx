import React, { useState, useContext, useEffect } from 'react';
import { SectionContainer } from "../components/SectionContainer";
import { Link } from "react-router";
import { updatePassword, deleteAccount, getSettings } from '../services/settingsService';
import ChangePasswordModal from '../components/settings/ChangePasswordModal';
import RemoveAccountModal from '../components/settings/RemoveAccountModal';
import { AuthContext } from '../context/authContext';

export const SettingsPage = () => {
  const { token } = useContext(AuthContext);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos del usuario al cargar la página
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getSettings(token);
        if (userData && !userData.error) {
          setProfileData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordChange = async (data) => {
    try {
      const result = await updatePassword(data, token);
      
      if (result) {
        console.log('Password change data:', result);
        setIsPasswordModalOpen(false);
      } else {
        console.error('Error changing password:', result.error);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  const handleOpenRemoveModal = () => {
    setIsRemoveModalOpen(true);
  };

  const handleRemoveChange = async () => {
    try {
      // Solo enviamos el token, no los datos del formulario
      const result = await deleteAccount(token);
      
      if (result) {
        console.log('Account deleted:', result);
        setIsRemoveModalOpen(false);
        // Aquí podrías redirigir al usuario o limpiar el contexto de autenticación
        alert('Account deleted successfully!');
      } else {
        console.error('Error removing your account:', result.error);
      }
    } catch (error) {
      console.error('Error removing your account:', error);
      alert('Error removing your account');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SectionContainer classProps="lg:flex-column gap-4 lg:items-start">
        <div className='w-full items-center justify-center'>
          <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-normal inline-block text-5xl font-bold mb-2">
            Personal information
          </h1>
        </div>
        <div className='w-full items-center justify-center rounded-3xl bg-neutral-80 border border-neutral-70 p-6 relative px-4 mx-auto'>
          <div className='flex flex-col items-center text-center my-6'>
            <span className='text-neutral-20 mb-5'>
              Manage your profile and personal preferences.
            </span>
            
            <div className='mb-5'>
              <span className='mr-5'>
                Change your password: 
              </span>
              <button
                onClick={handleOpenPasswordModal}
                className='btn btn-sm rounded-full text-white bg-green-600 hover:bg-green-700'
              >
                Change your password
              </button>
            </div>
            
          </div>
          <div className='flex flex-col items-center text-center my-6'>
            
            <div className='mb-5'>
              <span className='mr-5'>
                Remove your account: 
              </span>
              <button
                onClick={handleOpenRemoveModal}
                className='btn btn-sm rounded-full text-white bg-red-600 hover:bg-red-700'
              >
                Remove
              </button>
            </div>
            
          </div>
        </div>
      </SectionContainer>

      <ChangePasswordModal 
        open={isPasswordModalOpen}
        setOpen={setIsPasswordModalOpen}
        profileData={profileData}
        onSubmit={handlePasswordChange}
      />
      <RemoveAccountModal 
        open={isRemoveModalOpen}
        setOpen={setIsRemoveModalOpen}
        profileData={profileData}
        onSubmit={handleRemoveChange}
      />
    </>
  );
};