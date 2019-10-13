import React from 'react'
import CommentList from './CommentList'
import { NavLink } from 'react-router-dom'

const PostDetails = props => {
    const { title, created_at, author, content, comments, _id } = props.post

    return (
        <div className="segment">
            <div className="item">
                <div className="content">
                    <NavLink to={`/post/${_id}`}><p className="header">{title}</p></NavLink>
                    <div className="meta">
                        <span className="date">{created_at}</span>
                    </div>
                    <div className="description">
                        {content}
                    </div>
                </div>
                <div className="extra content">
                    <i className="user icon" />
                    {author.username}
                </div>
            </div>

            <CommentList comments={comments} />
        </div>
    )
}

export default PostDetails