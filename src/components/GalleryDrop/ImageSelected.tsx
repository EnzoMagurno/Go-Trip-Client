import React from 'react';

interface Props {
  loading: boolean;
  img: string;
  onUpload: () => Promise<void>;
  onImageRemove: (index: number) => void;
  onImageUpdate: (index: number) => void
}

export const ImageSelected = ({ 
    img, 
    loading, 
    onUpload, 
    onImageRemove, 
    onImageUpdate 
}: Props) => {

  return (
    <div>
      <img className='image-selected' src={img} alt='image-selected' width={300} />
      <div className='container-buttons'>
        {
          loading
            ? <p className='loading-label'>Upload image ⏳...</p>
            : <>
              <button className='border border-neutral-400 mt-5 p-2 rounded-xl bg-iconsPurple text-white' disabled={loading} onClick={onUpload}>Accept 📤</button>
              <button  disabled={loading} onClick={() => onImageRemove(0)}>Cancel ❌</button>
            </>
        }
      </div>
    </div>
  )
}
