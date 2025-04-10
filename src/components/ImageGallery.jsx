import React from "react";

const ImageGallery = ({ images, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg "
        >
          <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <img
              src={img.src.medium}
              alt="card-image"
              className="h-56 w-full object-cover"
            />
          </div>

          <div className="px-4 pb-4 pt-0 mt-2 ">
            <button
              onClick={() => onSelect(img.src.large)}
              className="rounded-md cursor-pointer bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Add Captions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
