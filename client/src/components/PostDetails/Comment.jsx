import React from 'react'
import { NavLink } from 'react-router-dom'

const CommentList = props => {
    const { author, content, created_at } = props.comment
    console.log(author)
    return (
        <div className="comment">
            {/* <div className="avatar">
                <img src="/images/avatar/small/matt.jpg">
            </div> */}
            <div className="content">

                <NavLink to={`/profile/${author._id}`}>
                    {author.username}
                </NavLink>

                <div className="metadata">
                    <span className="date">{created_at}</span>
                </div>

                <div className="text">
                    {content}
                </div>
            </div>
        </div >
    )
}

export default CommentList
