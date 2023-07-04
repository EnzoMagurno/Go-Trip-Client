import React, { useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { BoxDragAndDrop } from './BoxDragAndDrop';
import { ImageSelected } from './ImageSelected';
import { fileUpload } from '@/utils/fileUpload';

export const DragAndDrop = ({ setForm }: any) => {

  const [images, setImages] = useState<ImageListType>([]);
  const [urlImage, setUrlImage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleChange = (imageList: ImageListType) => setImages(imageList);

  const onUpload = async () => {
    setLoading(true);
    console.log(images[0].file);
    
    const url = await fileUpload(images[0].file);
    setLoading(false);

    if (url) {
        setUrlImage(url);
        // Aquí puedes hacer lo que necesites con la URL, como establecerla en form.image
        setForm((prevForm) => ({
          ...prevForm,
          image: url
        }));
        console.log(url);
        
      } else alert('Error, please try again later. ❌')
       
    
    
  }


  return (
    <>      
      <ImageUploading multiple={false} maxNumber={1} value={images} onChange={handleChange}>
      {({
        imageList,
        onImageUpload,
        dragProps,
        isDragging,
        onImageRemove,
        onImageUpdate,
    }) => (
        <>
        {
          imageList[0]
            ? <ImageSelected img={imageList[0].dataURL!}  {...{ onImageRemove, onUpload, onImageUpdate, loading }} />
            : <BoxDragAndDrop dragProps={dragProps} isDragging={isDragging} onImageUpload={onImageUpload}/>
        }
      </>
    )}
      </ImageUploading>
    </>
  )
}
