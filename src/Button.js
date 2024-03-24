import React from 'react'

const Button = ({ onGetCurrentLocation }) => {
    const handleClick = () => {
        onGetCurrentLocation();
    };

  return (
    <div id='button'>
        <button onClick={handleClick}>현재위치로 돌아가기</button>
    </div>
  )
}

export default Button