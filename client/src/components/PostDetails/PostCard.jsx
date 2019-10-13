import React from 'react'
import { NavLink } from 'react-router-dom'

const PostCard = props => {
    const { title, created_at, author, content, _id} = props.post
    
    return (
        <div className="ui card">
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
    )
}

export default PostCard