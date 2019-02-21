import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import withContainers from './containers';

const BookElement = withContainers(({ containers: { books }}) => (
  <div>{books.state.book}</div>
), { root: true })

describe('Awesome test.', () => {
  // it('should test default awesome function', () => {
  //   // const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh'
  //   assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(');
  // });

  it('should test awesome function', () => {
    const wrapper = render(<BookElement/>);
    expect(wrapper.text()).to.contain('Noice book');
  });
});
