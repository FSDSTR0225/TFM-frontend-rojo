import React, { useState, useContext, useEffect, useCallback } from "react";
import {AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/authContext";
import { StartingComponent } from "../Onboarding/StartingStepper";
import { UserComponent } from "../Onboarding/UserComponent";
import { UserComponent2 } from "../Onboarding/UserComponent2";
import { RoleComponent } from "../Onboarding/RoleComponent";
import { RoleComponent2 } from "../Onboarding/RoleComponent2";
import { RecruiterComponent } from "../Onboarding/RecruiterComponent";
import { CompleteComponent } from "../Onboarding/CompleteComponent";
import { sendProfileUpdate } from "../../services/profileService";
import { getUserLogged } from "../../services/authService";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const Onboarding = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [showStarting, setShowStarting] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const [formData, setFormData] = useState({
    userinfo1: {},
    userinfo2: {},
    roletype1: {},
    roletype2: {},
    recruiter1: {},
    complete: {},
  });

  const stepConfigs = {
    developer: [
      { id: "userinfo1", title: "Personal Info", Component: UserComponent },
      { id: "userinfo2", title: "Avatar", Component: UserComponent2 },
      { id: "roletype1", title: "Developer details", Component: RoleComponent },
      { id: "roletype2", title: "Skills", Component: RoleComponent2 },
      { id: "complete", title: "Complete", Component: CompleteComponent },
    ],
    recruiter: [
      { id: "userinfo1", title: "Personal Info", Component: UserComponent },
      { id: "userinfo2", title: "Avatar", Component: UserComponent2 },
      {
        id: "recruiter1",
        title: "About the Company",
        Component: RecruiterComponent,
      },
      { id: "complete", title: "Complete", Component: CompleteComponent },
    ],
  };

  const steps = stepConfigs[role] || [];
  const currentStep = steps[currentStepIndex];
  // Al principio, justo después de `const steps = stepConfigs[role] || [];`
  const visibleSteps = steps.filter((step) => step.id !== "complete");
  const displayedStepIndex = Math.min(
    currentStepIndex,
    visibleSteps.length - 1
  );

  useEffect(() => {
    if (profile?.hasCompletedOnboarding) {
      navigate("/", { replace: true });
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.role) {
        setRole(payload.role);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [profile, navigate]);

  const handleStepDataChange = useCallback((stepId, data) => {
    setFormData((prev) => {
      const currentStepData = prev[stepId];
      const mergedData = { ...currentStepData, ...data };

      if (
        stepId === "roletype2" &&
        JSON.stringify(currentStepData) === JSON.stringify(mergedData)
      ) {
        return prev;
      }

      return {
        ...prev,
        [stepId]: mergedData,
      };
    });
  }, []);

  const handleStart = () => {
    setShowStarting(false);
  };

  const next = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setShowStarting(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // console.log("Enviando datos de onboarding:", { formData, role, token });

      await sendProfileUpdate(formData, role, token);

      const updatedProfile = await getUserLogged(token);
      setProfile(updatedProfile);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error al completar onboarding: " + error.message);
    }
  };

  const renderStepComponent = () => {
    if (!currentStep) return null;
    const StepComponent = currentStep.Component;
    return (
      <StepComponent
        role={role}
        onValidChange={setIsStepValid}
        data={formData[currentStep.id]}
        onDataChange={(data) => handleStepDataChange(currentStep.id, data)}
      />
    );
  };

  const colorSet =
    role === "recruiter"
      ? {
          text: "text-secondary-50",
          bg: "bg-secondary-50",
          hoverBg: "hover:bg-secondary-70",
          hovertext: "hover:text-neutral-0",
          border: "border-secondary-60",
          stepActive: "bg-secondary-50 text-white",
          stepper: "bg-secondary-20",
        }
      : {
          text: "text-primary-70",
          bg: "bg-primary-60",
          hoverBg: "hover:bg-primary-80",
          hovertext: "hover:text-neutral-0",
          border: "border-primary-80",
          stepActive: "bg-primary-50 text-white",
          stepper: "bg-primary-20",
        };

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
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
            <StartingComponent
              colorSet={colorSet}
              role={role}
              onStart={handleStart}
            />
          </motion.div>
        ) : (
          <>
            <motion.div
              key="header-progress"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center px-4 pt-6 sm:px-20 sm:pt-12"
            >
              <div className="flex items-center justify-between w-full gap-8">
                {currentStep.id !== "complete" && (
                  <h2
                    className={`${colorSet.text} text-lg font-medium whitespace-nowrap`}
                  >
                    {currentStep.title}
                  </h2>
                )}{" "}
                {currentStep.id !== "complete" && (
                  <div className="flex items-center gap-4 flex-1 max-w-md min-w-0 justify-end">
                    <nav
                      aria-label="Steps"
                      className="flex flex-1 h-1 items-center gap-[18px] min-w-0"
                    >
                      {visibleSteps.map((step, index) => (
                        <div
                          key={step.id}
                          className={`flex-1 h-full rounded transition-colors duration-300 ${
                            index < displayedStepIndex
                              ? colorSet.stepActive
                              : index === displayedStepIndex
                              ? colorSet.stepper
                              : "bg-neutral-55"
                          }`}
                        />
                      ))}
                    </nav>
                    <div
                      className={`${colorSet.text} text-lg font-medium whitespace-nowrap`}
                    >
                      {`${displayedStepIndex + 1} / ${visibleSteps.length}`}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="relative flex-1 flex flex-col h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 overflow-y-auto h-full flex flex-col"
                >
                  {renderStepComponent()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-6 right-0 w-full max-w-5xl flex justify-center gap-4 px-4 py-2 sm:justify-end sm:right-5 sm:px-10 sm:py-2">
              {currentStepIndex < steps.length - 1 ? (
                <>
                  {steps[currentStepIndex].id === "userinfo1" ? (
                    <button
                      className={`px-4 py-2 rounded border ${colorSet.border} ${colorSet.text} ${colorSet.hoverBg} ${colorSet.hovertext} transition`}
                      onClick={() => setShowStarting(true)}
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      className={`px-4 py-2 rounded border ${colorSet.border} ${colorSet.text} ${colorSet.hoverBg} ${colorSet.hovertext} transition`}
                      onClick={prev}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className={`px-4 py-2 rounded ${colorSet.bg} text-neutral-0 ${colorSet.hoverBg} transition`}
                    onClick={next}
                    disabled={!isStepValid}
                    style={{
                      opacity: !isStepValid ? 0.5 : 1,
                      cursor: !isStepValid ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                </>
              ) : (
                <button
                  className={`px-10 py-2 rounded ${colorSet.bg} text-neutral-0 ${colorSet.hoverBg} transition`}
                  onClick={handleSubmit}
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
