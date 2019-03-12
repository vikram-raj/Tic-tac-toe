import React from 'react';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import List from './List';

configure({adapter: new Adapter()});

describe('ToDo', () => {
  it('renders', () => {
    const list = shallow(<List />);

    expect(list).toBeTruthy();
  });

  it('renders a list of to do based on state.toDos', () => {
    const list = shallow(<List />);
    list.setState({
      toDos: [
        { complete: false, text: 'One' },
        { complete: true, text: 'Two' }
      ]
    });

    expect(toJson(list)).toMatchSnapshot();
  });
});