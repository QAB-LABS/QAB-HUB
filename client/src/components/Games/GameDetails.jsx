import React from 'react';
import { NavLink } from 'react-router-dom'


const GameDetails = props => {
  const { name, likes, categories, ratings, year_published, description, displayDescription, _id } = props.game

  return (
    <div className={props.card ? "col-2" : "row"}>
      <div className="image">
        <img alt={`Banner for ${name}`} src={'https://place-hold.it/200x150/666/fff/000'} />
      </div>
      <div className="content">
        <NavLink to={`/games/${_id}`}><div className="header">{name}</div></NavLink>
        <div className="meta">
          <NavLink to={`/categories/${!!categories[0] ? categories[0]._id : ''}`}>{(!!categories[0] ? categories[0].name : 'No Category').toUpperCase()}</NavLink>
          <br />
          <span className="date">{year_published}</span>
        </div>
        {(displayDescription) ? <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }} className="description">
          <span style={{ whiteSpace: "nowrap" }}>{description}</span>
        </div> : null}
      </div>
      <div className="extra content">
        <div><i className="star outline icon"></i>{`${ratings.length ? (ratings.reduce((t, r) => t + r, 0) / ratings.length).toFixed(2) : 0}/5`} </div>
        <div><i className="heart outline icon"></i>{`${likes.length}`} </div>
      </div>
    </div>
  )
}

export default GameDetails;
