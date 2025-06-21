import React from 'react';

export const StackTechnologies = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex animate-scroll">
        <div className="flex flex-row py-4 flex-shrink-0">
          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 py-10">
                  <img
                  src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">Mongo DB</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Database
              </span>
              </div>
          </div>

          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                  <img
                  src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">React</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Frontend
              </span>
              </div>
          </div>

          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                  <img
                  src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">TypeScript</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-fullpx-2 py-0.5 w-fit h-fit text-sm">
                  Language
              </span>
              </div>
          </div>

          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                  <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">JavaScript</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Language
              </span>
              </div>
          </div>

          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                  <img
                  src="https://cdn.worldvectorlogo.com/logos/python-5.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">Python</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Language
              </span>
              </div>
          </div>

          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
              <figure className="px-10 pt-10">
                  <img
                  src="https://static.cdnlogo.com/logos/m/88/mysql.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">MySQL</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Database
              </span>
              </div>
          </div>
          
          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
                <figure className="px-10 pt-10">
                  <img
                  src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">Node.js</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Backend
              </span>
              </div>
          </div>
          
          <div className="card flex-shrink-0 w-48 bg-neutral-60 shadow-sm rounded-xl mr-4 snap-center">
                <figure className="px-10 pt-10">
                  <img
                  src="https://cdn.worldvectorlogo.com/logos/postgresql.svg"
                  className="rounded-xl h-28 w-28" />
              </figure>
              <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-semibold">PostgreSQL</h2>
              <span className="bg-primary-60/20 text-primary-50 rounded-full px-2 py-0.5 w-fit h-fit text-sm">
                  Database
              </span>
              </div>
          </div>
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
          animation: scroll 10s linear infinite;
        }
      `}</style>
    </div>
  );
};