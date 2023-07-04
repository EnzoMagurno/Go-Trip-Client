import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage } from '@/redux/Features/Gallery/GallerySlice';

function ImageOptions({ image, onClose }) {
  const dispatch = useDispatch();

  const handleDeleteImage = async () => {
    await dispatch(deleteImage(image.id));
    onClose();
    window.location.reload();
  };

  return (
    <div className='relative'>
      <div className="relative left-0 p-2 m-1 rounded-xl bg-slate-200">
        <div className="">
          <img src={image.urlIMG} alt="Image" />

          <button className='absolute top-0 right-0 m-3 h-5 w-5 flex items-center justify-center bg-iconsPurple text-white' onClick={onClose}>x</button>
          <button className='text-iconsPurple' onClick={() => handleDeleteImage(image.id)}>Delete photo</button>
        </div>
      </div>
    </div>
  );
}

export default ImageOptions;