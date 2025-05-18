import React from 'react';
import { Link } from 'react-router';

function StudyCard({ profileInfo }) {
    if (!profileInfo) return <p>Error al cargar los estudios</p>;
    return (
        <div>
            <div className="flex justify-end mb-2">
                <Link 
                    to={profileInfo.role.developer.github} 
                    className="btn btn-primary bg-primary-60 hover:bg-primary-70 rounded-md hover:shadow-lg text-sm"
                    aria-label="Create study">
                    Create study
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
                <h3 className="col-span-2 text-xl uppercase font-bold">BSc Computer Science</h3>
                <span className="col-span-2">Universidad Politécnica de Madrid</span>
                <span className="grid justify-items-end pr-4">2018</span>
            </div>
        </div>
    )
};

export default StudyCard;