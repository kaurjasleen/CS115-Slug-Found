import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomePage } from '../components/HomePage/HomePage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
  it('should render HomePage properly', () => {
    const wrapper = shallow(<HomePage isLoggedIn />);
    expect(wrapper).toMatchSnapshot();
  });
});
