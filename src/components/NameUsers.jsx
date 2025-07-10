import { capitalize } from "../utils/utils";

// Para usar este componete se le pueden pasar 3 props
// user donde le pasaremos si el nombre es del owner, recruiter. profile
// children si queresmos rol
// Y classProps Para modificar solo el componente principal
{
  /* <NameUsers user={profile} classProps={"text-xs"}>
    {profile.role.type === "recruiter" ? "Recruiter" : "Developer"}
    </NameUsers> */
}
// o
// <NameUsers user={offer.owner} classProps={"text-xs"}/>

export const NameUsers = ({
  user,
  classProps,
  children,
  align = "items-center",
}) => {
  const name = capitalize(user?.name || "");
  const surname = capitalize(user?.surname || "");
  const completeName = `${name} ${surname}`.trim() || "Unknown Recruiter";

  let display = "";
  if (typeof children === "string") {
    display = capitalize(children);
  } else {
    display = children;
  }
  return (
    <div
      className={`flex flex-col ${align}`}
      style={{ minWidth: 0, maxWidth: "100%" }}
    >
      <span
        className={`font-bold ${classProps} truncate whitespace-nowrap block`}
        style={{ maxWidth: "100%" }}
      >
        {completeName}
      </span>

      <span className={`text-xs text-neutral-10`}>{display}</span>
    </div>
  );
};
