
const LoginForm = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        value={props.username}
                        onChange={props.handleUsernameChange}
                        name="username"
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={props.password}
                        onChange={props.handlePasswordChange}
                        name="password"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm