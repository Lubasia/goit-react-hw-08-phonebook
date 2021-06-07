import { Component } from 'react';
import { connect } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormContact extends Component {
  state = {
    name: '',
    number: '',
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contacts = this.props.contacts;

    if (contacts.some(contact => contact.name === name)) {
      alert('This contact is already exist!! Try one more time, please!');
      return;
    }

    this.props.onAddContact(name, number);
    this.reset();
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={this.handleChangeInput}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicNumber">
          <Form.Label>Номер</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={number}
            onChange={this.handleChangeInput}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить контакт{' '}
          <span role="img" aria-label="Иконка done">
            ✅{' '}
          </span>
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: phoneBookSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onAddContact: (name, number) =>
    dispatch(phoneBookOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContact);
