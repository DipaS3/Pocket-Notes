import React, { useContext } from 'react'
import plus from '../assets/Add.png'
import '../CSS/Sidebar.css'

const Sidebar = () => {


  return (
    <div className='sidebar'>
        <div className='side-heading'>
            <p>Pocket Notes</p>
        </div>
        <div className='addtitle'>
        
           
        </div>
        <button className='plus-btn'><img src={plus} /></button>
      
    </div>
  )
}

export default Sidebar
 