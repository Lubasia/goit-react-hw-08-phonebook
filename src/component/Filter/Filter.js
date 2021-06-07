import { connect } from 'react-redux';
import phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className={styles.container}>
      <label>
        Найти контакт по имени 🔍{' '}
        <span role="img" aria-label="Иконка поиска"></span>
        <Form.Control
          type="text"
          value={value}
          onChange={onChangeFilter}
          name="filter"
        />
      </label>
    </div>
  );
};
const mapStateToProps = state => ({
  value: phoneBookSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeFilter: event =>
    dispatch(phoneBookActions.changeFilter(event.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
