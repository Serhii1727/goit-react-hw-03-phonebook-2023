import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const dataContactsLocalStorage = JSON.parse(
      localStorage.getItem('contacts')
    );
    if (dataContactsLocalStorage) {
      this.setState({ contacts: dataContactsLocalStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const isContactName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactName) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, number, id: nanoid() }],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizeFilter);
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts } = this.state;
    const visibleContacts = this.getFilterContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.title}>Contacts</h2>
        <Filter changeFilter={this.changeFilter} />
        {contacts.length >= 0 && (
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
