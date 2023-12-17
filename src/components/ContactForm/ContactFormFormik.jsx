import { Formik, ErrorMessage } from 'formik';
import { FormStyled, FormButton, FormInput } from './ContactFormFormik.styled';
import { nanoid } from 'nanoid';

import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContactsAction } from 'components/store/contacts/contactsSlice';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required name'),
  number: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
});

export const ContactFormFormik = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);
  const nameId = nanoid();
  const numberId = nanoid();

  const handleSubmit = (values, actions) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      toast.warn(`${values.name} is already in contacts!`);
      return;
    }
    dispatch(addContactsAction(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <label htmlFor={nameId}>
          Name
          <FormInput
            id={nameId}
            type="text"
            name="name"
            required
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          ></FormInput>
          <ErrorMessage name="name" component="div" />
        </label>

        <label htmlFor={numberId}>
          Number
          <FormInput
            id={numberId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          ></FormInput>
          <ErrorMessage name="number" component="div" />
        </label>

        <FormButton type="submit">Add contact</FormButton>
      </FormStyled>
    </Formik>
  );
};
