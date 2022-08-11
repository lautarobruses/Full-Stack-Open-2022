import PropTypes from 'prop-types'

const LoginForm = ({
    username,
    password,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
}) => {
    return (
        <>
            <h1>log in to application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                  username:
                    <input
                        id='username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                  password:
                    <input
                        id='password'
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button id="login-button" type="submit">
                        login
                    </button>
                </div>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm