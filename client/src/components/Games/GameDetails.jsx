import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'


const GameDetails = props => {
  const { name, likes, categories, ratings, year_published, description, displayDescription } = props.game

  return (
    <div className={props.card ? "col-5" : "row"}>
      <div className="image">
        <img alt={`Banner for ${name}`} src={'https://place-hold.it/200x150/666/fff/000'} />
      </div>
      <div className="content">
        <div className="header">{name}</div>
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
        <div><FontAwesomeIcon icon={faHeart} color="purple" />{`${ratings.length ? ((ratings.reduce((t, r) => t + r.value, 0) / ratings.length) / 20).toFixed(1) : 0}`} </div>
        <div><FontAwesomeIcon icon={faStar} color="purple" />{`${likes.length}`} </div>
      </div>
    </div>
  )
}

export default GameDetails;
