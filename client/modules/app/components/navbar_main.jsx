import React from 'react';
import NavbarUser from './navbar_user';

class NavbarMain extends React.Component {
  render() {

    const { activeLink, loggedIn, loggingIn, logout, email } = this.props

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={ FlowRouter.path( '/' ) }>My Mantra</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-left">
              <li className={ ( activeLink === "post" ) ? "active" : "" }>
                <a href={ FlowRouter.path( 'posts.list' ) }>Posts</a>
              </li>
            </ul>

            <NavbarUser
              email={ email }
              loggingIn={ loggingIn }
              loggedIn={ loggedIn }
              logout={ logout }
            />

          </div>

        </div>
      </nav>
    )

  }
}

export default NavbarMain
