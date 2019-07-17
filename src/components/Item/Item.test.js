import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Item } from './Item';

configure({ adapter: new Adapter() });

describe('<Item />', () => {
  it('should ', () => {
    const wrapper = shallow(
      <Item
        post={{ id: '1', createAt: 0, title: 'title', imageURL: 'http://placehold.it/300x300' }}
      />,
    );
  });
});
