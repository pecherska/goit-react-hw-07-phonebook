import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactFormFormik } from './ContactForm/ContactFormFormik';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ContainerForm, Title } from './App.styled.js';

export const App = () => {
  return (
    <>
      <ToastContainer />
      <ContainerForm>
        <Title>Phonebook</Title>
        <ContactFormFormik></ContactFormFormik>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </ContainerForm>
    </>
  );
};
