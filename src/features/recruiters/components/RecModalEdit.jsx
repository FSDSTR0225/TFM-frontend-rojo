import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AvatarUpload } from '../../developer/components/AvatarUpload';
import { updateProfileRecruiter } from '../../../services/profileService';

export const RecModalEdit = ({ openModal, setOpenModal, profile, token, onProfileUpdate }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    const [avatarData, setAvatarData] = useState({
        imageFile: null,
        avatarUrl: "",
    });
    const [isAvatarValid, setIsAvatarValid] = useState(false);

    useEffect(() => {
        if (profile) {
            console.log("Perfil en modal:", profile);
            reset({
                name: profile?.name || "",
                surname: profile?.surname || "",
                sector: profile?.role?.recruiter?.sector || "",
                companyName: profile?.role?.recruiter?.companyName || "",
                location: profile?.role?.recruiter?.location || "",
                email: profile?.role?.recruiter?.contact?.email || "",
                phone: profile?.role?.recruiter?.contact?.phone || "",
                website: profile?.role?.recruiter?.website || "",
                description: profile?.description || "",
            });

            setAvatarData({
                imageFile: null,
                avatarUrl: profile.avatar || "",
            });
            setIsAvatarValid(!!profile.avatar);
        }
    }, [profile]);

    const onSubmit = async (data) => {
        try {
            console.log("Submitting data:", data);
            console.log("Avatar data:", avatarData);
            const formattedData = {
                ...profile,
                ...data,
                avatar: avatarData.avatarUrl || profile.avatar || "",
                role: {
                    recruiter: {
                        companyName: data.companyName,
                        sector: data.sector,
                        location: data.location,
                        website: data.website,
                        contact: {
                            email: data.email,
                            phone: data.phone,
                        },
                    },
                },
            };

            console.log("Formatted data:", formattedData);

            const updated = await updateProfileRecruiter(formattedData, token);
            console.log("Updated profile:", updated);
            if (updated?.recruiter) {
                onProfileUpdate();
                reset();
                setAvatarData({ imageFile: null, avatarUrl: "" });
                setIsAvatarValid(false);
                setOpenModal(false);
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };


    const handleClose = () => {
        reset();
        setAvatarData({ imageFile: null, avatarUrl: "" });
        setIsAvatarValid(false);
        setOpenModal(false);
    };

    return (
        <dialog open={openModal} className="modal">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="modal-box max-w-3xl w-full bg-neutral-80 border border-neutral-70 text-neutral-0 shadow-md rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-center">Edit Recruiter Profile</h2>
                        <AvatarUpload
                            data={avatarData}
                            onDataChange={setAvatarData}
                            onValidChange={setIsAvatarValid}
                            error={errors.avatar?.message}
                        />
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
                        <div className="form-control">
                            <label className="block text-sm text-neutral-20 mb-1">
                                <span className="label-text font-semibold">
                                    Professional Sector
                                </span>
                            </label>
                            <input
                                {...register("sector")}
                                placeholder="Enginering, IT, etc."
                                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                            />
                        </div>
                        <div className="form-control">
                            <label className="block text-sm text-neutral-20 mb-1">
                                <span className="label-text font-semibold">
                                    Company Name
                                </span>
                            </label>
                            <input
                                {...register("companyName")}
                                placeholder="Company Name"
                                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                            />
                        </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="block text-sm text-neutral-20 mb-1">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    {...register("email")}
                                    placeholder="example@example.es"
                                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                                />
                            </div>
                            <div className="form-control">
                                <label className="block text-sm text-neutral-20 mb-1">
                                    <span className="label-text font-semibold">Phone</span>
                                </label>
                                <input
                                    {...register("phone")}
                                    placeholder="+34 123 435 435"
                                    className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="block text-sm text-neutral-20 mb-1">
                                <span className="label-text font-semibold">WebSite</span>
                            </label>
                            <input
                                {...register("website")}
                                placeholder="website.com"
                                className="input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                            />
                        </div>
                        <div className="form-control">
                            <label className="block text-sm text-neutral-20 mb-1">
                                <span className="label-text font-semibold">About Me</span>
                            </label>
                            <textarea
                                {...register("description", {
                                    maxLength: {
                                        value: 500,
                                        message: "Máximo 500 caracteres",
                                    },
                                })}
                                placeholder="Text a description about you..."
                                className="textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40 placeholder:italic"
                                rows={3}
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isAvatarValid}
                                className="btn bg-primary-60 hover:bg-primary-70 w-full md:w-auto"
                            >
                                {isSubmitting ? "Guardando..." : "Edit Dev Profile"}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
