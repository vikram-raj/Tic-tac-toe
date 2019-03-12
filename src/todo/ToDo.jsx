import React  from 'react';
import PropTypes  from 'prop-types';

export default function ToDo({complete, deleteToDo, text, toggleCompletion}) {
  return (
    <div className="to-do">
      <div className={complete ? 'to-do__info--complete' : 'to-do__info'}>
        <input
          checked={complete}
          className="to-do__completion"
          onChange={toggleCompletion}
          type="checkbox"
        />
        <span className="to-do__title">{text}</span>
      </div>
      <button onClick={deleteToDo}>X</button>
    </div>
  );
}

ToDo.propTypes = {
  complete: PropTypes.bool.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
};