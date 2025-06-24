import React from 'react';

export const StackTechnologies = () => {

  const techNames = [
    'Mongo DB',
    'React',
    'TypeScript',
    'JavaScript',
    'Python',
    'MySQL',
    'Node.js',
    'PostgreSQL'
  ];

  const techImages = [
    'https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg',
    'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    'https://cdn.worldvectorlogo.com/logos/typescript.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png',
    'https://cdn.worldvectorlogo.com/logos/python-5.svg',
    'https://static.cdnlogo.com/logos/m/88/mysql.svg',
    'https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/nodejs/nodejs-plain-wordmark.svg',
    'https://cdn.worldvectorlogo.com/logos/postgresql.svg'
  ];

  const techCategories = [
    'Database',
    'Frontend',
    'Language',
    'Language',
    'Language',
    'Database',
    'Backend',
    'Database'
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex animate-scroll">
        <div className="flex flex-row py-4 flex-shrink-0">
          {/* Primer mapeo */}
          {techNames.map((name, index) => (
            <div key={`first-${index}`} className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                <img
                  src={techImages[index]}
                  alt={name}
                  className="rounded-xl h-28 w-28"
                />
              </figure>
              <div className="card-body items-center text-center p-4">
                <h2 className="card-title text-lg font-semibold">{name}</h2>
                <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm mb-6">
                  {techCategories[index]}
                </span>
              </div>
            </div>
          ))}
          
          {/* Segundo mapeo para crear el bucle infinito sin que corte al final */}
          {techNames.map((name, index) => (
            <div key={`second-${index}`} className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                <img
                  src={techImages[index]}
                  alt={name}
                  className="rounded-xl h-28 w-28"
                />
              </figure>
              <div className="card-body items-center text-center p-4">
                <h2 className="card-title text-lg font-semibold">{name}</h2>
                <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm mb-6">
                  {techCategories[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1664px);
          }
        }
        
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
};