import React from 'react'
import { NavLink } from 'react-router-dom'

const ReviewDetails = props => {
    console.log(props.review)
    const { title, created_at, author, content, _id } = props.review

    return (
        <div className={props.card ? "ui card" : "segment"}>
            <div className="content">
                <NavLink to={`/reviews/${_id}`}><p className="header">{title}</p></NavLink>
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
        </div>
    )
}

export default ReviewDetails