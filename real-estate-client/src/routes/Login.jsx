export function Login() {

    return (
        <form>
            <label htmlFor="username">Username:</label><br />
            <input type="text" id="username" name="username" /><br />
            <label htmlFor="password">Password:</label><br />
            <input type="password" id="password" name="password" />
            <input type="submit" value="Submit" />
        </form>
    )
}