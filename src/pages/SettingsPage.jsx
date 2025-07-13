import React, { useState, useContext, useEffect } from 'react';
import { SectionContainer } from "../components/SectionContainer";
import { useNavigate } from "react-router";
import { updatePassword, deleteAccount, getSettings, updateUserInfo } from '../services/settingsService';
import ChangePasswordModal from '../components/settings/ChangePasswordModal';
import RemoveAccountModal from '../components/settings/RemoveAccountModal';
import UserAccountModal from '../components/settings/UserAccountModal';
import { PiUserList, PiTrash, PiPassword } from "react-icons/pi";
import { AuthContext } from '../context/authContext';

export const SettingsPage = () => {
  const { token, logout, setProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isUserAccountModalOpen, setIsUserAccountModalOpen] = useState(false);
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

  const handleOpenUserAccountModal = () => {
    setIsUserAccountModalOpen(true);
  };

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
      const result = await deleteAccount(token);
      
      if (result) {
        console.log('Account soft deleted:', result);
        setIsRemoveModalOpen(false);
        
        // Limpiar la sesión del usuario y redireccionar
        alert('Account deactivated successfully!');
        logout(); // Limpiar el contexto de autenticación
        navigate('/login'); // Redireccionar al login
      } else {
        console.error('Error removing your account:', result.error);
      }
    } catch (error) {
      console.error('Error removing your account:', error);
      alert('Error removing your account');
    }
  };

const handleUserInfoUpdate = async (data) => {
  try {
    // console.log('Data received from modal:', data); // Debug log
    
    // Create the formatted data structure
    const formattedData = {
      ...profileData,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      birthDate: data.birthDate,
      role: {
        ...profileData.role,
        developer: {
          ...profileData.role?.developer,
          location: data.location,
        },
        recruiter: {
          ...profileData.role?.recruiter,
          location: data.location,
        },
      },
    };

    // console.log('Formatted data to send:', formattedData); // Debug log

    // You'll need to create or update your updateUserInfo service
    const result = await updateUserInfo(formattedData, token);
    
    if (result && result.user) {
      // console.log('User info updated:', result);
      setProfileData(result.user);
      setProfile(result.user);
      setIsUserAccountModalOpen(false);
      alert('User information updated successfully!');
    } else {
      console.error('Error updating user info:', result?.error || 'Unknown error');
      alert('Error updating user information');
    }
  } catch (error) {
    console.error('Error updating user info:', error);
    alert('Error updating user information');
  }
};

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <>
      <SectionContainer classProps="flex flex-col gap-4 lg:gap-6 items-start">
        {/* Header Section */}
        <div className='flex flex-col w-full items-start justify-center px-2 sm:px-4 lg:px-0'>
          <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-normal inline-block text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Personal information
          </h1>
          <span className='text-neutral-20 mb-3 text-sm sm:text-base'>
            Manage your profile and personal preferences.
          </span>
        </div>

        {/* Main Content Section */}
        <div className="flex justify-center items-center w-full px-2 sm:px-4 lg:px-0">
          <div className="w-full max-w-screen-xl bg-neutral-80 border border-neutral-60 rounded-2xl sm:rounded-3xl py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-16 lg:px-16">
            
            {/* Cards Grid */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
              
              {/* User Account Card */}
              <div className="bg-neutral-60 border-2 border-neutral-70 flex flex-col items-center justify-center rounded-xl w-full max-w-44 h-36 sm:h-44 p-3 sm:p-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-200 hover:border-neutral-50" 
                   onClick={handleOpenUserAccountModal}>
                <PiUserList className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mb-1 sm:mb-2" />
                <span className="text-center text-sm sm:text-base font-medium">User Account</span>
              </div>

              {/* Change Password Card */}
              <div className="bg-neutral-60 border-2 border-neutral-70 flex flex-col items-center justify-center rounded-xl w-full max-w-44 h-36 sm:h-44 p-3 sm:p-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-200 hover:border-neutral-50" 
                   onClick={handleOpenPasswordModal}>
                <PiPassword className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mb-1 sm:mb-2"/>
                <span className="text-center text-sm sm:text-base font-medium">Change Password</span>
              </div>

              {/* Remove Account Card */}
              <div className="bg-neutral-60 border-2 border-neutral-70 flex flex-col items-center justify-center rounded-xl w-full max-w-44 h-36 sm:h-44 p-3 sm:p-4 cursor-pointer hover:bg-neutral-50 transition-colors duration-200 hover:border-neutral-50" 
                   onClick={handleOpenRemoveModal}>
                <PiTrash className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mb-1 sm:mb-2"/>
                <span className="text-center text-sm sm:text-base font-medium">Remove Account</span>
              </div>
            </div>
          </div>
        </div>

      </SectionContainer>

      {/* Modals */}
      <UserAccountModal 
        open={isUserAccountModalOpen}
        setOpen={setIsUserAccountModalOpen}
        profileData={profileData}
        onSubmit={handleUserInfoUpdate}
      />
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