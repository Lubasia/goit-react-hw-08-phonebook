import { connect } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import styles from '../ContactList/ContactList.module.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.ContactList}>
    <h2> Contacts </h2>
    {contacts.map(({ id, name, number }) => (
      <li className={styles.ContactListItem} key={id}>
        <span className={styles.ContactListName}>{name} :</span>
        <span> {number} </span>
        <Button
          variant="outline-success"
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Удалить{' '}
          <span role="img" aria-label="Иконка телефон">
            🗑
          </span>
        </Button>
      </li>
    ))}
  </ul>
);

const mapStateToProps = state => {
  return {
    contacts: phoneBookSelectors.getFilteredContacts(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(phoneBookOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
