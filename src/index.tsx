import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Sheet} from "./BackPartPages/SheetPage/Sheet";
import {SheetForm} from "./BackPartPages/SheetPage/component/Forms/SheetForm";
import {CommandForm} from "./BackPartPages/SheetPage/component/Forms/CommandForm";
import {Home} from "./FrontPartPages/pages/Home/Home"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Club} from "./FrontPartPages/pages/club/Club";
import {Teams} from "./FrontPartPages/pages/Teams/Teams";
import {Staff} from "./FrontPartPages/pages/Staff/Staff";
import {Galery} from "./FrontPartPages/pages/Galery/Galery";
import {Contact} from "./FrontPartPages/pages/Contact/Contact";
import {Informations} from "./FrontPartPages/pages/Informations/Informations";
import {StaffOutlet} from "./BackPartPages/StaffOutlet";
import {StaffDisplay} from "./BackPartPages/StaffDisplay/StaffDisplay";
import {StaffDisplayForm} from "./BackPartPages/StaffDisplay/component/Forms/StaffDisplayForm";
import {GaleryEditor} from "./BackPartPages/GaleryEditor/GaleryEditor";
import {GaleryPictureForm} from "./BackPartPages/GaleryEditor/Components/Forms/GaleryPictureForm";




const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "home",
                element: <Home/>,
            },
            {
                path: "club",
                element: <Club/>,
            },
            {
                path: "teams",
                element: <Teams/>,
            },
            {
                path: "staffList",
                element: <Staff/>,
            },
            {
                path: "galery",
                element: <Galery/>,
            },
            {
                path: "contact",
                element: <Contact/>,
            },
            {
                path: "info",
                element: <Informations/>,
            },
        ]
    },
    {
        path: "staff",
        element: <StaffOutlet/>,
        children: [
            {
                path: "sheet",
                element: <Outlet/>,
                children: [
                    {
                        path: "",
                        element: <Sheet/>,
                    },
                    {
                        path: "SheetForm/:Id",
                        element: <SheetForm/>,
                    },
                    {
                        path: "CommandForm/:Id/:SheetPK",
                        element: <CommandForm/>,
                    },
                ]
            },
            {
                path: "staffDisplay",
                element: <Outlet/>,
                children: [
                    {
                        path: "",
                        element: <StaffDisplay/>,
                    },
                    {
                        path:"Form/:Id",
                        element: <StaffDisplayForm/>,
                    }
                ],
            },
            {
                path: "galeryEditor",
                element: <GaleryEditor/>
            },
            {
                path: "galeryPictureForm/:Id",
                element: <GaleryPictureForm/>,
            }
        ]
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
        <RouterProvider router={router}/>
    </>
);


reportWebVitals();
