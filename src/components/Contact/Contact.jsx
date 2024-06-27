import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";

import { FaPhoneAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";

import { openModal } from "../../redux/modal/slice";
import { changeContact } from "../../redux/contacts/operations";
import { ValidationForm } from "../ContactForm/ContactForm";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(openModal(id));
  };


  const handleChange = (values) => {
const { name, number } = values;
    dispatch(changeContact({ id, name, number }))
      .unwrap()
      .then(() => {
        toast.success("The contact has been changed", {
          style: { background: "white", color: "black" },
          position: "top-center",
        });
      })
      .catch(() => {
        toast("Was error, please try again", {
          style: { background: "#fb30c8" },
          containerStyle: {
            top: 150,
            left: 20,
            bottom: 20,
            right: 20,
          },
        });
      });
  }
  
 const initialContact = {
   name: name,
   number: number,
 };

  return (
    <Formik
      initialValues={initialContact}
      onSubmit={handleChange}
      validationSchema={ValidationForm}
    >
      <Form className={css.formStyle}>
        <div className={css.fieldStyle}>
          <label htmlFor={name}><IoPerson /> Name</label>
          <Field className={css.field} id={name} type="text" name="name" />
          <ErrorMessage className={css.err} name="name" component="span" />
        </div>

        <div className={css.fieldStyle}>
          <label htmlFor={number}><FaPhoneAlt /> Number</label>
          <Field className={css.field} id={number} type="tel" name="number" />
          <ErrorMessage className={css.err} name="number" component="span" />
        </div>

        <div className={css.btnBlock}>
          <button className={css.btn} type="submit">
            Change
          </button>
          <button className={css.btn} type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Form>
    </Formik>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
