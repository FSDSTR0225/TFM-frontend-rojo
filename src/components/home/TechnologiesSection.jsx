import React from 'react';
import { Link } from 'react-router';
import { StackTechnologies } from "./StackTechnologies";

export const TechnologiesSection = () => {

  return (
        <div className="w-full py-16">
            <div className="flex flex-col">
                <div className="w-fit inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-secondary-90 to-primary-90 px-4 mx-auto">
                    <span className="bg-gradient-to-r from-secondary-50 to-primary-50 text-transparent bg-clip-text leading-normal font-bold text-xs my-2">
                    Most in-demand technologies
                    </span>
                </div>
                <div className='flex flex-col items-center text-center mb-4'>
                    <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-normal inline-block text-3xl font-bold my-2">Technologies Stack</h1>
                    <span className='text-neutral-20'>Discover the technologies most used by IT professionals in the industry</span>
                </div>

                <StackTechnologies />

                <div className='flex items-center justify-center text-center mt-4'>
                    <Link to={`/projects`} className="btn bg-gradient-to-r from-primary-60 to-secondary-60 rounded-md">
                        View all projects
                    </Link>
                </div>
            </div>
        </div>
  );
};
