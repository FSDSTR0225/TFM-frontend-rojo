
import React from 'react';
import { SearchComponent } from "./SearchComponent";

export const SearchingSection = () => {

  return (
        <div className="w-full py-16">
            <div className="flex flex-col">
                <div className="w-fit inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-secondary-90 to-primary-90 px-4 mx-auto">
                    <span className="bg-gradient-to-r from-secondary-50 to-primary-50 text-transparent bg-clip-text leading-normal font-bold text-xs my-2">  
                        Connect Talent with Opportunity
                    </span>
                </div>
                <div className='flex flex-col items-center text-center my-6'>
                    <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-normal inline-block text-5xl font-bold mb-2">
                        Connect Talent with Opportunity
                    </h1>
                    <span className='text-neutral-20'>
                        The website where developers show their skills and recruiters find the perfect match
                    </span>
                </div>
                <div className='flex items-center justify-center mt-4'>
                        <SearchComponent />
                </div>
            </div>
        </div>
  );
};
