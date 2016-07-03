import React from 'react'
import AccountLoggedIn from './account_logged_in'
import { AppLoading } from '/client/configs/components'
import {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap'

class AccountLogin extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      email: '',
      password: '',
      resetEmail: '',
      showModal: false,
    }
  }
  modalClose() {
    this.setState({ showModal: false })
  }
  modalOpen() {
    this.setState({ showModal: true })
  }
  handleEmailChange( event ) {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange( event ) {
    this.setState({ password: event.target.value })
  }
  handleResetEmailChange( event ) {
    this.setState({ resetEmail: event.target.value })
  }
  displayUser() {
    return(
      <AccountLoggedIn />
    )
  }
  displayLoading() {
    return(
      <AppLoading />
    )
  }
  displayGuest() {
    const { errorLogin } = this.props
    return (
      <form onSubmit={ this._login.bind( this ) }>
        { errorLogin ? <p style={ { color: 'red' } }>{ errorLogin }</p> : null }
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={ this.state.email }
            onChange={ this.handleEmailChange.bind( this ) }
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={ this.state.pasword }
            onChange={ this.handlePasswordChange.bind( this ) }
          />
        </FormGroup>
        <Button bsStyle="primary" type="submit" >Log In</Button>
      </form>
    )
  }
  render() {
    const { loggedIn, loggingIn } = this.props
    // testing for modal
    const { errorReset } = this.props
    // tetsing for modal
    const footerText = () => (
      <p>Forgot your pasword? <a onClick={ this.modalOpen.bind( this ) } href="#">Reset it here.</a></p>
    )
    if ( loggingIn ) { return this.displayLoading() }
    return (
      <div>
        <Panel
          header="Log In to Your Account"
          footer={ footerText() }>
          { loggedIn ? this.displayUser() : this.displayGuest() }
        </Panel>
        <Modal show={ this.state.showModal } onHide={ this.modalClose.bind( this ) }>
          <Modal.Header closeButton>
            <Modal.Title>Send Reset Password Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enter the email address for your account</p>
            <form >
              { errorReset ? <p style={ { color: 'red' } }>{ errorReset }</p> : null }
              <FormGroup>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  value={ this.state.resetEmail }
                  onChange={ this.handleResetEmailChange.bind( this ) }
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.modalClose.bind( this ) }>Close</Button>
            <Button onClick={ this._resetPassword.bind( this ) } bsStyle="primary">Reset Password</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
  _login( event ) {
    event.preventDefault()
    const { login } = this.props
    const { email, password } = this.state
    login( email, password )
  }
  _resetPassword( event ) {
    event.preventDefault()
    const { sendResetPasswordLink } = this.props
    const { resetEmail } = this.state
    sendResetPasswordLink( resetEmail )
  }
}

export default AccountLogin