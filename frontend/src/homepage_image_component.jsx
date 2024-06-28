import React from 'react';
import noteImage from './assets/notes.svg'; // Importing the image file

export default function HomeImage(){
  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={noteImage} alt="My Image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Image Title</div>
          <p className="text-gray-700 text-base">
            Description of the image goes here.
          </p>
        </div>
      </div>
    </div>
  );
};
