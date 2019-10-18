import React from 'react'
import CommentList from './CommentList'
import { NavLink } from 'react-router-dom'

const PostDetails = props => {
    const { title, created_at, author, content, comments, _id } = props.post

    return (
        <div className={props.card ? "column card" : "segment"}>
            <div className="content item">
                <NavLink to={`/post/${_id}`}><h4>{title}</h4></NavLink>
                <div className="meta">
                    <span className="date">{created_at.substring(0,10)} - {created_at.substring(11,16)}</span>
                </div>
                <div className="description">
                    {content}
                </div>
            </div>

            <div className="extra content">
                <NavLink to={`/profile/${author._id}`}>
                    <i className="user icon" />
                    Posted by {author.username}
                </NavLink>
            </div>

            {props.card ? null : <CommentList comments={comments} />}
        </div>
    )
}

export default PostDetails