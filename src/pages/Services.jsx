import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import CardDetailed from '../components/CardDetailed/CardDetailed';

import './Services.css';
// import { useNavigate } from 'react-router-dom';

const Services = () => {
  // const navigate = useNavigate();
  // const [menuState, setMenuState] = useState('myServices');
  const { step, id } = useParams();

  return (
    <div className="Services">
      <div className="menu">
        {/* <div onClick={setMenuState('myServices')}></div> */}
        <NavLink className="menu-button" to="/services/myServices">
          My Services
        </NavLink>
        <NavLink className="menu-button" to="/services/new">
          New Service
        </NavLink>
        <NavLink className="menu-button" to="/services/myReservations">
          My Reservations
        </NavLink>
      </div>
      <div className="content">
        {step === 'myServices' && !id && apiHandler.getMyServices()}
        {console.log(step, id)}
        {step === 'myServices' && id && (
          <CardDetailed
            vals={apiHandler
              .getServiceById(id)
              .then((service) => {
                console.log(service);
              })
              .catch((e) => {
                setError(e.response.data);
              })}
          ></CardDetailed>
        )}
      </div>
    </div>
  );
};

export default Services;
