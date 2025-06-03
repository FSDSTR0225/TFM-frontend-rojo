import React, { useState, useEffect } from 'react';
import { defineStepper } from "@stepperize/react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { StartingComponent } from './StartingStepper';

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
  } catch {
    return null;
  }
}

export const Onboarding = () => {

  const [showStarting, setShowStarting] = useState(true);

  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const { useStepper, steps, utils } = defineStepper(
    { id: 'userinfo1', title: 'User Info 1', description: 'Enter your personal details' },
    { id: 'userinfo2', title: 'User Info 2', description: 'Additional user info' },
    { id: 'roletype1', title: 'Role Type 1', description: 'Enter your profile details' },
    { id: 'roletype2', title: 'Role Type 2', description: 'More profile details' },
    { id: 'complete', title: 'Complete', description: 'Registration complete' }
  );

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  const progressSteps = steps.slice(1, 5);
  const filledBarsCount = currentIndex > 0 ? Math.min(currentIndex, 4) : 0;


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.role) {
        setRole(payload.role);
      } else {
        navigate('/login', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);


  const colors = {
    developer: {
      text: 'text-primary-70',
      bg: 'bg-primary-60',
      hoverBg: 'hover:bg-primary-80',
      hovertext: 'hover:text-neutral-0',
      border: 'border-primary-80',
      stepActive: 'bg-primary-50 text-white',
      stepper: 'bg-primary-20',
    },
    recruiter: {
      text: 'text-secondary-50',
      bg: 'bg-secondary-50',
      hoverBg: 'hover:bg-secondary-70',
      hovertext: 'hover:text-neutral-0',
      border: 'border-secondary-60',
      stepActive: 'bg-secondary-50 text-white',
      stepper: 'bg-secondary-20',
    },
  };

  const colorSet = role === 'recruiter' ? colors.recruiter : colors.developer;

  const handleStart = () => {
    setShowStarting(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[80vh] md:min-w-auto md:min-h-auto aspect-[3/4] md:aspect-[5/3] border border-neutral-60 rounded-lg mt-10 mb-10 bg-neutral-80 overflow-hidden relative">

      <AnimatePresence mode="wait">
        {showStarting ? (
          <motion.div
            key="starting"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <StartingComponent colorSet={colorSet} role={role} onStart={handleStart} />
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {currentIndex >= 0 && (
                <motion.div
                  key="header-progress"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-center px-8 py-6"
                >
                <div className="flex items-center justify-between w-full">
                  <h2 className={`${colorSet.text} text-lg font-medium whitespace-nowrap`}>
                    User Onboarding
                  </h2>
                  <div className="flex items-center gap-4 flex-1 max-w-md min-w-0 justify-end">
                    <nav
                      aria-label="Steps"
                      className="flex flex-1 h-1 items-center gap-[18px] min-w-0"
                    >
                    {progressSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex-1 h-full rounded transition-colors duration-300 ${
                          index < currentIndex
                            ? colorSet.stepActive // Pasos completados
                            : index === currentIndex
                            ? colorSet.stepper // Paso actual
                            : 'bg-neutral-30' // Pasos futuros
                        }`}
                      />
                    ))}
                    </nav>

                    <div className="text-sm text-neutral-40 whitespace-nowrap">
                      {currentIndex + 1} / {steps.length}
                    </div>
                  </div>
                </div>


                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative h-full">
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
                    userinfo1: () => <UserComponent />,
                    userinfo2: () => <UserComponent2 />,
                    roletype1: () => <RoleComponent role={role} />,
                    roletype2: () => <RoleComponent2 role={role} />,
                    complete: () => <CompleteComponent role={role} />,
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-6 right-10 w-full max-w-5xl flex justify-end gap-4 py-2">
              {!stepper.isLast ? (
                <>
                  {stepper.current.id === 'userinfo1' ? (
                    <button
                      className={`px-4 py-2 rounded border ${colorSet.border} ${colorSet.text} ${colorSet.hoverBg} ${colorSet.hovertext} transition`}
                      onClick={() => setShowStarting(true)}
                    >
                      Back
                    </button>
                  ) : (
                    stepper.current.id !== 'starting' && (
                      <button
                        className={`px-4 py-2 rounded border ${colorSet.border} ${colorSet.text} ${colorSet.hoverBg} ${colorSet.hovertext} transition`}
                        onClick={stepper.prev}
                      >
                        Back
                      </button>
                    )
                  )}

                  <button
                    className={`px-4 py-2 rounded ${colorSet.bg} text-neutral-0 ${colorSet.hoverBg} transition`}
                    onClick={stepper.next}
                  >
                    Next
                  </button>
                </>
              ) : (
                <button
                  className={`px-4 py-2 rounded ${colorSet.bg} text-neutral-0 ${colorSet.hoverBg} transition`}
                  onClick={stepper.reset}
                >
                  Finish
                </button>
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Components

const UserComponent = () => (
  <div className="space-y-4 px-16">
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="birthDate" className="text-sm font-medium">My Birth Date</label>
      <input id="birthDate" placeholder="YYYY-MM-DD" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="phone" className="text-sm font-medium">My phone number</label>
      <input id="phone" placeholder="+1234567890" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="max-w-md w-full grid gap-2">
      <label htmlFor="description" className="text-sm font-medium">About me</label>
      <textarea id="description" placeholder="Tell us about yourself" className="w-full px-3 py-2 border rounded" />
    </div>
  </div>
);

const UserComponent2 = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Additional User Info</h3>
    <p>Here you can add more personal details or preferences.</p>
  </div>
);

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

const RoleComponent2 = ({ role }) => {
  const primaryColor = role === 'developer' ? 'green' : 'blue';
  return (
    <div className={`space-y-4 text-${primaryColor}-700`}>
      <h3 className="text-lg font-medium mb-4">Additional Role Info</h3>
      <p>More details about your role can be filled here.</p>
    </div>
  );
};

const CompleteComponent = ({ role }) => {
  const primaryColor = role === 'developer' ? 'green' : 'blue';
  return (
    <h3 className={`text-lg py-4 font-medium text-${primaryColor}-700`}>
      All steps complete 🔥
    </h3>
  );
};
