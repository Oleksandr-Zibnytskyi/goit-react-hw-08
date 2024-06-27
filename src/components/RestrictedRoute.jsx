import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export default function RestrictedRoute({ component, redirectTo }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
  
    return isLoggedIn ? <Navigate to={redirectTo} /> : component;
  }

RestrictedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    redirectTo: PropTypes.string.isRequired,
  };