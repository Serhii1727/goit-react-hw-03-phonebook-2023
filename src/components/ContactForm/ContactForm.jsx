import { Component } from 'react';
import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeInput = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  addContact = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.resetInputForm();
  };

  resetInputForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.addContact}>
        <label className={css.label}>
          <span className={css.label__name}>Name</span>
          <input
            onChange={this.handleChangeInput}
            className={css.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          <span className={css.label__name}>Number</span>
          <input
            onChange={this.handleChangeInput}
            className={css.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}
