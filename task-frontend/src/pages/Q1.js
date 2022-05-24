import React, { useState } from 'react'

const Q1 = ({changeState,addquizs}) => {
        const [name, setName] = useState('')
        const [permission, setPermission] = useState('')

        const onSubmit = (e) => {
            e.preventDefault()
            if (!name) {
                alert('Plase add text')
                return
            }
            addquizs({name , permission})
            setName('')
            setPermission('')
            changeState()
        }

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
                            <input type="text" placeholder='Add Permission'
                                value={permission} onChange={(e) => setPermission(e.target.value)} />
                        </div>
                        <input type="submit" value='Next' className='btn btn-block' />
                    </form>
                    {/* <MyTable Column={['Name', 'ID']} Values={[]} /> */}
                </div>
            </div>
        )
    }

export default Q1