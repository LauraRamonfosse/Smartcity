import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../stylesheet/backoffice.css";
import { FaRegTrashAlt } from "react-icons/fa";

//write a button that delete a line from a table, that recieve the name of the table and the id of the line
function DeleteButton({id}) {
  const [showAlert, setShowAlert] = useState(false);
  const handleClick = () => {
    //delete the line from the table
    console.log("The line has been deleted");
    //open a pop-up window instead to inform of the success
    alert("The line has been deleted");
  };


  return (
    <>
      <Popup
        trigger={<button className="button"> <FaRegTrashAlt/> </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Delete </div>
            <div className="content">
              {' '}
              Are you sure you want to delete this line?{' '}
            </div>
            <div className="actions">
              <button className="button" onClick={() => {
                  handleClick();
                  close();
                }}
              >
                Yes
              </button>
              <button className="button" onClick={() => {
                  setShowAlert(false);
                  close();
                }}
              >
                No
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

export default DeleteButton;
