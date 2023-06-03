import React from 'react'
import { RxCross2 } from 'react-icons/rx';

const ImagePopup = ({ imageLink, setShowImage }) => {
    return (
        <div className='imagePopupContainer' onClick={() => setShowImage(false)}>
            <div className='modalPopup'>
            <div className='cross-icon'><RxCross2/></div>
                <img src={imageLink} alt="" />
            </div>
        </div>
    )
}

export default ImagePopup