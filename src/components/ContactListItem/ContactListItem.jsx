import css from './ContactListItem.module.css';

export default function ContactListItem({ id, name, number, onDelete }) {
  return (
    <li className={css.item}>
      <span className={css.span}>{name}</span>
      <span>{number}</span>
      <button
        className={css.button__delete}
        type="button"
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
