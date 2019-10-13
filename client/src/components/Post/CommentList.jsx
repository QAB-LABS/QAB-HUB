import React from 'react'
import Comment from './Comment'

const renderComments = (comments) => {
    return comments.map(comment => <Comment key={comment._id} comment={comment} />)
}

const CommentList = props => {
    const { comments } = props
    return (
        <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>

            {comments ? renderComments(comments) : null}

            <form className="ui reply form">
                <div className="field" data-children-count="1">
                    <textarea></textarea>
                </div>
                <div className="ui blue labeled submit icon button">
                    <i className="icon edit"></i> Add Reply
                </div>
            </form>
        </div>
    )
}

export default CommentList