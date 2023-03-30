import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
  const userRow = useSelector((row) => row);
  let auth = userRow.user.isLoggedIn;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
