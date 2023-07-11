import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectorFilter } from 'redux/selector';
import { onFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectorFilter);

  const handleChangeFilter = e => {
    dispatch(onFilter(e.target.value));
  };
  return (
    <label className={css.filter_label}>
      <span>Find contact by name</span>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={handleChangeFilter}
      />
    </label>
  );
};
