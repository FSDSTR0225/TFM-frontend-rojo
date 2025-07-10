import { AvatarImage } from "../../components/AvatarImage"
import { NameUsers } from "../../components/NameUsers"
import { Notifications } from "./Notifications"

export const CardUser = ({ profile }) => {
  return (
    <div tabIndex={0} role="button" className="flex items-center gap-2 bg-neutral-60 py-2 pl-3 pr-2 rounded-full shadow outline outline-neutral-90 relative left-4 md:left-0 min-w-36 sm:min-w-40 lg:min-w-48">
      <Notifications />
      <div className="flex flex-col text-right leading-tight max-w-[6rem] sm:max-w-[8rem]">
        <NameUsers
          user={profile}
          classProps={"font-semibold text-xs sm:text-sm truncate"}
          align={"items-end"}
        >
          <span className={`text-[10px] sm:text-xs ${profile.role.type === "recruiter" ? "text-secondary-40" : "text-primary-50"}`}>
            {profile.role.type === "recruiter" ? "Recruiter" : "Developer"}
          </span>
        </NameUsers>
      </div>

      <AvatarImage user={profile} />
    </div>
  )
}
