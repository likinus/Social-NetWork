import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status="IT-kama" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('IT-kama');
  });

  test('after creation span should be displayed with status', () => {
    const component = create(<ProfileStatus status="IT-kama" />);
    const root = component.root;
    let span = root.findByType('span');
    expect(span).not.toBeNull();
  });

  test('after creation input shouldnt be displayed with status', () => {
    const component = create(<ProfileStatus status="IT-kama" />);
    const root = component.root;
    let span = root.findByType('span');
    expect(span.children[0]).toBe('IT-kama');
  });

  test('input should be displayed in edit mode instead of span', () => {
    const component = create(<ProfileStatus status="IT-kama" />);
    const root = component.root;
    let span = root.findByType('span');
    span.props.onDoubleClick();
    let input = root.findByType('input');
    input.props.value;
    expect(input.props.value).toBe('IT-kama');
  });

  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="IT-kama" updateStatus={mockCallback} />);
    const instace = component.getInstance();
    console.log(instace)
    instace.deactivateEditMode();
    console.log(mockCallback.mock.calls.length)
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
