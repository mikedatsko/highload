import React from 'react'

import logo from '../assets/images/logo-full.svg'
import NavBar from '../components/NavBar'
import NavBarMenu from '../components/NavBarMenu'
import AddForm from '../components/AddForm'
import Logo from '../components/Logo'

const NavBarContainer = (props) => (
  <NavBar className="navbar">
    <NavBarMenu className="navbar-menu is-active">
      <div className="navbar-start">
        <a className="navbar-item" href="/">
          <Logo src={logo} alt="" />
        </a>
      </div>

      <div className="navbar-end">
        <AddForm>
          <div className="field is-grouped">
            <div className="control">
              <a
                className={'button is-link' + (props.isStarted ? ' is-loading' : '')}
                onClick={() => props.addTest()}
              >
                Top
              </a>
            </div>

            <div className="control">
              <a
                className={'button is-link' + (props.isStarted ? ' is-loading' : '')}
                onClick={() => props.addTest()}
              >
                Add to list
              </a>
            </div>
          </div>
        </AddForm>
      </div>
    </NavBarMenu>
  </NavBar>
)

export default NavBarContainer
