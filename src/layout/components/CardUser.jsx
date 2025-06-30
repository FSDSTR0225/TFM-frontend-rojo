import { AvatarImage } from "../../components/AvatarImage"
import { NameUsers } from "../../components/NameUsers"

export const CardUser = ({profile}) => {
  return (
    <div tabIndex={0} role="button" className='flex items-center justify-end gap-2 min-w-38 lg:min-w-48 bg-neutral-60 p-2 rounded-full outline outline-neutral-90 shadow relative left-4 md:left-0'>
                <NameUsers
                  user={profile}
                  classProps={"text-xs items-end"}
                  align={"items-end"}
                >
                  {profile.role.type === "recruiter" ? "Recruiter" : "Developer"}
                </NameUsers>
                <AvatarImage user={profile} />
              </div>
  )
}
