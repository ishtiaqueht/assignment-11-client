import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Events from "../pages/events/Events";
import EventDetails from "../pages/eventdetails/EventDetails";
import MakeEvent from "../pages/makeEvent/MakeEvent";
import MyBookings from "../pages/MyBookings/MyBookings";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import UpdateEvent from "../pages/UpdateEvent/UpdateEvent";
import NotFound from "../pages/NotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventDetails /> },
      {
        path: "make-event",
        element: (
          <PrivateRouter>
            <MakeEvent />
          </PrivateRouter>
        ),
      },
      {
        path: "myBookings",
        element: (
          <PrivateRouter>
            <MyBookings />
          </PrivateRouter>
        ),
      },
      {
        path: "manageEvents",
        element: (
          <PrivateRouter>
            <ManageEvents />
          </PrivateRouter>
        ),
      },
      {
        path: "updateEvent/:id",
        element: (
          <PrivateRouter>
            <UpdateEvent />
          </PrivateRouter>
        ),
      },
      { path: "*", element: <NotFound /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
