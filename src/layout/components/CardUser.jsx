import { AvatarImage } from "../../components/AvatarImage"
import { NameUsers } from "../../components/NameUsers"

export const CardUser = ({profile}) => {
  return (
    <div tabIndex={0} role="button" className='flex items-center justify-end gap-1 sm:gap-2 min-w-45 lg:min-w-48 bg-neutral-60 p-2 rounded-full outline outline-neutral-90 shadow relative left-4 md:left-0 ' >
                <NameUsers
                  user={profile}
                  classProps={"text-xs items-end line-clamp-1"}
                  align={"items-end"}
                >
                  {profile.role.type === "recruiter" ? "Recruiter" : "Developer"}
                </NameUsers>
                <AvatarImage user={profile} />
              </div>
  )
}
