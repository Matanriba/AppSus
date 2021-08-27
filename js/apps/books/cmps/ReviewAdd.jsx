import { bookService } from "../services/book.service.js";

export class ReviewAdd extends React.Component {

    state = {
        review: {
            name: 'Book Reader',
            rate: '',
            readAt: '',
            txt: ''
        },
        bookId: null
    }

    inputRef = React.createRef()

    componentDidMount() {
        const bookId = this.props.match.params.bookId
        this.setState({ bookId })
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ review: { ...prevState.review, [field]: value } }))
    }
    
    onSaveReview = (ev) => {
        ev.preventDefault()
        // if (this.state.review.name === '' || this.state.review.rate === '' || this.state.review.readAt === '' || this.state.review.txt === '') return
        bookService.addReview(this.state.bookId, this.state.review)
        this.props.history.push(`/book/${this.state.bookId}`)
    }

    render() {
        const { name, rate, readAt, txt } = this.state.review;

        return (
            <form className="review-add" onSubmit={this.onSaveReview}>
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" value={name} onChange={this.handleChange} placeholder='Full Name' ref={this.inputRef} />
                <label htmlFor="rate">Rating</label>
                <select name="rate" id="rate" onChange={this.handleChange} value={rate}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="readAt">Read At:</label>
                <input type="date" name="readAt" id="readAt" value={readAt} onChange={this.handleChange} />
                <label htmlFor="txt">Review</label>
                <textarea name="txt" id="txt" value={txt} onChange={this.handleChange} placeholder='Review goes here' />
                <button>Add Review</button>
            </form>
        )
    }
}