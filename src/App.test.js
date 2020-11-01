import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import MainApp from './App';
import ReactDOM from 'react-dom';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
