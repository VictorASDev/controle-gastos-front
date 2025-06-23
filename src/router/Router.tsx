// router.jsx ou main.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import SignIn from '../pages/SignUp';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Home />
    )
  },
  {
    path: '/profile',
    element:(
      <PrivateRoute>
        <Profile />,
      </PrivateRoute>
    )
  },
  {
    path: '/signup',
    element: (
      <SignIn />
    )
  },
  {
    path: '/login',
    element: (
        <Login />
    )
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
