import { useDispatch, useSelector } from 'react-redux';
import { ContactListElements, DeleteContactBtn } from './ContactList.styled';
import { deleteContactsAction } from 'components/store/contacts/contactsSlice';

const ContactList = () => {
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const dispatch = useDispatch();
  const deleteContacts = id => {
    dispatch(deleteContactsAction(id));
  };
  return (
    <>
      <ul>
        {(filter ? getFilteredContacts() : contacts).map(
          ({ name, number, id }) => (
            <ContactListElements key={id}>
              <p>{name}</p>:<p>{number}</p>
              <DeleteContactBtn
                type="button"
                onClick={() => deleteContacts(id)}
              >
                Delete
              </DeleteContactBtn>
            </ContactListElements>
          )
        )}
      </ul>
    </>
  );
};

export default ContactList;
