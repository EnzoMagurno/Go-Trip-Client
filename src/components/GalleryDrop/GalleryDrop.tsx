import React, { useState } from 'react';
import axios from '../../utils/axios'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { BoxDragAndDrop } from './BoxDragAndDrop';
import { ImageSelected } from './ImageSelected';

export const GalleryDrop = (props: { idHotel: any; idRoom: any }) => {
  const { idHotel, idRoom } = props;
  const [images, setImages] = useState<ImageListType>([]);
  const [urlImage, setUrlImage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleChange = (imageList: ImageListType) => setImages(imageList);




  const onUpload = async () => {
    setLoading(true);
    console.log(images[0].file);
    const reader = new FileReader();
		reader.readAsDataURL(images[0].file);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
		reader.onerror = () => {
			console.error('Error');
		};
    setLoading(false);
    
    const uploadImage = async (base64EncodedImage) => {
      console.log(idHotel);
      console.log(idRoom);
      
      if (idRoom) {
        try {
          const uploadGallery = await fetch(
            'https://gotrippf-production.up.railway.app/gallery/upload',
            {
              method: 'POST',
              body: JSON.stringify({
                data: base64EncodedImage,
                idHotel: idHotel,
                idRoom: idRoom,
              }),
              headers: { 'Content-Type': 'application/json' },
            }
          );
          if (uploadGallery.ok) {
            // La solicitud fue exitosa
            const response = await uploadGallery.json();
            console.log(response); // La respuesta del backend en formato de objeto JavaScript
          } else {
            // La solicitud falló
            console.error('Error al subir la imagen');
          }
          setImages('');
          
        } catch (err) {
          console.error(err);
        }
      } else if (!idRoom) {
        try {
          const uploadGallery = await fetch(
            'https://gotrippf-production.up.railway.app/gallery/upload',
            {
              method: 'POST',
              body: JSON.stringify({
                data: base64EncodedImage,
                idHotel: idHotel,
              }),
              headers: { 'Content-Type': 'application/json' },
            }
          );
          if (uploadGallery.ok) {
            // La solicitud fue exitosa
            const response = await uploadGallery.json();
            console.log(response); // La respuesta del backend en formato de objeto JavaScript
          } else {
            // La solicitud falló
            console.error('Error al subir la imagen');
          }
          setImages('');
        } catch (err) {
          console.error(err);
        }
      }
    };
    

  
       
    
    
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
