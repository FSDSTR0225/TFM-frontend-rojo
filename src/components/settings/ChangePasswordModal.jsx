import React, { useEffect } from "react";
import { useForm } from "react-hook-form"

export default function ChangePasswordModal({ open, setOpen, profileData, onProfileUpdate, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting }
  } = useForm();

  // Observar las contraseñas para validar que coincidan
  const newPassword = watch("newPassword");

  useEffect(() => {
    if (profileData) {
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [profileData, reset]);

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handlePassSubmit = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        alert("Your new passwords don't match");
        return;
      }

      if (onSubmit) {
        await onSubmit(data);
      }
      
      if (onProfileUpdate) {
        onProfileUpdate({ password: data.newPassword });
      }

      handleClose();

    } catch (error) {
      console.error("Error when you tried change the password: ",error);
    }
  }

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative">
        <form onSubmit={handleSubmit(handlePassSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Change your password</h2>


          {/* Password Viejo*/}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Current password</span>
            </label>
            <input 
              type="password"
              {...register("oldPassword", {
                required: "Your current password is requiered"
              })} 
              placeholder="Enter your current password" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div>

          {/* Password nuevo */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">New password</span>
            </label>
            <input 
              type="password"
              {...register("newPassword", {
                required: "Your new password is requiered"
              })} 
              placeholder="Enter your new password" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div>

          {/* Password nuevo again */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Confirm new password</span>
            </label>
            <input 
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your new password",
                validate: value => value === newPassword
              })} 
              placeholder="Confirm your new password" 
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic" 
            />
          </div>

          

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
            >
              {isSubmitting ? "Changing..." : "Change your password"}
            </button>
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn bg-neutral-90 border border-neutral-70 text-neutral-0 hover:text-primary-40"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}