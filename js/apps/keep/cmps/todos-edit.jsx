export function TodosEdit({ todos, onUpdateTodos, handleChange }) {
    return (
        <div className="edit-todos">
            <button>Add todo</button>
            {todos.map((todo, idx) => (
                <div className="edit-todo">
                    <input data-idx={idx} type="text" name="txt" value={todo.txt} onChange={handleChange}/>
                    <button>X</button>
                </div>
            ))}
        </div>
    )
}






// export class TodosEdit extends React.Component {
//     state = {
//         todos: null
//     }

//     componentDidMount() {
//         this.setState({ todos: this.props.todos }, () => console.log('todoEdit state:', this.state))
//     }

//     render() {
//         if (!todos) return <div>loading todo edit...</div>
//         return (
//             <div>todo edit here</div>
//         )
//     }
// }