import React from "react";
import Acceuil from "../components/Pages/Acceuil";  
import Login from "../components/Pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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