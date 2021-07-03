import React from 'react';
import checkedIcon from '../assets/icon-check.svg';

import './Checkbox.css';

export default function Checkbox({ onClick, add, theme, active }) {
  function toggleCheckbox(e) {
    e.preventDefault();

    // Run external onClick function (create or complete the todo)
    onClick();
  }

  return (
    <div className='checkbox-container'>
      <button
        className={`custom-checkbox ${theme === 'dark' ? 'custom-checkbox-dark' : ''} ${
          active && 'custom-checkbox-active'
        }`}
        onClick={(e) => toggleCheckbox(e)}
        aria-labelledby={add ? 'Create new todo' : 'Complete todo'}
        type='submit'
      >
        <img src={checkedIcon} alt='checkbox checked icon' style={active ? {} : { visibility: 'hidden' }} />
      </button>
    </div>
  );
}
