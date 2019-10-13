import React from 'react';
import PostDetails from '../PostDetails/PostDetails'
import { getPost } from '../../actions/posts'
import { connect } from 'react-redux'

class Post extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post } = this.props
    return (
      <div className="ui segment">
        {post ? <PostDetails post={post} /> :
          <div className="ui active dimmer">
            <div className="ui loader"></div>
          </div>}
      </div>
    )
  }
}

function mapState(state) {
  return {
    post: state.posts.selected,
  }
}

const actionCreators = {
  getPost
};

export default connect(mapState, actionCreators)(Post)
