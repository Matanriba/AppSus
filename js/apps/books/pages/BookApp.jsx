import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { AddBook } from "../cmps/AddBook.jsx";
import { eventBusService } from "../services/event-bus-service.js";

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
    searchBy: null
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    bookService.query(this.state.filterBy).then((books) => {
      this.setState({ books });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks)
  };

  onAddBook = (book) => {
    bookService.addBook(book).then(() => {
      eventBusService.emit('user-msg', { txt: `Book Added Successfully!`, type: 'success' });
      this.loadBooks();
    });
  };

  render() {
    const { books } = this.state;
    if (!books) return <p>Loading..</p>
    return (
      <section className="book-app">
        <BookFilter onSetFilter={this.onSetFilter} />
        <AddBook onAddBook={this.onAddBook} />
        <BookList books={books} selectBook={this.selectBook} />
      </section>
    );
  }
}
