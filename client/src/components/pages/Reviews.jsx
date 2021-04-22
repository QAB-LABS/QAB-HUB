import React from 'react'
import { getReview, getReviews } from '../../actions/reviews'
import { connect } from 'react-redux'
import ReviewsList from '../Reviews/ReviewsList'
import ReviewDetails from '../Reviews/ReviewDetails'
// import GameDetails from './GameDetails'
import GameDetails from '../Games/GameDetails'

class Reviews extends React.Component {
  componentDidMount() {
    if (this.props.match.params.id){
      this.props.getReview(this.props.match.params.id)
    }
    else {
      this.props.getReviews()
    }
  }

  renderDetailsPage = (review) => {
    return(
      <>
        {review ? 
          <>
            <ReviewDetails review={review} />
            <GameDetails game = {review.game}/>
          </>
          : null
        }
      </>
    )
  }

  render() {
    const { review, reviews, game } = this.props
    return (
      <div className="ui segment">
        {this.props.match.params.id ?
          this.renderDetailsPage(review, game):
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
  getReview,
};

export default connect(mapState, actionCreators)(Reviews)
