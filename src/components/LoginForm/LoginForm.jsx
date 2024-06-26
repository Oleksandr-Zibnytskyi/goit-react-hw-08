import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string().min(6, "Too short").required("This field is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Welcome back!");
      })
      .catch((error) => {
        toast.error(
          "You have entered an incorrect email or password, please try again."
        );
        console.log(error.message);
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.inputWrapper}>
          <label className={css.label}>Email</label>
          <Field className={css.input} type="email" name="email" autoFocus />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>
        <div className={css.inputWrapper}>
          <label className={css.label}>Password</label>
          <Field className={css.input} type="password" name="password" />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </div>
        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
}