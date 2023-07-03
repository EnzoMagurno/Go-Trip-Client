import React, { useState } from 'react';
import axios from '../../utils/axios'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { BoxDragAndDrop } from './BoxDragAndDrop';
import { ImageSelected } from './ImageSelected';
import { fileUpload } from '@/utils/fileUpload';

export const GalleryDrop = ({idHotel}: any, {idRoom}: any) => {

  const [images, setImages] = useState<ImageListType>([]);
  const [urlImage, setUrlImage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleChange = (imageList: ImageListType) => setImages(imageList);

  interface FormState {
    urlIMG: string;
    idHotel: string;
    idRoom: string;
    
  }
  
  const [form, setForm] = useState<FormState>({
    urlIMG: '',
    idHotel: '',
    idRoom: ''
  });

  const onUpload = async () => {
    setLoading(true);
    console.log(images[0].file);
    
    const url = await fileUpload(images[0].file);
    console.log(url);
    
    setLoading(false);
    setForm({
      urlIMG: url,
    idHotel: idHotel,
    idRoom: idRoom
    })
    if (idHotel) {
      
    }

    if (url) {
        setUrlImage(url);
        try {
          const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
          const response = await axios.post("/gallery/upload", form, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          const id = response.data.detail.id;
          console.log(id);
      
        } catch (error) {
          console.error('Error(1)', error);
        }
        
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
