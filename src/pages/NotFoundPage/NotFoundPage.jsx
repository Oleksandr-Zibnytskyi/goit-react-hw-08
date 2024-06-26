import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <p>Sorry, but the page was not found.</p>
      <p>
        <Link to="/">Go Back!</Link>
      </p>
    </div>
  );
}