import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import apiHandler from '../../api/apiHandler';
import { useNavigate } from 'react-router-dom';
import './FormService.css';
import MapZone from '../MapZone/MapZone';
import DragableMapZone from '../MapZone/DragableMapZone';

const FormService = () => {
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

  return (
    <>
      {error && <h3 className="error">{error.message}</h3>}
      <form className="FormService" onSubmit={handleSubmit}>
        <h2>Service:</h2>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" onChange={handleChange} value={title} />
        <label htmlFor="description">Description</label>
        <input type="description" id="description" name="description" onChange={handleChange} value={description} />
        {/* TODO : Tags & choice location address */}
        location:{console.log(geoloc.coordinates)}
        <div className="previewLoc">
          {/* <MapZone coordinate={coordinates} /> */}
          <DragableMapZone coordinate={coordinates} />
        </div>
        <button>Create this service and add availabilities</button>
      </form>
    </>
  );
};

export default FormService;
