import React from 'react'
import { addReview } from '../../actions/reviews'
import { connect } from 'react-redux'
import api from '../../apis/backend'

class ReviewForm extends React.Component {
  state = {
    game: '5da8953e82546637cc595b6d',
    // game: this.props.match.params.id,
    author: this.props.user,
    title: '',
    content: '',
    submitted: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const response = await this.props.addReview(this.state)
    console.log(this.state);
    console.log(response);
    this.setState({ submitted: true });
  }
  
  async componentDidMount(){
    const game = await api.getGame(this.state.game)
    this.setState({
      game
    })
  }
  
  render() {
    return (
      <section className="review-form">
        <h2>Leave a Review!</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input id = "title" type="text" name="title" onChange={this.handleChange} /> <br />
          <label htmlFor="content">Review: </label>
          <textarea id = "content" name="content" onChange={this.handleChange} /> <br />
          <></>
          <button type="submit">Submit</button>
        </form>
        {this.state.message && <div className="info info-danger">{this.state.message}</div>}
      </section>
    )
  }
}


function mapState(state) {
  return { 
    user: state.authentication.user
  };
}

const actionCreators = {
  addReview
};

export default connect(mapState, actionCreators)(ReviewForm)
