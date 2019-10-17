import React from 'react'
import { NavLink } from 'react-router-dom'

const ReviewDetails = props => {
    let title, created_at, author, content, _id
    if(props.review && props.review.author){
        ({ title, created_at, author, content, _id } = props.review)
    }

    function renderContent(){
        return(
            <section className={props.card ? "ui card" : "segment"}>
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
            </section>
        )
    }

    return (
        <>
            {/* Somehow the author variable doesn't populate at the same
            time the rest of the variables do.  So we have to make sure it's populated before populating the rest of the info on the card.*/}
            {author ? renderContent() : null}
        </>
    )
}

export default ReviewDetails