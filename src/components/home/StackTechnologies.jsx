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
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751453660/mongodb-icon_odsgnz.svg',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751453733/react-icon_urbntl.svg',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751453808/typescript-icon_yeafon.svg',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751453935/javascript-icon_emsenf.png',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751454010/python-icon_quwslf.svg',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751454075/mysql-icon_jnh7zm.svg',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751454113/nodejs-icon_zza7u2.svg',
    'https://res.cloudinary.com/djxyqh8fx/image/upload/v1751454149/postgresql-icon_q0tmkq.svg'
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