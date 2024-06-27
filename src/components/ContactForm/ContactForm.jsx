import { useDispatch } from 'react-redux';
import { useId } from "react"
import { addContact } from '../../redux/contacts/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import toast from "react-hot-toast";

export const ValidationForm = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too short")
    .max(12, "Too long")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

        
  const initialContact = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully added.", {
          icon: "✍️",
        });

        actions.resetForm();
      })
      .catch((error) => {
        console.error("Failed to add contact:", error.message);
      });
  };



  return (
    <Formik
      initialValues={initialContact}
      onSubmit={handleSubmit}
      validationSchema={ValidationForm}
    >
     <Form className={css.form}>
        <div className={css.wraper}>
        <label htmlFor={nameFieldId}>Name</label>
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.wraper}>
        <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.input}
            type="text"
            name="number"
            placeholder="XXX-XX-XX"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;