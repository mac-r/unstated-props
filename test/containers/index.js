import { connect } from '../../lib';
import BookContainer from './BookContainer';
import BoxContainer from './BoxContainer';

export default connect({
  books: BookContainer,
  boxes: BoxContainer
});
