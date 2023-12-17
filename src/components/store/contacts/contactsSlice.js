import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    addContactsAction: {
      prepare: contacts => {
        return { payload: { ...contacts, id: nanoid() } };
      },
      reducer: (state, action) => {
        state.contacts.push(action.payload);
      },
    },
    deleteContactsAction: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addContactsAction, deleteContactsAction } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
