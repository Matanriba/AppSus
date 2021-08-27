import { bookService } from "../services/book.service.js";
import { AddBookList } from "./AddBookList.jsx";

export class AddBook extends React.Component {
    state = {
        isActive: false,
        searchTxt: '',
        results: null
    }

    onToggleActive = () => {
        this.setState((prevState) => ({ isActive: !prevState.isActive, search: '', results: null }));
    };

    handleChange = (ev) => {
        const { value: searchTxt } = ev.target;
        this.setState({ searchTxt });
        bookService.getBooksFromGoogle(searchTxt).then((results) => this.setState({ results }));
    };

    onAddBook = (book) => {
        this.setState((prevState) => ({
            results: prevState.results.filter((result) => result.id !== book.id),
        }));
        this.props.onAddBook(book);
    };


    render() {
        const { isActive, searchTxt, results } = this.state;

        return (
            < section className="add-book">
                {isActive && (
                    <div>
                        <input
                            type="text"
                            name="searchTxt"
                            id="searchTxt"
                            value={searchTxt}
                            onChange={this.handleChange}
                            placeholder="Enter Book Title"
                        />
                        <AddBookList onAddBook={this.onAddBook} results={results} />
                    </div>
                )}
                <button className="add-btn" onClick={this.onToggleActive}>
                    {isActive ? 'Cancel' : 'Add Book'}
                </button>
            </section >
        )
    }
}