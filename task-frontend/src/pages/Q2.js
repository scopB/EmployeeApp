import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { useState } from 'react'
import Submit from "../components/Submit";
import AddTask from "../components/AddTask";


const Q2 = ({changeState,addquizs}) => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = async (task) => {
    console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    // console.log(newTask)
    // await addDoc(collection(db, "testfortask"), newTask);
    setTasks([...tasks, newTask])
  }

  const reset = () =>{
    setTasks([])
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        : 'No Quiz show'}
      <Submit tasks={tasks} onReset={reset} changeState={changeState} addquizs={addquizs}/>
      {/* <MyTable Column={['Name', 'ID']} Values={[]} /> */}
    </div>
  );
}


export default Q2
