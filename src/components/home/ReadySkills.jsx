import React from 'react';
import { Link } from 'react-router';

export const ReadySkills = () => {

  return (
        <div className="w-full bg-gradient-to-r from-secondary-90 to-primary-90 rounded-3xl py-16">
            <div className="flex flex-col">
                <div className='flex flex-col items-center text-center mb-4'>
                    <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-normal inline-block text-5xl font-bold mb-2">
                        Ready to show off your skills?
                    </h1>
                    <span className='text-neutral-20'>
                        Create your developer profile and connect with top tech companies.
                    </span>
                </div>
                <div className='flex flex-row items-center justify-center text-center mt-4'>
                    <Link to={`/login`} className="btn bg-gradient-to-r from-secondary-60 to-primary-60 rounded-md gap-1 mr-4">
                        Create a new Project
                    </Link>
                    <Link to={`/login`} className="btn bg-gradient-to-r from-primary-60 to-secondary-60 rounded-md gap-1 ml-4">
                        Create a new Offer
                    </Link>
                </div>
            </div>
        </div>
  );
};
