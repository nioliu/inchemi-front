import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Components.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Upload} from "./components/Upload.tsx";
import {History} from "./components/History.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <App></App>, // default error page like 404

        children: [
            {
                index: true,
                element: <Navigate to={"/upload"} replace></Navigate>
            },

            {
                path: "/upload",
                element: <Upload></Upload>
            },
            {
                path: "/history",
                element: <History></History>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
