import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorContacts } from 'redux/selector';

import css from './ContactForm.module.css';
import { addContactThunk } from 'redux/operations';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { name, phone } = state;
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

    dispatch(addContactThunk({ name, phone }));
    setState({ ...INITIAL_STATE });
  };

  return (
    <form className={css.contact_form} onSubmit={onSubmit}>
      <label className={css.contact_form_label}>
        <span>Name</span>
        <input
          className={css.contact_form_input}
          type="phone"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+((?:'[a-zA-Zа-яА-Я\s])?(?:-[a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я\s]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={e => handleChange(e)}
        />
      </label>
      <label className={css.contact_form_label}>
        <span>Phone</span>
        <input
          className={css.contact_form_input}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}[\s]?[\-]?\(?\d{1,3}?\)?[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={e => handleChange(e)}
        />
      </label>
      <button className={css.btn}>add contact</button>
    </form>
  );
};
