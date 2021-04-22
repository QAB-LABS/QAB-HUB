import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'


const GameDetails = props => {
  const { name, likes, categories, ratings, image, year_published, description, displayDescription, _id } = props.game
  return (
    <div className={props.card ? "card flex shop" : "card row"}>
      <div className="imageWrapper">
        <div className="image" style={{backgroundImage: `url(${image})`}} >
          <div className="extraContent">
          <div>{`${ratings.length ? ((ratings.reduce((t, r) => t + r.value, 0) / ratings.length) / 20).toFixed(1) : 0}`} <FontAwesomeIcon icon={faHeart} color="purple" /></div>
          <div>{`${likes.length}`} <FontAwesomeIcon icon={faStar} color="purple" /></div>
        </div>
        </div>
      </div>
      <div className="content">
        <NavLink to={`/games/${_id}`}><h3>{name}</h3></NavLink>
        <div className="meta">
          <NavLink to={`/categories/${!!categories[0] ? categories[0]._id : ''}`}>{(!!categories[0] ? categories[0].name : 'No Category').toUpperCase()}</NavLink>
          <br />
          <span className="date">{year_published}</span>
        </div>
        {(displayDescription) ? <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }} className="description">
          <span style={{ whiteSpace: "nowrap" }}>{description}</span>
        </div> : null}
      </div>
    </div>
  )
}

export default GameDetails;
