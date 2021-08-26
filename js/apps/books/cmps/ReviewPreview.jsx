export function ReviewPreview({ review, onRemoveReview }) {

    return (
        <div className="review-preview">
                <img onClick={() => {
                    onRemoveReview(review.id);
                }}
                    className="close-btn"
                    src="./assets/img/close.png"
                />
                <h4>Name - {review.name}</h4>
                <h4>Rating - {review.rate}</h4>
                <h4>Read At - {review.readAt}</h4>
                <h4>{review.txt}</h4>
            </div>
            )
}