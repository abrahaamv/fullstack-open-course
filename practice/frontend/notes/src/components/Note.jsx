const Note = ({note, handleClick}) => <li className='note'>{note.content} <button onClick={handleClick}>Make {note.important ? 'uninportant' : 'important'}</button></li>

export default Note