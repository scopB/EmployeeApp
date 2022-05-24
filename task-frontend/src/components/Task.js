import { FaTimes } from 'react-icons/fa'

const Task = ({key,task,onDelete}) => {
  return (
    <div className={`task ${''}`}>
        <h3>
            {task.text} 
            <FaTimes 
            style={{color : 'red', cursor : 'pointer'}} 
            onClick={()=> onDelete(key)}/>
        </h3>
    </div>
  )
}

export default Task