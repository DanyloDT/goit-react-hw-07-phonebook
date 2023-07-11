import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorContacts } from 'redux/selector';
import { addContact } from 'redux/contactsSlice';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { name, number } = state;
  const dispatch = useDispatch();
  const contacts = useSelector(selectorContacts);

  const handleChange = e => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = e => {
    e.preventDefault();

    const findName = contacts.find(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );
    if (findName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
    setState({ ...INITIAL_STATE });
  };

  return (
    <form className={css.contact_form} onSubmit={onSubmit}>
      <label className={css.contact_form_label}>
        <span>Name</span>
        <input
          className={css.contact_form_input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+((?:'[a-zA-Zа-яА-Я\s])?(?:-[a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я\s]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={e => handleChange(e)}
        />
      </label>
      <label className={css.contact_form_label}>
        <span>Number</span>
        <input
          className={css.contact_form_input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}[\s]?[\-]?\(?\d{1,3}?\)?[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={e => handleChange(e)}
        />
      </label>
      <button className={css.btn}>add contact</button>
    </form>
  );
};
