import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ loggedIn }) {
   return loggedIn ? <Outlet /> : <Navigate replace to="/" />;
}

export default ProtectedRoute;
