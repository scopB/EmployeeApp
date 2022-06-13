import Task from "./Task"

const Tasks = ({tasks,onDelete}) => {
  // function checklog(){
  //   tasks.map((e)=>{
  //     console.log(e.id)
  //   })    
  // }
  // console.log(test)
  return (
    <div>
        {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} /> 
        ))}
    </div>
  )
}

export default Tasks