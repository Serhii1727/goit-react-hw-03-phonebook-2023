import css from './Filter.module.css';

export default function Filter({ changeFilter }) {
  return (
    <label className={css.label}>
      <span>Find contacts by name</span>
      <input onChange={changeFilter} type="text" className={css.input} />
    </label>
  );
}
