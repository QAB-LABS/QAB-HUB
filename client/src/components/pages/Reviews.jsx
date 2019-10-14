import React from 'react'
import { getReview, getReviews } from '../../actions/reviews'
import { connect } from 'react-redux'
import ReviewsList from '../Reviews/ReviewsList'
import ReviewDetails from '../Reviews/ReviewDetails'

class Reviews extends React.Component {
  componentDidMount() {
    if (this.props.match.params.id) this.props.getReview(this.props.match.params.id)
    else {
      console.log('getting all reviews')
      this.props.getReviews()
    }
  }

  render() {
    const { review, reviews } = this.props
    return (
      <div className="ui segment">
        {this.props.match.params.id ?
          <ReviewDetails review={review} /> :
          <ReviewsList reviews={reviews} />
        }
      </div>
    )
  }
}

function mapState(state) {
  return {
    reviews: state.reviews.all,
    review: state.reviews.selected,
  }
}

const actionCreators = {
  getReviews,
  getReview
};

export default connect(mapState, actionCreators)(Reviews)
