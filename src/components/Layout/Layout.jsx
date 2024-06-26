import PropTypes from 'prop-types';
import { Toaster } from "react-hot-toast";
import AppBar from "../../components/AppBar/AppBar"; 
import css from "./Layout.module.css"; 

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <AppBar />
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired, 
};