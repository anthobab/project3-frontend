import React from 'react';
import FormService from '../components/Forms/FormService';
import './NewService.css';
const NewService = () => {
  return (
    <div className="NewService">
      <h2>Add Service:</h2>
      <FormService></FormService>
    </div>
  );
};

export default NewService;
