import { useState } from 'react';
import { useTask } from './CounterContext'; // Assuming this hook provides access to alltasks and dispatch
import './Counter.module.css';
function Counter() {
    const [count, setCount] = useState(0);
    const { alltasksLength, dispatch } = useTask();
    const [message, setMessage] = useState("You can go on");
    
    // Generate current task object based on the complaints length
    const [currentTask, setCurrentTask] = useState({
        task_id: alltasksLength+1, // Use a unique identifier (e.g., current timestamp)
        task: "",
        date: new Date().toLocaleString(),
        value: 0,
    });

    const handleInc = () => {
        if (count >= 100) {
            return;
        }
        if(count === 0){
            setMessage("You are the best");
        }
        else if(count <20){
            setMessage("You are becomming weak");
        }
        else if(count <40){
            setMessage("You are getting weaker");
        }
        else if(count < 60){
            setMessage("You are getting weaker and weaker");
        }
        else if(count < 80){
            setMessage("You are the worst");
        }
        else{
            setMessage("You are a bitch");
        }

        setCount(count=>count + 10);
        // Dynamically assign an emoji based on the complaint count
        const emoji = alltasksLength % 3 === 0 ? "💪" : alltasksLength % 3 === 1 ? "🏋️‍♂️" : "🏃‍♂️";
        setCurrentTask({
            task_id: alltasksLength+1, // Unique task_id
            task: `Task ${emoji}`,
            date: new Date().toLocaleString(),
            value: count+10,
        });
    }


    const handleSaveTask = () => {
        if (count === 0) {
            return;
        }
        dispatch({ type: "task/add", payload: currentTask });
        setCount(0);
        setMessage("You can try again")
    }

    return (
        <div className='counter'>
            <h1>Counter</h1>
            <p>{count}</p>
            <button onClick={handleInc}>Increment</button>
            <p>{message}</p>
            <button onClick={handleSaveTask}>Save Task</button>
        </div>
    );
}

export default Counter;
