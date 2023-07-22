import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Spinner...</div>;

  return state.data ? <Outlet /> : <Navigate to='/' />;
};
