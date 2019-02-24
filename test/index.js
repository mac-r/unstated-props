import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import withContainers from './containers'

const ChildElement = withContainers(({ containers: { boxes }}) => (
  <div>{boxes.state.box}</div>
))

const RootElement = withContainers(({ containers: { books }}) => (
  <div>
    <div>{books.state.book}</div>
    <ChildElement/>
  </div>
), { root: true })


describe('basic test cases', () => {
  it('should render book value in the root element', () => {
    const wrapper = render(<RootElement/>);
    expect(wrapper.text()).to.contain('Noice book');
  });

  it('should render box value from the child element', () => {
    const wrapper = render(<RootElement/>);
    expect(wrapper.text()).to.contain('This is a box');
  });
});
