import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import CategoryPage from "./components/CategoryPage.tsx";
import DetailsCategory from "./components/DetailsCategory.tsx";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";

const router = createBrowserRouter([
    {
        path: "*",
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/collection",
        element: <CategoryPage/>,
        errorElement: <ErrorPage/>,
    },
    // TODO: child path don't work. >(
    {
        path: '/collection/letters/*',
        element: <DetailsCategory/>,
        errorElement: <ErrorPage/>
    },
    // Auth
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
