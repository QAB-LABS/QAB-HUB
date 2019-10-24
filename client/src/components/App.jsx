import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import MainNavbar from './MainNavbar/MainNavbar'
import Carousel from './Carousel/Carousel'
import Home from './pages/Home'
import Games from './pages/Games'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './Footer/Footer'
import GameDetails from './pages/GameDetails'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faHeart, faGripHorizontal, faGripLines } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faBars, faHeart, faGripHorizontal, faGripLines)


class App extends React.Component {
  render() {
    return (
      <div className="App">

        <MainNavbar />
        {['/signup', '/login'].includes(this.props.location.pathname) ? <div className="formSpacer"></div> : <Carousel />}
        <div className="container main">
          <div className="row">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/games" exact component={Games} />
              <Route path="/games/:id" component={GameDetails} />
              <Route path="/post/:id" component={Post} />
              <Route path="/reviews" exact component={Reviews} />
              <Route path="/reviews/:id" component={Reviews} />
              <Route path="/me" component={Profile} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
