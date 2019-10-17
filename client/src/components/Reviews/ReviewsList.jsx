import React from 'react'
import ReviewDetails from './ReviewDetails'

class ReviewsList extends React.Component {

  renderReviews(reviews) {
    return reviews.map(review => (
      <ReviewDetails key={review._id} review={review} />
    ))
  }

  render() {
    const { reviews } = this.props
    return (
      <React.Fragment>
        {reviews ? this.renderReviews(reviews) :
          <div key="1" className="ui active dimmer">
            <div className="ui loader"></div>
          </div>}
      </React.Fragment>
    )
  }
}



export default ReviewsList