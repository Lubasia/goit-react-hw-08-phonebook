import { Component } from 'react';
import { connect } from 'react-redux';

import { phoneBookOperations, phoneBookSelectors } from '../redux/phoneBook';

import ContactList from '../component/ContactList';
import FormContact from '../component/FormContact';
import Filter from '../component/Filter';
import Loader from '../component/Loader';

class PhonebookView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { contacts, isLoading } = this.props;
    return (
      <div>
        {isLoading && <Loader />}
        <h1>
          {' '}
          Phonebook{' '}
          <span role="img" aria-label="Иконка телефон">
            ☎️
          </span>
        </h1>
        <FormContact />
        {isLoading && <Loader />}

        {contacts.length > 1 && <Filter />}
        {contacts.length > 0 && <ContactList />}
        {contacts.length === 0 && (
          <h3>
            {' '}
            No Contacts{' '}
            <span role="img" aria-label="Иконка грусти">
              🙁
            </span>
          </h3>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contacts: state.contacts.items,
  isLoading: phoneBookSelectors.getLoading(state),
  error: phoneBookSelectors.getError(state),
});
const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phoneBookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookView);
