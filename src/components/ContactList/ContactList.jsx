import { useDispatch, useSelector } from 'react-redux';
import { ContactListElements, DeleteContactBtn } from './ContactList.styled';

import { deleteContact, fetchContacts } from 'components/store/operations';
import { useEffect } from 'react';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'components/store/selectors';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

const ContactList = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  useEffect(() => {
    if (!!error) {
      toast.error(error);
    }
    dispatch(fetchContacts());
  }, [dispatch, error]);

  const filteredContacts = useSelector(selectVisibleContacts);

  const isLoading = useSelector(selectIsLoading);

  const deleteItem = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <ul>
        {isLoading && <Loader />}
        {!!filteredContacts.length &&
          filteredContacts.map(({ name, phone, id }) => (
            <ContactListElements key={id}>
              <p>{name}</p>:<p>{phone}</p>
              <DeleteContactBtn type="button" onClick={() => deleteItem(id)}>
                Delete
              </DeleteContactBtn>
            </ContactListElements>
          ))}
      </ul>
    </>
  );
};

export default ContactList;
