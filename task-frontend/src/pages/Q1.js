import React, { useState } from 'react'
import Select from 'react-select';

const Q1 = ({ changeState, addquizs }) => {
    const [name, setName] = useState('')
    const [permission, setPermission] = useState([])
    // const [permissions, setPermissions] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            alert('Plase add text')
            return
        }
        // console.log({ name, permission })
        // console.log({permission : permission})
        const Data = []
        permission.forEach((e) => {
            Data.push({permission : e.value})
            // setPermissions([...permissions, e.value]
        })
        // console.log(Data)
        addquizs({ name, permission : Data })
        setName('')
        setPermission([])
        // setPermissions([])
        changeState()
    }

    const options = [
        { value: 'admin', label: 'ADMIN' },
        { value: 'hr', label: 'HR' },
    ];

    return (
        <div>
            <div className="container">
                <form className='add-form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label>QUIZ</label>
                        <input type="text" placeholder='Add QUIZ Name'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-control'>
                        <label>Permission</label>
                        {/* <input type="text" placeholder='Add Permission'
                                value={permission} onChange={(e) => setPermission(e.target.value)} /> */}
                        <Select
                            isMulti
                            defaultValue={permission}
                            onChange={setPermission}
                            options={options}
                        />
                    </div>
                    <input type="submit" value='Next' className='btn btn-block' />
                </form>
                {/* <MyTable Column={['Name', 'ID']} Values={[]} /> */}
            </div>
        </div>
    )
}

export default Q1