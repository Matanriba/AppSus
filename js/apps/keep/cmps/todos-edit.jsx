import { utilService } from '../../../services/util.service.js'

export function TodosEdit({ todos, handleChange, onAddTodo, onRemoveTodo }) {
    return (
        <div className="edit-todos">
            <button className="btn add-btn" onClick={(ev) => {
                ev.preventDefault()
                onAddTodo()
            }}></button>
            {todos.map((todo, idx) => (
                <div className="edit-todo" key={utilService.makeId()}>
                    <input data-idx={idx} type="text" name="txt" value={todo.txt} onChange={handleChange} />
                    <button className="btn remove-btn" onClick={(ev) => {
                        ev.preventDefault()
                        onRemoveTodo(idx)
                    }}></button>
                </div>
            ))}
        </div>
    )
}