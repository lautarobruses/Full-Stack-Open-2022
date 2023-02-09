import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
    return (
        <div className='container'>
            <h2>Users</h2>
            {/* <table>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        <th>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </th>
                        <th>{user.blogs.length}</th>
                    </tr>
                ))}
            </table> */}
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </th>
                            <th>{user.blogs.length}</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Users