import React from 'react'

const PostDetails = props => {
    const { title, created_at, author, content } = props.post
    console.log(props.post)
    return (
        <div className="ui card">
            <div className="content">
                <p className="header">{title}</p>
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

export default PostDetails