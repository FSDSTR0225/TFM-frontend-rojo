import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserAccountModal({ 
  open, 
  setOpen, 
  profileData, 
  onProfileUpdate, 
  onSubmit 
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm();

  // Watch phone value for formatting
  const phoneValue = watch("phone");

  // Function to convert date format from dd-MM-yyyy to yyyy-MM-dd
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    // If already in yyyy-MM-dd format, return as is
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    
    // Convert from dd-MM-yyyy to yyyy-MM-dd
    if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = dateString.split('-');
      return `${year}-${month}-${day}`;
    }
    
    return dateString;
  };

  // Function to convert date format from yyyy-MM-dd to dd-MM-yyyy
  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    
    // If already in dd-MM-yyyy format, return as is
    if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
      return dateString;
    }
    
    // Convert from yyyy-MM-dd to dd-MM-yyyy
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }
    
    return dateString;
  };

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name || "",
        surname: profileData.surname || "",
        location: profileData.role?.developer?.location || "",
        phone: profileData.phone || "",
        birthDate: formatDateForInput(profileData.birthDate) || "",
      });
    } else {
      reset({
        name: "",
        surname: "",
        location: "",
        phone: "",
        birthDate: "",
      });
    }
  }, [profileData, reset]);

  // Format phone number similar to UserComponent
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d+ ]/g, "");
    if (!value.startsWith("+")) {
      value = "+" + value.replace(/\+/g, "");
    }
    if (value.length > 3) {
      const prefix = value.slice(0, 3);
      let rest = value.slice(3).replace(/\s+/g, "");
      value = prefix + " " + rest;
    }
    setValue("phone", value);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleUserInfoSubmit = async (data) => {
    try {
      // console.log('Raw form data:', data); // Debug log
      
      // Format birthDate back to dd-MM-yyyy before sending
      const formattedData = {
        ...data,
        birthDate: formatDateForStorage(data.birthDate)
      };
      
      // console.log('Formatted data from modal:', formattedData);
      
      if (onSubmit) {
        await onSubmit(formattedData);
      }
      
      if (onProfileUpdate) {
        onProfileUpdate(formattedData);
      }

      handleClose();
    } catch (error) {
      console.error("Error when you tried to update user information: ", error);
    }
  };

  if (!open) return null;

  return (
    <div className="modal modal-open fixed inset-0 flex justify-center items-center z-50">
      <div className="modal-box max-w-3xl bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative">
        <form onSubmit={handleSubmit(handleUserInfoSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Edit User Information</h2>
          
          {/* Name and Surname */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                {...register("name")}
                placeholder="Name"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
            </div>
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Surname</span>
              </label>
              <input
                {...register("surname")}
                placeholder="Surname"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="block text-sm text-neutral-20 mb-1">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              {...register("location")}
              placeholder="Location"
              className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
            />
          </div>

          {/* Phone and Birth Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Phone</span>
              </label>
              <input
                {...register("phone")}
                placeholder="+34 600600600"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                value={phoneValue || ""}
                onChange={handlePhoneChange}
                maxLength={16}
              />
            </div>
            <div className="form-control">
              <label className="block text-sm text-neutral-20 mb-1">
                <span className="label-text font-semibold">Birth Date</span>
              </label>
              <input
                {...register("birthDate")}
                placeholder="Select your birth date"
                type="date"
                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-primary-60 text-neutral-0 hover:bg-primary-50 border border-primary-50"
            >
              {isSubmitting ? "Updating..." : "Update Information"}
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