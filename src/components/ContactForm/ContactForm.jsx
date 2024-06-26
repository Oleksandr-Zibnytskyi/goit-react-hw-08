import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import toast from "react-hot-toast";


const ContactForm = () => {
  const dispatch = useDispatch();
  const [parent] = useAutoAnimate({
    easing: "linear",
    duration: 300,
  });

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

  const ValidationForm = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const initialContact = {
    name: '',
    number: '',
  };

  return (
    <Formik
      initialValues={initialContact}
      onSubmit={handleSubmit}
      validationSchema={ValidationForm}
    >
     <Form className={css.form}>
        <div ref={parent} className={css.wrapper}>
          <label htmlFor="name">Name</label>
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div ref={parent} className={css.wrapper}>
          <label htmlFor="number">Number</label>
          <Field
            className={css.input}
            type="text"
            name="number"
            placeholder="XXX-XX-XX"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;