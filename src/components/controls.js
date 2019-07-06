import React from 'react'


const CenterButton = (props) => {

  const {action, name} = props

  return (
    <div style={{
      margin: 10
    }}>
      <button onClick={action}>{name}</button>
    </div>
  );

}

export default CenterButton;