import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        toast.success("Good luck! See ya later.", {
          icon: "👋",
        });
      })
      .catch((error) => {
        toast.error("Logout failed. Please try again.");
        console.log(error.message);
      });
  };

  return (
    <div className={css.wrapper}>
      <p className={css.text}>Welcome, {user.name} 🙂</p>
      <button className={css.btn} type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}