import { useDispatch, useSelector } from 'react-redux';
import { selectFilterData } from 'redux/selector';

import css from './ContactList.module.css';
import { deleteContactThunk } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilterData);

  const handleDelete = id => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <ul className={css.list}>
      {filteredData.map(({ id, name, phone }) => {
        return (
          <li className={css.item} key={id}>
            <span className={css.item_text}>
              {name}: {phone}
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
