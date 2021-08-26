const { Link } = ReactRouterDOM

import { LongTxt } from '../cmps/LongTxt.jsx';
import { bookService } from '../services/book.service.js';
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { BookReviews } from '../cmps/BookReviews.jsx';
import { eventBusService } from '../services/event-bus-service.js';

export class BookDetails extends React.Component {
  state = {
    book: null,
    isLongTxtShown: false,
  };

  componentDidMount() {
    this.loadBook()
    console.log('Mounted', this.state)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
    console.log('Updated', this.state)
  }

  loadBook = () => {
    const id = this.props.match.params.bookId
    bookService.getBookById(id)
      .then(book => {
        if (!book) this.props.history.push('/books')
        this.setState({ book })
      })
  }

  onBack = () => {
    this.props.history.push('/books')
  }

  onRemoveReview = (reviewId) => {
    bookService.removeReview(this.state.book.id, reviewId)
      .then(this.loadBook);
    eventBusService.emit('user-msg', { txt: 'review deleted!', type: 'danger' })
  }


  setLength = (length) => {
    if (length < 100) return ' - Light Reading';
    else if (length > 200 && length < 500) return ' - Decent Reading';
    else if (length > 500) return ' - Long Reading';
  };

  setNewText = (pubDate) => {
    if (pubDate < 2011) return '(Veteran Book)';
    if (pubDate >= 2020) return 'New!!';
  };

  setIfSale = (isOnSale) => {
    return isOnSale ? '../assets/img/sale.jpg' : '';
  };

  toggleLongTxt = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  }

  render() {
    // const { book, goBack } = this.props;
    const { book, isLongTxtShown } = this.state;
    if (!book) return <div>Loading...</div>
    return (
      <article className='book-details'>
        <h1 className='title'>{book.title}</h1>
        <img className='book-img' src={`${book.thumbnail}`} alt='' />
        <img
          className='sale-img'
          src={this.setIfSale(book.listPrice.isOnSale)}
        ></img>
        <h2>{book.subtitle}</h2>
        <h1 className='authors'>By: {book.authors}</h1>
        <h3>
          {book.publishedDate} {this.setNewText(book.publishedDate)}
        </h3>
        <h3>
          {book.pageCount} Pages {this.setLength(book.pageCount)}
        </h3>
        <h3>Categories - {book.categories.join(' , ')}</h3>
        <h3>Price - {book.listPrice.amount} {bookService.getPriceCurr(book.listPrice.currencyCode)}</h3>
        <button className='back-btn' onClick={this.onBack}>Back</button>
        <LongTxt txt={book.description} isLongTxtShown={isLongTxtShown} toggleLongTxt={this.toggleLongTxt} />

        <div className="adj-book-btns">
          <Link to={`/book/${bookService.getAdjBookId(book.id, -1)}`}>Previous Book</Link>
          <Link to={`/book/${bookService.getAdjBookId(book.id, 1)}`}>Next Book</Link>
        </div>

        <div className="reviews-container">
          <Link className="add-review-link" to={`/book/review/${book.id}`}>Add Review Now!</Link>
          Reviews
          <BookReviews book={book} onRemoveReview={this.onRemoveReview} />
        </div>
      </article>
    );
  }
}
