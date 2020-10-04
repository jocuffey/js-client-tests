// @flow

import * as React from 'react';
import { Alert } from '../src/widgets.js';
import { shallow } from 'enzyme';

describe('Alert tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<></>)).toEqual(true);
  });

  test('Show alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });

  test('Close alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').simulate('click');

      expect(wrapper.matchesElement(<></>)).toEqual(true);

      done();
    });
  });

  test('Show 3 alerts and close 2nd', (done) => {
    const wrapper = shallow(<Alert />);
    Alert.danger('test');

    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);
      done();
    });

    Alert.danger('another test');

    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              another test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').simulate('click');

      expect(wrapper.matchesElement(<></>)).toEqual(true);
      done();
    });

    Alert.danger('a third test');

    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              a third test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });
});
