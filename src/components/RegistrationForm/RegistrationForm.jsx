import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import toast from "react-hot-toast";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("This field is required"),
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string().min(6, "Too short").required("This field is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("You have successfully registered!");
        actions.resetForm();
      })
      .catch((error) => {
        toast.error("Something went wrong, please try again.");
        console.error("Registration failed:", error.message);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.inputWrapper}>
          <label htmlFor="name">Username</label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id="name"
            autoFocus
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.inputWrapper}>
          <label htmlFor="email">Email</label>
          <Field className={css.input} type="email" name="email" id="email" />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>
        <div className={css.inputWrapper}>
          <label htmlFor="password">Password</label>
          <Field
            className={css.input}
            type="password"
            name="password"
            id="password"
          />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </div>
        <button className={css.btn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}