import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShalloWrapper for the App component.
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Returns ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper Enzyme shallow wrapper to search within.
 * @param {string} val Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComonent = findByTestAttr(wrapper, 'component-app');
  expect(appComonent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking increment button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
});

test('clicking decrement button decrements counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('counter cannot be decremented below 0', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter);
});

test('error shown if user tries to decrement a 0 counter', () => {
  const wrapper = setup(null, { counter: 0 });

  let errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});

test('error clears when user increment the counter', () => {
  const wrapper = setup(null, { counter: 0, hasError: true });

  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});