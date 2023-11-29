import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FormButton({ type, name, form }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if(type !== 'modify'){    
      if (isFormVisible) { navigate('/' + name); }
      else { navigate('/' + name + '/' + type); }
    }
  };

  return (
    <>
        <button id = "formButton" onClick={toggleFormVisibility}>{type}</button>
        {isFormVisible && <div className="formLabelContainer">{form}</div>}
    </>
  );
}

export default FormButton;
