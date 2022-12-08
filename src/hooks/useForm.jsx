import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    setValues((curval) => ({
      ...curval,
      // e.target.name 'step1' : {title, description}
      // step1: {...values.step1, [e.target.name]: e.target.value}
      [e.target.name]: e.target.value,
    }));
  };
  const reset = () => {
    setValues(initialValues);
  };
  return [values, handleChange, reset];
};

export default useForm;

// const data = {
//   ...valuesStep1, ...valuesStep2, ...valuesStep3
// }

// const data = {
//   title: valuesStep1.title
// }
