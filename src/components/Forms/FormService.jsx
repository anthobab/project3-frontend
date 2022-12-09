import React, { createContext, useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import apiHandler from '../../api/apiHandler';
import { useNavigate } from 'react-router-dom';
import './FormService.css';
// import MapZone from '../MapZone/MapZone';
import DragableMapZone from '../MapZone/DragableMapZone';
import TagSearch from '../TagSearch/TagSearch';
import LoadImagePreview from '../LoadImagePreview/LoadImagePreview';
import CardDetailed from '../CardDetailed/CardDetailed';

export const MyLocContext = createContext(null);

const FormService = () => {
  const [step, setStep] = useState(1);
  const stepNumber = 5;

  // Tag part
  const [myTags, setMyTags] = useState([]);

  // Geoloc
  const [geoloc, setGeoloc] = useState({
    initialized: false,
    permission: 'denied',
    coordinates: {
      // centre de Paris
      latitude: 48.85356416664298,
      longitude: 2.348096586347212,
    },
  });
  function report(state) {
    // console.log(`Permission ${state}`);
  }

  function getGeoloc() {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        report(result.state);
        navigator.geolocation.getCurrentPosition(function (position) {
          //   console.log(position.coords);
          setGeoloc((currentloc) => ({
            ...currentloc,
            permission: result.state,
            initialized: true,
            coordinates: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          }));
        });
      } else if (result.state === 'denied') {
        report(result.state);
        setGeoloc((currentloc) => ({ ...currentloc, permission: result.state, initialized: true })); // Update permission
      }
      //   result.addEventListener('change', () => {
      //     report(result.state);
      //   });
    });
  }

  useEffect(() => {
    if (!geoloc.initialized) {
      getGeoloc();
    }
    return () => {};
  }, []);

  // image
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    //TODO Switch on step
    handleChange({
      target: {
        name: 'tags',
        value: myTags,
      },
    });
    handleChange({
      target: {
        name: 'coordinates',
        value: [geoloc.coordinates.latitude, geoloc.coordinates.longitude],
      },
    });
    handleChange({
      target: {
        name: 'pictureFile',
        value: imageFile,
      },
    });
    return () => {};
  }, [step]);

  const [{ title, description, coordinates, tags, pictureFile }, handleChange] = useForm({
    title: '',
    description: '',
    tags: [],
    coordinates: [geoloc.coordinates.latitude, geoloc.coordinates.longitude], //[geoloc.coordinates.longitude, geoloc.coordinates.latitude],
    pictureFile: {},
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataForm = { title, description, coordinates, tags, pictureFile };
    const formDataService = new FormData();
    // console.log(dataForm);
    for (let key in dataForm) {
      if (key === 'tags') {
        // console.log(JSON.stringify(dataForm[key]));
        formDataService.append(key, JSON.stringify(dataForm[key]));
      } else {
        formDataService.append(key, dataForm[key]);
      }
    }
    // console.log(formDataService, pictureFile);
    apiHandler
      .createService(formDataService)
      .then(({ service }) => {
        navigate('/services/myServices/' + service._id);
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  //   useEffect(() => {
  //     // console.log('mytags Updated', myTags);
  //     return () => {};
  //   }, [myTags]);

  const handleOnchanged = (value) =>
    setMyTags((curVal) => {
      return [...curVal, value];
    });

  const deleteHandle = (event) => {
    setMyTags((currentTags) => {
      return currentTags.filter((tag) => tag.tagName !== event.target.parentElement.querySelector('p').textContent);
    });
    // console.log(myTags);
  };

  const stepNavigateHandle = (increment) => {
    // TODO limitation condition if empty title...
    setStep((curVal) => curVal + increment);
  };

  return (
    <>
      <MyLocContext.Provider value={{ geoloc, setGeoloc }}>
        <div className="form-content">
          {error && <h3 className="error">{error.message}</h3>}
          <form className="FormService" onSubmit={handleSubmit}>
            {/* <h2>Service:</h2> */}

            {step === 1 && (
              <>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" onChange={handleChange} value={title} />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={handleChange} value={description} />
              </>
            )}

            {/* TODO : Tags & choice location address */}
            {step === 2 && (
              <>
                <label htmlFor="tags">Choose at least 1 tag (up to 5)</label>
                {/* <input type="text" id="tags" name="tags" onChange={handleChange} value={tags} /> */}
                <TagSearch type="text" myTags={myTags} handleOnchanged={handleOnchanged}></TagSearch>
                <div className="selected-tag">
                  {myTags.map((tagEl) => {
                    return (
                      <div key={tagEl.tagName} className="tag-element">
                        <p>{tagEl.tagName}</p>
                        <span onClick={deleteHandle}>X</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                location:
                {/* {console.log(geoloc.coordinates)} */}
                <div className="previewLoc">
                  {/* <MapZone coordinate={coordinates} /> */}
                  <DragableMapZone coordinate={geoloc.coordinates} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <label htmlFor="pictureUrl">Add A Picture</label>
                <LoadImagePreview imageFile={imageFile} setImageFile={setImageFile}></LoadImagePreview>
              </>
            )}

            {step === 5 && (
              <>
                <div className="Recap">Recap :</div>
                <CardDetailed vals={{ title, description, coordinates, tags, pictureFile }}></CardDetailed>
              </>
            )}

            {step === stepNumber && <button>Publish this service</button>}
          </form>
          <div className="step-buttons">
            {step > 1 && (
              <div className="btn-container">
                <button className="back-button" onClick={() => stepNavigateHandle(-1)}>
                  Go Back
                </button>
              </div>
            )}

            {step < stepNumber && (
              <div className="btn-container">
                <button className="next-button" onClick={() => stepNavigateHandle(1)}>
                  Next Step
                </button>
              </div>
            )}
          </div>
        </div>
      </MyLocContext.Provider>
    </>
  );
};

export default FormService;
