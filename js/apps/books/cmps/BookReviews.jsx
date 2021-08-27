import { ReviewPreview } from "./ReviewPreview.jsx"

export function BookReviews({ book, onRemoveReview }) {
    const {reviews} = book
    if (reviews.length === 0) return (<div className="review-list"> No Reviews Currently!</div>)

    return (
        <div className="review-list">
            {reviews.map(review =>  <ReviewPreview key={review.id} onRemoveReview={onRemoveReview} review={review} /> )}
        </div>
    )
}