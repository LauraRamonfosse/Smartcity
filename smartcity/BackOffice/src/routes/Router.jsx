import React from "react";
import Acceuil from "../components/Pages/Acceuil";  
import Login from "../components/Pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    // {
    //     path: "/users",
    //     element: <User/>
    // },
    // {
    //     path: "/books",
    //     element: <Book/>
    // },
    // {
    //     path: "/reviews",
    //     element: <Review/>
    // },
    // {
    //     path: "/roles",
    //     element: <Role/>
    // },
    // {
    //     path: "/comments",
    //     element: <Comment/>
    // },
    // {
    //     path: "/acceuil",
    //     element: <Acceuil/>
    // },
    {
        path: "/:name/:type",
        element: <Acceuil/>
    },
    {
        path: "/:name/:type/:id",
        element: <Acceuil/>
    },
    {
        path: "/acceuil",
        element: <Acceuil/>
    },
    {
        path: "/*",
        element: <Login/>
    }
]);

export default router;