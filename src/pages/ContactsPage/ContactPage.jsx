import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import css from "./ContactsPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <p className={css.title}>Your Contacts</p>
      <ContactForm />
      <SearchBox />
      <div className={css.loader}>{isLoading && "Request in progress..."}</div>
      <ContactList />
      {isLoading && <Loader />}
      {isError && <Error />}
    </div>
  );
}