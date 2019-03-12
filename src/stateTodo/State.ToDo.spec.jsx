
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import StateToDo from './StateToDo';

configure({adapter: new Adapter()});

describe('NewToDo', () => {
  it('renders', () => {
    const newToDo = shallow(<StateToDo submit={() => {}} />);

    expect(newToDo).toBeTruthy();
  });

  it('handles input change on state', () => {
    const stateToDo = shallow(<StateToDo submit={() => {}} />);

    stateToDo.instance().handleChange({target: { value: 'Some To Do Text' }});

    expect(stateToDo.state().toDo).toBe('Some To Do Text');
  });

  it('updates state on input change', () => {
    const stateToDo = shallow(<StateToDo submit={() => {}} />);

    stateToDo.find('.state-to-do__input').simulate('change', {
      target: { value: 'Create slides' }
    });

    expect(stateToDo.state().toDo).toBe('Create slides');
  });

  it('handle submit', () => {
    const preventDefault = jest.fn();
    const handleSubmit = jest.fn();
    const stateToDo = shallow(<StateToDo submit={handleSubmit} />);

    stateToDo.setState({toDo: 'Foo'});

    stateToDo.find('.state-to-do').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith('Foo');
    expect(stateToDo.state().toDo).toBe('');
  });

  it('calls props.submit on submit', () => {
    const submit = jest.fn();
    const stateToDo = shallow(<StateToDo submit={submit} />);

    stateToDo.find('.state-to-do__input')
      .simulate('change', {target: {value: 'one more toDo'}});
    stateToDo.find('.state-to-do')
      .simulate('submit', {preventDefault() {}});

    expect(submit).toHaveBeenCalledWith('one more toDo');
  });

  it('clear state on submit', () => {
    const stateToDo = shallow(<StateToDo submit={() => {}} />);

    stateToDo.find('.state-to-do__input')
      .simulate('change', {target: {value: 'one more toDo'}});
    stateToDo.find('.state-to-do')
      .simulate('submit', {preventDefault() {}});

    expect(stateToDo.state().toDo).toBe('');
  });

  it('calls preventDefault on submit', () => {
    const preventDefault = jest.fn();
    const stateToDo = shallow(<StateToDo submit={() => {}} />);

    stateToDo.find('.state-to-do__input')
      .simulate('change', {target: {value: 'one more toDo'}});
    stateToDo.find('.state-to-do')
      .simulate('submit', {preventDefault});

    expect(preventDefault).toHaveBeenCalled();
  });
});