import { utilService } from '../../../services/util.service.js'

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
                    <div className="todo" key={utilService.makeId()} >
                        <input type="checkbox" id={`${note.id}-${idx + 1}`} checked={todo.isDone && 'checked'} onChange={() => { toggleIsDone(idx) }} />
                        <label htmlFor={`${note.id}-${idx + 1}`} className={todo.isDone ? 'done' : ''}>{todo.txt}</label>
                    </div>
                )
            })}
        </div>
    )
}