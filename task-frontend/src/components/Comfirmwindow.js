import React, { useState } from 'react';
import './Comsty.css'


const Comfirmwindow = ({ message, setShowBox, check_data }) => {
    const [showModal, setShowModal] = useState(true);

    const handleConfirm = () => {
        setShowModal(false);
        check_data()
        setShowBox(false)
    };

    const handleCancel = () => {
        setShowModal(false);
        setShowBox(false)
    };

    return (
        <div>
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className='window-con'>
                    <p>{message}</p>
                    <div>
                        <button onClick={handleConfirm}>Yes</button>
                        <button onClick={handleCancel}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comfirmwindow