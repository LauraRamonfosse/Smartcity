import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../stylesheet/backoffice.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteUser } from "../API/user";
import { useParams, useNavigate } from "react-router-dom";

//write a button that delete a line from a table, that recieve the name of the table and the id of the line
 
function DeleteButton({id}) {

  
  const [showAlert, setShowAlert] = useState(false);
  const params = useParams();
  const Navigate = useNavigate();

  let deleteData = null;
  console.log(params.name);
  
  switch (params.name) {
    case "users":
      deleteData = async (id) => {
        try {
          await deleteUser(id);
          // once the user is deleted, reload the page to see the changes
        } catch (e) {
          console.log(e);
        }
      }; 
      break;
  }
  
  const handleClick = () => {
    deleteData(id);
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
