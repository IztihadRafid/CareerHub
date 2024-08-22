import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Componenets/Root/Root.jsx';
import Home from './Componenets/Home/Home.jsx';
import AppliedJobs from './Componenets/AppliedJobs/AppliedJobs.jsx';
import ErrorPage from './Componenets/ErrorPage/ErrorPage.jsx';
import JobDetails from './Componenets/JobDetails/JobDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement : <ErrorPage></ErrorPage>,
    children:[
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/applied",
        element: <AppliedJobs></AppliedJobs>,
        loader: ()=>fetch('jobs.json')
      },
      {
        path:"/job/:id",
        element: <JobDetails></JobDetails>,
        loader: ()=>fetch('jobs.json')
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
