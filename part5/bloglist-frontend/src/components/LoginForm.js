import React from "react";

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
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password: 
              <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </>
    )
}

export default LoginForm