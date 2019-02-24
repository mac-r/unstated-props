import { Container } from 'unstated';

class BookContainer extends Container {
  constructor(props) {
    super(props);
    this.state = { book: 'Noice book' };
  }
}

export default BookContainer;
