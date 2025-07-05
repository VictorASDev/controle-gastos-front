// router.jsx ou main.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import SignIn from '../pages/SignUp';
import Profile from '../pages/Profile';
import ProfileDetail from '../pages/ProfileDetail';

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
        <Profile />
      </PrivateRoute>
    )
  },
  {
    path: '/profile/:username',
    element:(
      <PrivateRoute>
        <ProfileDetail />
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
