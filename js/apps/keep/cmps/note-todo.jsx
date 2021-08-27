export function NoteTodo({ note, onUpdateNote }) {
    const toggleIsDone = (todoIdx) => {
        const noteCopy = { ...note }
        noteCopy.info.todos[todoIdx].isDone = !noteCopy.info.todos[todoIdx].isDone
        onUpdateNote(noteCopy)
    }
    return (
        <div className="todos">
            {note.info.todos.map((todo, idx) => {
                return (
                    <div className="todo">
                        <input type="checkbox" key={`${note.id}-${idx + 1}`} id={`${note.id}-${idx + 1}`} checked={todo.isDone && 'checked'} onChange={() => { toggleIsDone(idx) }} />
                        <label key={idx + 1} htmlFor={`${note.id}-${idx + 1}`} className={todo.isDone ? 'done' : ''}>{todo.txt}</label>
                    </div>
                )
            })}



            {/* <ul>
                {note.info.todos.map((todo, idx) => <li key={`${note.id}-${idx + 1}`} className={`note-todo ${todo.isDone && 'done'}`} onClick={() => {
                    toggleIsDone(idx)
                }}>
                    {todo.txt}
                </li>)}
            </ul> */}
        </div>
    )
}