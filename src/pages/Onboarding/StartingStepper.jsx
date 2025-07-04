import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { PiRocket } from "react-icons/pi";
import { AuthContext } from "../../context/authContext";

const fadeDuration = 1; // segundos
const visibleDuration = 2; // segundos

export const StartingComponent = ({ role, onStart, colorSet }) => {
  const { profile } = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const desktopImages =
    role === "recruiter"
      ? [
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263808/image-1_7_ft2j6f.png",
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263810/image-1_2_b2dza4.png",
        ]
      : [
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263808/image-1_6_wu809o.png",
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263808/image-1_5_grmkus.png",
        ];

  const mobileImages =
    role === "recruiter"
      ? [
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263808/recruiter1-mobile_wmvmqb.png",
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1750589831/recruiter2-mobile_biejlf.png",
        ]
      : [
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263810/developer1-mobile_abxirq.png",
          "https://res.cloudinary.com/djxyqh8fx/image/upload/v1749263809/developer2-mobile_uvufmm.png",
        ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 2);
    }, (visibleDuration + fadeDuration) * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full relative overflow-hidden">
      <figure className="h-[30vh] md:h-full w-full relative overflow-hidden">
        {/* Mobile Crossfade */}
        {mobileImages.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="Mobile"
            animate={{ opacity: activeIndex === i ? 1 : 0 }}
            transition={{ duration: fadeDuration, ease: "easeInOut" }}
            className="block md:hidden w-full h-full object-cover absolute top-0 left-0"
          />
        ))}

        {/* Desktop Crossfade */}
        {desktopImages.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="Desktop"
            animate={{ opacity: activeIndex === i ? 1 : 0 }}
            transition={{ duration: fadeDuration, ease: "easeInOut" }}
            className="hidden md:block w-full h-full object-cover absolute top-0 left-0"
          />
        ))}
      </figure>

      <div className="flex flex-col justify-start md:justify-center space-y-4 md:space-y-8 px-16 -mt-25 py-4 md:py-0 max-w-md">
        <h2 className="text-gradient text-3xl md:text-4xl font-semibold lg:leading-[3.75rem]">
          Welcome, <br />
          {profile ? `${profile.name} ${profile.surname}` : ""}
        </h2>
        <p className="text-neutral-0 mb-4">
          Complete your registration to get started and unlock all the features
          of our platform.
        </p>
        <p className="text-neutral-0">
          We're excited to have you here!{" "}
          <PiRocket className="inline text-primary-60" />
        </p>
      </div>

      <div className="absolute bottom-6 right-10 px-5 py-2">
        <button
          onClick={onStart}
          className={`px-4 py-2 rounded ${colorSet.bg} text-neutral-0 ${colorSet.hoverBg} transition`}
        >
          Start
        </button>
      </div>
    </div>
  );
};
