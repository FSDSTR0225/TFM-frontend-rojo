import { capitalize } from "../utils/utils";

// Para usar este componete se le pueden pasar 3 props
// user donde le pasaremos si el nombre es del owner, recruiter. profile
// children si queresmos rol
// Y classProps Para modificar solo el componente principal
{/* <NameUsers user={profile} classProps={"text-xs"}>
    {profile.role.type === "recruiter" ? "Recruiter" : "Developer"}
    </NameUsers> */}
// o
// <NameUsers user={offer.owner} classProps={"text-xs"}/>


export const NameUsers = ({user, classProps, children}) => {
     const name = capitalize(user?.name || '');
    const surname = capitalize(user?.surname || '');
    const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';
  return (
    <div className="flex flex-col items-center">
    <span className={`font-bold ${classProps}`}>{completeName}</span>
    <span className={`text-xs text-neutral-10` }>{children}</span>
    </div>
  )
}
