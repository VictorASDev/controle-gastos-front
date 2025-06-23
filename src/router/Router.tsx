// router.jsx ou main.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import SignIn from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/home',
    element:(
      <PrivateRoute>
        <Home />,
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
