import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

export function BookPreview({ book }) {

    return (
        <Link to={`/book/${book.id}`}>
            <article className="book-preview">
                <img src={`${book.thumbnail}`} alt="" />
                <h4>{book.title}</h4>
                <h4>Price - {book.listPrice.amount} {bookService.getPriceCurr(book.listPrice.currencyCode)}</h4>
            </article>
        </Link>
    );
}
