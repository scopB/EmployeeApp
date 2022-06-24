import axios from 'axios';
import { linkUrl } from '../urlBackend';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

const AddUser = () => {

    const options = []
    const [permission, setPermission] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (options.length === 0) {
            get_data()
        }
    })

    const get_data = () => {
        axios.get(`${linkUrl.LinkToBackend}/show_permission`).then((res) => {
            res.data.map((e) => {
                const temp = { value: e.permission, label: e.permission }
                options.push(temp)
            })
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (username === "" || password === "" || permission === "") {
            alert("Input Not full")
        }
        else {
            const newUser = { username: username, password: password, permission: permission.value }
            axios.post(`${linkUrl.LinkToBackend}/register`, newUser).then((res) => {
                if (res.data === true) {
                    alert("Add User 100%")
                }
                else {
                    alert("Error")
                }
                window.location.reload(false);
            })
        }
    }

    return (
        <div className='container2'>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Username</label>
                    <input type="text" placeholder='Add User'
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder='Add Password'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Set Henchman</label>
                    <Select
                        defaultValue={permission}
                        onChange={setPermission}
                        options={options}
                    />
                </div>
                <input type="submit" value='Add User' className='btn btn-block' />
            </form>
        </div>
    )
}

export default AddUser