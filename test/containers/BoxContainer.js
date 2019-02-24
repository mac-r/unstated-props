import { Container } from 'unstated';

class BoxContainer extends Container {
  constructor(props) {
    super(props);
    this.state = { box: 'This is a box' };
  }
}

export default BoxContainer;
