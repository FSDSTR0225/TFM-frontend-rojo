import { Link } from "react-router";
import { NameUsers } from "../../../components/NameUsers";
import { AvatarImage } from "../../../components/AvatarImage";

const ProjectCard = ({
  developer,
  gallery = [],
  projectid,
  title,
  category,
  developerId,
  smallTitle = false,
}) => {
  const image = gallery.length > 0 ? gallery[0] : null;

  return (
    <div className="w-full h-full bg-neutral-80 flex flex-col rounded-lg shadow-md relative overflow-hidden transition-transform transform hover:scale-105 border border-neutral-70">
      <div className="flex items-center gap-2 mb-2 px-2 pt-2 z-10 relative">
        <AvatarImage user={developer} width={6} />

        <Link
          to={`/profile/${developerId}`}
          className={`text-neutral-0 font-semibold leading-tight hover:text-primary-40 truncate block ${
            smallTitle ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          }`}
        >
          <NameUsers
            classProps={
              "font-semibold text-ms leading-tight group-hover:text-primary-40 truncate block"
            }
            user={developer}
          />
        </Link>

        {category && (
          <span
            className={`text-neutral-30 mx-2  ${
              smallTitle ? "text-xs" : "text-sm"
            }`}
          >
            • {category}
          </span>
        )}
      </div>
      <div className="relative flex-grow overflow-hidden group">
        {image ? (
          <figure>
            <img src={image} alt={title} />
          </figure>
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-40 italic">
            No image available
          </div>
        )}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-primary-60 bg-opacity-50" />
          <div
            className={`absolute top-2 left-2 font-semibold text-neutral-0 z-40 ${
              smallTitle ? "text-xs sm:text-sm" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>

          <Link
            to={{
              pathname: `/projects/${projectid}`,
              search: location.search, // aquí mantenemos los query params actuales
            }}
            className="z-40 border border-neutral-0 text-neutral-0 font-semibold py-2 px-4 rounded pointer-events-auto bg-transparent transition-colors duration-300 hover:border-neutral-90 hover:text-neutral-90"
          >
            View project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
