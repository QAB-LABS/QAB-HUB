import React from 'react'

const UserCard = ({ user }) => {
  return (
    <div>
      {!user ? null : <div className="header"> <h1>{user.username}</h1> </div>}
    </div>
  )
}

export default UserCard;