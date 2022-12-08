import React, { useEffect, useState } from 'react';
import './ImagePreview.css';
const ImagePreview = ({ imageFile, defaultImage }) => {
  const [preview, setPreview] = useState(undefined);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!imageFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  return (
    <div className="ImagePreview">
      {imageFile && (
        <picture className="card-picture">
          <img src={preview} alt="preview" />
        </picture>
      )}
      {!imageFile && defaultImage && (
        <picture className="card-picture">
          <img src={defaultImage} alt="preview" />
        </picture>
      )}
    </div>
  );
};

export default ImagePreview;
