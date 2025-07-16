export const CandidateSkills = ({ skills, skillsOffer }) => {
  const allSkills = skills || [];
  const ofertaSkills = skillsOffer || [];

  const matchingSkills = allSkills.filter((skill) =>
    ofertaSkills.includes(skill)
  );
  const nonMatchingSkills = allSkills.filter(
    (skill) => !ofertaSkills.includes(skill)
  );
  const sortedSkills = [...matchingSkills, ...nonMatchingSkills].slice(0, 4);

  return (
    <>
      {sortedSkills.length > 0 ? (
        sortedSkills.map((tech) => (
          <span
            key={tech}
            className={`px-2 mx-0.5 py-0.5 rounded-full text-neutral-0 ${
              ofertaSkills.includes(tech) ? "bg-green-600" : "bg-primary-70"
            }`}
          >
            {tech}
          </span>
        ))
      ) : (
        <span className="text-sm text-neutral-400 italic">
          No skills registered
        </span>
      )}
    </>
  );
};
