import { Route, useNavigate } from 'react-router-dom';

function PublicRoute({ children, isAuthenticated, ...rest }) {
  const Navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
