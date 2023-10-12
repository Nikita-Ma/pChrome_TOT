import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import ModalCategory from "./components/ModalCategory.tsx";
import NotFound from "./components/NotFound.tsx";
import DetailsCategory from "./components/DetailsCategory.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/collection",
        element: <ModalCategory/>,
        errorElement: <ErrorPage/>,
    },
    // TODO: child path don't work. >(
    {
        path: '/collection/letters',
        element: <DetailsCategory/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "*",
        element: <NotFound/>,
        errorElement: <ErrorPage/>,
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
