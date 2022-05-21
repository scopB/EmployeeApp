import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { useState } from 'react'
import Submit from "../components/Submit";
import AddTask from "../components/AddTask";


const Home = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  const deleteTask = (id) => {
    // console.log('Delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = async (task) => {
    console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
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
        : 'No Tasks to show'}
      <Submit tasks={tasks} onReset={reset}/>
      {/* <MyTable Column={['Name', 'ID']} Values={[]} /> */}
    </div>
  );
}


export default Home
