// @flow

import * as React from 'react';
import { TaskList, TaskNew, TaskDetails, TaskEdit } from '../src/task-components';
import { type Task } from '../src/task-service';
import { shallow } from 'enzyme';
import { Form, Button, Column, Alert } from '../src/widgets';
import { NavLink } from 'react-router-dom';

jest.mock('../src/task-service', () => {
  class TaskService {
    getAll() {
      return Promise.resolve([
        { id: 1, title: 'Les leksjon', done: false },
        { id: 2, title: 'Møt opp på forelesning', done: false },
        { id: 3, title: 'Gjør øving', done: false },
      ]);
    }

    get(id: number) {
      {
        return Promise.resolve([{ id: 1, title: 'Les leksjon', done: false }]);
      }
    }

    update(id: number, title: string) {
      return Promise.resolve(1);
    }

    create(title: string) {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }
  }
  return new TaskService();
});

describe('Task component tests', () => {
  test('TaskList draws correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskList opens TaskNew correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/new');
      done();
    });
  });

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow(<TaskNew />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });

  //First TaskDetails test
  test('TaskDetails draws correctly', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Column width={2}>Title:</Column>,
          <Column width={2}>Description:</Column>,
          <Column width={2}>Done:</Column>,
        ])
      ).toEqual(true);
      done();
    });
  });

  //Second TaskDetails test using snapshot
  test('TaskDetails draws correctly', () => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    expect(wrapper).toMatchSnapshot();
  });

  //TaskEdit test using snapshot
  test('TaskEdit draws correctly', () => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('TaskEdit correctly sets location on save', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Testing' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Testing" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/1');
      done();
    });
  });

  test('TaskEdit description updates onchange', () => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 2 } }} />);

    wrapper.find(Form.Textarea).simulate('change', { currentTarget: { value: 'Testing' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Textarea value="Testing" />)).toEqual(true);
  });

  test('TaskDetails correctly sets location on edit click', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    wrapper.find(Button.Success).simulate('click');
    // $FlowExpectedError
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/1/edit');
      done();
    });
  });
});
