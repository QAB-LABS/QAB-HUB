import React from 'react';
import { NavLink } from 'react-dom'


const GameDetails = props => {
  const { name, price, description, likes, reviews, categories, image, year_published } = this.props.game
  console.log(game)

  return (
    <div class="ui card">
      <div class="image">
        <img src={image} />
      </div>
      <div class="content">
        <a class="header">{name}</a>
        <div class="meta">
          <span class="date">{year_published}</span>
        </div>
        <div class="description">
          {}
    </div>
      </div>
      <div class="extra content">
        <a><i class="star outline icon"></i>{`${reviews.length}`} </a>
        <a><i class="heart outline icon"></i>{`${likes.length}`} </a>
      </div>
    </div>


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
    </div>
      )
}

export default GameDetails;
