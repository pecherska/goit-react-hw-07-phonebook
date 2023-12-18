import { Formik, ErrorMessage } from 'formik';
import { FormStyled, FormButton, FormInput } from './ContactFormFormik.styled';
import { nanoid } from 'nanoid';

import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { addContact } from 'components/store/operations';
import { selectContacts } from 'components/store/selectors';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required name'),
  phone: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
});

export const ContactFormFormik = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
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

    dispatch(addContact(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
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
            name="phone"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          ></FormInput>
          <ErrorMessage name="phone" component="div" />
        </label>

        <FormButton type="submit">Add contact</FormButton>
      </FormStyled>
    </Formik>
  );
};
