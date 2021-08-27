export function NoteTodo({ note, onUpdateNote }) {
    const toggleIsDone = (todoIdx) => {
        const noteCopy = { ...note }
        noteCopy.info.todos[todoIdx].isDone = !noteCopy.info.todos[todoIdx].isDone
        onUpdateNote(noteCopy)
    }
    return (
        <div>
            <ul>
                {note.info.todos.map((todo, idx) => <li key={`${note.id}-${idx + 1}`} className={`note-todo ${todo.isDone && 'done'}`} onClick={() => {
                    toggleIsDone(idx)
                }}>
                    {todo.txt}
                </li>)}
            </ul>
        </div>
    )
}