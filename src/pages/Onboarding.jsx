import React, { useState, useEffect } from 'react';
import { defineStepper } from "@stepperize/react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';  // Importa useNavigate

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const Onboarding = () => {
  const { useStepper, steps, utils } = defineStepper(
    { id: 'userinfo', title: 'Personal Info', description: 'Enter your personal details' },
    { id: 'roletype', title: 'Profile Details', description: 'Enter your profile details' },
    { id: 'complete', title: 'Complete', description: 'Registration complete' }
  );

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  const [role, setRole] = useState('');
  const navigate = useNavigate();  // Hook para redirección

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.role) {
        setRole(payload.role);
      } else {
        navigate('/login', { replace: true });  // Redirige si no hay payload válido
      }
    } else {
      navigate('/login', { replace: true });  // Redirige si no hay token
    }
  }, [navigate]);

  return (
  <div className="w-full max-w-full xl:max-w-5xl mx-auto space-y-6 p-10 px-20 border rounded-lg mt-10">
    <div className="flex justify-between">
      <h2 className="text-lg font-medium">User Onboarding</h2>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        Step {currentIndex + 1} of {steps.length}
      </div>
    </div>

    <nav aria-label="Steps" className="my-4">
      <ol className="flex items-center justify-between gap-2" aria-orientation="horizontal">
        {stepper.all.map((step, index, array) => (
          <React.Fragment key={step.id}>
            <li className="flex items-center gap-2">
              <button
                type="button"
                role="tab"
                aria-current={stepper.current.id === step.id ? 'step' : undefined}
                aria-posinset={index + 1}
                aria-setsize={steps.length}
                aria-selected={stepper.current.id === step.id}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors duration-300 ${
                  index <= currentIndex ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => stepper.goTo(step.id)}
              >
                {index + 1}
              </button>
              <span className="text-sm font-medium">{step.title}</span>
            </li>
            {index < array.length - 1 && (
              <div
                className={`flex-1 h-1 rounded transition-colors duration-300 ${
                  index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>

    <div className="relative h-96">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={stepper.current.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-y-auto"
        >
          {stepper.switch({
            userinfo: () => <UserComponent />,
            roletype: () => <RoleComponent role={role} />,
            complete: () => <CompleteComponent />,
          })}
        </motion.div>
      </AnimatePresence>
    </div>

    <div className="space-y-4">
      {!stepper.isLast ? (
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            onClick={stepper.prev}
            disabled={stepper.isFirst}
          >
            Back
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={stepper.next}
          >
            Next
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          onClick={stepper.reset}
        >
          Reset
        </button>
      )}
    </div>
  </div>
);
};

// 🚀 STEP 1: Datos personales básicos
const UserComponent = () => (
  <div className="space-y-4">
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="birthDate" className="text-sm font-medium">Birth Date</label>
      <input id="birthDate" placeholder="YYYY-MM-DD" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
      <input id="phone" placeholder="+1234567890" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="avatar" className="text-sm font-medium">Avatar URL</label>
      <input id="avatar" placeholder="https://..." className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="description" className="text-sm font-medium">Description</label>
      <textarea id="description" placeholder="Tell us about yourself" className="w-full px-3 py-2 border rounded" />
    </div>
  </div>
);

// 🚀 STEP 2: Detalles por rol
const RoleComponent = ({ role }) => (
  <div className="space-y-4">
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="role" className="text-sm font-medium">Role</label>
      <select id="role" className="w-full px-3 py-2 border rounded" value={role} disabled>
        <option value="developer">Developer</option>
        <option value="recruiter">Recruiter</option>
      </select>
    </div>

    {role === 'developer' && (
      <>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="position" className="text-sm font-medium">Professional Position</label>
          <input id="position" placeholder="Frontend, Backend..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="experience" className="text-sm font-medium">Experience Years</label>
          <input id="experience" placeholder="3" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="location" className="text-sm font-medium">Location</label>
          <input id="location" placeholder="City, Country" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="skills" className="text-sm font-medium">Skills (comma-separated)</label>
          <input id="skills" placeholder="React, Node.js, MongoDB" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="languages" className="text-sm font-medium">Languages (comma-separated)</label>
          <input id="languages" placeholder="English:C1,Spanish:B2" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</label>
          <input id="linkedin" placeholder="https://linkedin.com/in/..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="github" className="text-sm font-medium">GitHub</label>
          <input id="github" placeholder="https://github.com/..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="instagram" className="text-sm font-medium">Instagram</label>
          <input id="instagram" placeholder="https://instagram.com/..." className="w-full px-3 py-2 border rounded" />
        </div>
      </>
    )}

    {role === 'recruiter' && (
      <>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="companyName" className="text-sm font-medium">Company Name</label>
          <input id="companyName" placeholder="Your Company" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="companyDescription" className="text-sm font-medium">Company Description</label>
          <textarea id="companyDescription" placeholder="Company details..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="companyLocation" className="text-sm font-medium">Company Location</label>
          <input id="companyLocation" placeholder="City, Country" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="sector" className="text-sm font-medium">Sector</label>
          <input id="sector" placeholder="Tech, Marketing..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="website" className="text-sm font-medium">Website</label>
          <input id="website" placeholder="https://..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</label>
          <input id="contactEmail" placeholder="contact@example.com" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="contactPhone" className="text-sm font-medium">Contact Phone</label>
          <input id="contactPhone" placeholder="+1234567890" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="max-w-md w-full grid gap-2">
          <label htmlFor="multimedia" className="text-sm font-medium">Multimedia Link</label>
          <input id="multimedia" placeholder="https://..." className="w-full px-3 py-2 border rounded" />
        </div>
      </>
    )}
  </div>
);

// 🚀 STEP 3: Confirmación
const CompleteComponent = () => (
  <h3 className="text-lg py-4 font-medium">All steps complete 🔥</h3>
);