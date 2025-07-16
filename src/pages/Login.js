import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'
import './Login.css' // ✅ Importing converted CSS

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  const onSubmitFailure = error => {
    setShowSubmitError(true)
    setErrorMsg(error)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://i.postimg.cc/pLwwgFJW/3998.jpg"
          alt="website logo"
          className="website-image"
        />
        <h3 style={{marginBottom: '6px', marginTop: '4px'}}>Restaurant Page</h3>

        <div className="input-container">
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Username"
            data-testid="username"
            value={username}
            onChange={onChangeUsername}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="input-field"
            placeholder="Password"
            data-testid="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>

        <div className="show-password-container">
          <input
            type="checkbox"
            id="showPassword"
            className="checkbox"
            checked={showPassword}
            onChange={toggleShowPassword}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        {showSubmitError && (
          <p className="error-message" data-testid="error-msg">
            *{errorMsg}
          </p>
        )}

        <button
          className="login-button"
          type="submit"
          data-testid="login-button"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
