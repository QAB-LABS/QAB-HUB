import React from 'react'
import CommentList from './CommentList'
import { NavLink } from 'react-router-dom'

const PostDetails = props => {
    const { title, created_at, author, content, comments, _id } = props.post

    return (
        <div className={props.card ? "ui card" : "segment"}>
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
                <NavLink to={`/profile/${author._id}`}>
                    <i className="user icon" />
                    {author.username}
                </NavLink>
            </div>

            {props.card ? null : <CommentList comments={comments} />}
        </div>
    )
}

export default PostDetails