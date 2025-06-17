import { useState } from "react";

import { applyToOffer } from "../../../services/offersServices";


export const ApplyModal = ({ isOpen, setIsOpen, idOffer, onApplySuccess }) => {
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const token = localStorage.getItem("token");
 

  // Simple phone validation: starts with + and at least 10 digits
  const isValidPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return value.startsWith("+") && digits.length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError("");
    if (!gdprAccepted) return;
    if (!isValidPhone(phone)) {
      setPhoneError("Please enter a valid phone number (start with + and at least 10 digits).");
      return;
    }
    try {
      const response = await applyToOffer(idOffer, { phone, coverLetter, gdprAccepted }, token);
      console.log( "🚀 ~ handleSubmit ~ response:", response);
      onApplySuccess?.(response.offer);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      open={isOpen}
      className='modal'
    >
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='modal-box max-w-lg w-full bg-neutral-80 border border-neutral-70 text-neutral-0 shadow-md rounded-lg'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6 p-6'
          >
            <h2 className='text-2xl font-bold text-center mb-2'>Apply to this Job Offer</h2>
            <hr className='border-t border-neutral-60' />

            <div className='mb-4'>
              <p className='text-sm text-neutral-20'>
                <strong>GDPR Disclaimer:</strong> By applying, you agree that your data will be sent
                to the recruiter so they can evaluate your application and contact you via chat.
                Your phone number will be used for verification and communication purposes. You must
                accept this to proceed.
              </p>
            </div>

            <div>
              <label className='block text-sm text-neutral-20 mb-1'>
                Phone Number <span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='input input-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full placeholder-neutral-40'
                placeholder='e.g. +34 600 123 456'
              />
              {phoneError && (
                <span className="text-red-500 text-xs">{phoneError}</span>
              )}
            </div>

            <div>
              <label className='block text-sm text-neutral-20 mb-1'>Cover Letter (optional)</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className='textarea textarea-bordered bg-neutral-90 text-neutral-0 border-neutral-60 w-full h-24 placeholder-neutral-40'
                placeholder='Write a short cover letter to introduce yourself...'
              />
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='gdpr'
                checked={gdprAccepted}
                onChange={(e) => setGdprAccepted(e.target.checked)}
                required
              />
              <label
                htmlFor='gdpr'
                className='text-sm text-neutral-20'
              >
                I accept the sending of my data to the recruiter for the purposes described above.
              </label>
            </div>

            <div className='flex flex-col md:flex-row justify-end gap-4 pt-4'>
              <button
                type='submit'
                className='btn bg-secondary-60 text-neutral-90 hover:bg-secondary-70 w-full md:w-auto'
                disabled={!gdprAccepted || !phone}
              >
                Send Application
              </button>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='btn bg-neutral-70 text-neutral-10 hover:bg-neutral-60 border border-neutral-60 w-full md:w-auto'
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
