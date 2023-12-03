import { Form, useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import DataTable from "../DataTable";
import FormButton from "../FormButton";
import UserForm from "../forms/UserForm";
import BookForm from "../forms/BookForm";
import ReviewForm from "../forms/ReviewForm";
import CommentForm from "../forms/CommentForm";
import { BackOfficeLayout } from "../BackOfficeLayout";
import { useEffect } from "react";
import { useState } from "react";
import "../../stylesheet/backoffice.css";


function Acceuil() {
    const [tableKey, setTableKey] = useState(0);
    const token = useSelector(state => state.auth.token);
    console.log("token: ", token);
    const { name, type } = useParams();


    return (
        console.log("name: ", name),
        <BackOfficeLayout content={
            (name === 'users') ? <FormButton type={type} name={name} form={<UserForm type={type}/>}/> :
            (name === 'books') ? <FormButton type={type} name={name} form={<BookForm type={type}/>}/> :
            (name === 'reviews') ? <FormButton type={type} name={name} form={<ReviewForm type={type}/>}/> :
            (name === 'comments') ? <FormButton type={type} name={name} form={<CommentForm type={type}/>}/> :
            <></>
        }/>
    );
    
}

export default Acceuil;