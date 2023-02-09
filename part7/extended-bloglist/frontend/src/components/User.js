const User = ({ user }) => {
    if (!user) {
        return null
    }

    return (
        <>
            <h2>{user.username}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default User