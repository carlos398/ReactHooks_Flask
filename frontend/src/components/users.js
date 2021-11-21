import React, {useState, useEffect} from "react";

const API = process.env.REACT_APP_API

export const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [users, setUsers] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing){
            const res = await fetch(`${API}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data)
        } else {
            await fetch(`${API}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            setEditing(false)
            setId('')
        }

        await getUsers();
        setName('')
        setEmail('')
        setPassword('')
    }


    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        console.log(data)
        setUsers(data)
    }


    useEffect(() => {
        getUsers();
    }, [])


    const deleteUser = async (id) =>{
        const userResponse = window.confirm('ARE YOU SURE ABOUT DELETE THIS USER?')
        if(userResponse){
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            });
            await res.json();
            await getUsers();
        }
    }


    const editUser = async (id) =>{
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();

        setEditing(true);
        setId(id);

        setName(data.name)
        setEmail(data.email)
        setPassword(data.password)
        
    }


    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group mt-2">
                        <input type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        className="form-control"
                        placeholder="Name"
                        autoFocus
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className="form-control"
                        placeholder="email"
                        autoFocus
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className="form-control"
                        placeholder="password"
                        autoFocus
                        />
                    </div>
                    <button className="btn btn-primary form-group mt-2">
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> 
                                name
                            </th>
                            <th>
                                email
                            </th>
                            <th>
                                password
                            </th>
                            <th>
                                operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td >
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.password}
                                </td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm btn-block m-1" 
                                    onClick={() => editUser(user._id)}
                                    >
                                        EDIT
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm btn-block m-1"
                                    onClick={() => deleteUser(user._id)}
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}