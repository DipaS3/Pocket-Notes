import { createContext } from "react";




const createnotes= createContext()

const Hello=({children})=>{
    const data={
        title:notesTitle,
     color:selectedColor
   }
    return(
        <createnotes.Provider value={{title,selectedColor}}>
            {children }
            
        </createnotes.Provider>
    )
}




export {createnotes,Hello}