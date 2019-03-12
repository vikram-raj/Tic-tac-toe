import React from 'react';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import ToDo from './ToDo';

configure({adapter: new Adapter()});

describe('ToDo', () => {
  it('displays text based on props.text', () => {
    const toDo = shallow(
      <ToDo
        complete={false}
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );

    expect(toDo.find('.to-do__title').text()).toBe('Test ToDo');

    toDo.setProps({text: 'New ToDo'});

    expect(toDo.find('.to-do__title').text()).toBe('New ToDo');
  });

  xit('changes class based on props.completion', () => {
    const toDo = shallow(
      <ToDo
        complete
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );
    const inCompleteToDo = shallow(
      <ToDo
        complete={false}
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );

    // The first time this test is run, it will generate a snapshot of the component's output.
    // As further changes are made to the component, you simply review the diff to ensure
    // that the changes are intentional.
    expect(toJson(toDo)).toMatchSnapshot();

    // We still need to check both potential states of the component!
    expect(toJson(inCompleteToDo)).toMatchSnapshot();
  });

  xit('ToDo calls props.toggleCompletion on checkbox change', () => {
    // Creating a sinon spy,
    // essentially a dummy function who's whole purpose is to tell us information about how it is called.
    const toggleCompletionSpy = jest.fn();

    // We pass the spy as a prop to the component
    const toDo = shallow(
      <ToDo
        complete
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={toggleCompletionSpy}
      />,
    );

    toDo.find('.to-do__completion').simulate('change');

    expect(toggleCompletionSpy).toHaveBeenCalled();
  });

  xit('ToDo calls props.deleteTodo on delete button click', () => {
    const deleteToDoSpy = jest.fn();

    const toDo = shallow(
      <ToDo
        complete
        deleteToDo={deleteToDoSpy}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );

    toDo.find('button').simulate('click');

    expect(deleteToDoSpy).toHaveBeenCalled();
  });
});