import React, { useEffect } from "react";
import { useForm } from "react-hook-form"

export default function RemoveAccountModal({ open, setOpen, profileData, onSubmit }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm();

  useEffect(() => {
    if (open) {
      reset({
        email: "",
      });
    }
  }, [open, reset]);

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleDeleteSubmit = async (data) => {
    try {
      // Debug: ver qué emails estamos comparando
      console.log("Email ingresado:", data.email);
      console.log("Email del perfil:", profileData?.email);
      
      // Verificar que el email coincida con el del usuario
      const inputEmail = data.email?.trim().toLowerCase();
      const profileEmail = profileData?.email?.trim().toLowerCase();
      
      if (inputEmail !== profileEmail) {
        alert(`The email doesn't match your account email. Expected: ${profileData?.email}`);
        return;
      }

      // Llamar a onSubmit (igual que en updatePassword)
      if (onSubmit) {
        await onSubmit(data);
      }
      
      handleClose();
      
    } catch (error) {
      console.error("Error when trying to delete account:", error);
      alert("Error deleting account. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative">
        <form onSubmit={handleSubmit(handleDeleteSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center text-red-500">Remove your account</h2>
          
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Warning:</strong> This action cannot be undone. Your account and all associated data will be permanently deleted.
          </div>
              
          {/* Email */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Confirm your email</span>
            </label>
            <input 
              type="email"
              {...register("email", {
                required: "Your email is required"
              })} 
              placeholder="Enter your email to confirm"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
            )}
          </div>
                     
          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button"
              onClick={handleClose}
              className="btn bg-neutral-90 border border-neutral-70 text-neutral-0 hover:text-primary-40"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn bg-red-600 text-neutral-0 hover:bg-red-700 border"
            >
              {isSubmitting ? "Deleting..." : "Delete Account Permanently"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}