import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaSync } from "react-icons/fa";

//write a button that modify a line from a table, that recieve the name of the table, the object with the modified data and the id of the line
function ModifyButton({id}) {
  // my name is an 
  const navigate = useNavigate();
  const params = useParams();
  const handleClick = () => {
    navigate(`/${params.name}/modify/${id}`);
  };

  return (
    <>
      <button onClick={handleClick}>
        <FaSync />
      </button>
    </>
  );
}

export default ModifyButton;

