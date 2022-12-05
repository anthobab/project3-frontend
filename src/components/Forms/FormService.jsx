import React, { createContext, useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import apiHandler from '../../api/apiHandler';
import { useNavigate } from 'react-router-dom';
import './FormService.css';
import MapZone from '../MapZone/MapZone';
import DragableMapZone from '../MapZone/DragableMapZone';
import TagSearch from '../TagSearch/TagSearch';

export const MyTagsContext = createContext(null);

const FormService = () => {
  const [step, setStep] = useState(1);
  const stepNumber = 4;

  // Tag part
  const [myTags, setMyTags] = useState([]);

  // Geoloc
  const [geoloc, setGeoloc] = useState({
    permission: 'denied',
    coordinates: {
      latitude: 48.85356416664298,
      longitude: 2.348096586347212,
    },
  });
  function report(state) {
    console.log(`Permission ${state}`);
  }

  function getGeoloc() {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        report(result.state);
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position.coords);
          setGeoloc((currentloc) => ({
            ...currentloc,
            permission: result.state,
            coordinates: {
              longitute: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          }));
        });
      } else if (result.state === 'denied') {
        report(result.state);
        setGeoloc((currentloc) => ({ ...currentloc, permission: result.state })); // Update permission
      }
      //   result.addEventListener('change', () => {
      //     report(result.state);
      //   });
    });
  }
  useEffect(() => {
    getGeoloc();

    return () => {};
  }, []);

  //   getGeoloc();

  const [{ title, description, coordinates, tags }, handleChange] = useForm({
    title: '',
    description: '',
    coordinates: geoloc.coordinates, //[geoloc.coordinates.longitude, geoloc.coordinates.latitude],
    tags: [],
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // apiHandler
    //   .signin({ title, description, coordinates, tags })
    //   .then((res) => {
    //     console.log(res);
    //     navigate('/');
    //   })
    //   .catch((e) => {
    //     setError(e.response.data);
    //   });
  };

  //   useEffect(() => {
  //     console.log('mytags Updated', myTags);
  //     return () => {};
  //   }, [myTags]);

  const handleOnchanged = (value) =>
    setMyTags((curval) => {
      curval.push(value);
      return curval;
    });

  const deleteHandle = (event) => {
    console.log(event.target.parentElement.querySelector('p').textContent);
    setMyTags((currentTags) => {
      return currentTags.filter((tag) => tag.tagName !== event.target.parentElement.querySelector('p').textContent);
    });
    console.log(myTags);
  };

  return (
    <>
      {' '}
      <MyTagsContext.Provider value={myTags}>
        <div className="form-content">
          {error && <h3 className="error">{error.message}</h3>}
          <form className="FormService" onSubmit={handleSubmit}>
            <h2>Service:</h2>

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
                <TagSearch type="text" myTags={myTags} onChange={handleOnchanged}></TagSearch>
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
                location:{console.log(geoloc.coordinates)}
                <div className="previewLoc">
                  {/* <MapZone coordinate={coordinates} /> */}
                  <DragableMapZone coordinate={coordinates} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="Recap">Recap :</div>
              </>
            )}
            {step === stepNumber && <button>Create this service and go to add availabilities page</button>}
          </form>
          <div className="step-buttons">
            {step > 1 && (
              <div className="btn-container">
                <button className="back-button" onClick={() => setStep((curval) => curval - 1)}>
                  Go Back
                </button>
              </div>
            )}

            {step < stepNumber && (
              <div className="btn-container">
                <button className="next-button" onClick={() => setStep((curval) => curval + 1)}>
                  Next Step
                </button>
              </div>
            )}
          </div>
        </div>
      </MyTagsContext.Provider>
    </>
  );
};

export default FormService;
