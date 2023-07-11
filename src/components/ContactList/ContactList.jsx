import { useDispatch, useSelector } from 'react-redux';
import { selectorContacts, selectorFilter } from 'redux/selector';
import { onDelete } from 'redux/contactsSlice';
import css from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectorContacts);
  const filter = useSelector(selectorFilter);

  const handleDelete = id => {
    dispatch(onDelete(id));
  };

  const getFilteredData = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const filteredData = getFilteredData();

  return (
    <ul className={css.list}>
      {filteredData.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            <span className={css.item_text}>
              {name}: {number}
            </span>
            <button className={css.btn} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
