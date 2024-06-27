import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export default function PrivateRoute({ component, redirectTo }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
  
    return isLoggedIn ? component : <Navigate to={redirectTo} />;
  }

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    redirectTo: PropTypes.string.isRequired,
  };