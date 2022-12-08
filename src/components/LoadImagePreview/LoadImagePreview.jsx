import React, { useEffect, useState } from 'react';
import './LoadImagePreview.css';
const LoadImagePreview = ({ imageFile, setImageFile }) => {
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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageFile(undefined);
      return;
    }

    // I've kept it simple by using the first image instead of multiple
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="LoadImagePreview">
      <input type="file" onChange={onSelectFile} accept="image/png, image/jpeg, image/jpg, image/webp" />
      {imageFile && (
        <picture className="card-picture">
          <img src={preview} alt="preview" />
        </picture>
      )}
    </div>
  );
};

export default LoadImagePreview;
