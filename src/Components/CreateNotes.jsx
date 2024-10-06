import React, { useState } from 'react'
import '../CSS/CreateNotes.css'
import {createnotes, Hello} from '../Context/CreateNoteContext'


const CreateNotes = () => {
const[notesTitle,setNotesTitle]=useState('');
const[selectedColor,setSelectedColor]=useState('');
const colors=["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

const[task,setTask]=useState([]);


const addNotes=(e)=>{
    setNotesTitle(e.target.value);

}

const handleNotesTitle=()=>{
    const data={
        title:notesTitle,
     color:selectedColor
   }
   if (!notesTitle.trim()) {
    alert("Please enter a group name");
    return;
  }

   
     if(!selectedColor){
        
        alert("please choose a color");
        return;
     }
    
    setTask([...task,notesTitle,selectedColor]);
    // setColorTask([...colorTask,selectedColor]);
    setNotesTitle('');
    setSelectedColor('');
}


  return (
    <>

    <div className='create-notes'>
        <h1>Create New group</h1>
        <div className='grp-name'>
            <h2>Group Name</h2>
           <input type='text' value={notesTitle} onChange={addNotes} placeholder='Enter group name'/>
        </div>

        <div className='select-color'>
            <h2>Choose colour</h2>
           <div className='color'>
            {
               colors.map((item,i)=>(
                <div key={i}  style={{background:item}} className={`colors are ${setSelectedColor===item ? 'choosen' :''}`} 
                   onClick={()=>setSelectedColor(item)}>
                </div>

               ))
      
            }
        
           </div>
           
        </div>

        <div>
            <button className='create-btn' onClick={handleNotesTitle}>Create </button>

        </div>
      
     {notesTitle}
     {selectedColor}
        
    </div>
    
    </>
  )
}

export default CreateNotes


