
import { useTask } from "./CounterContext";

function SavedTask() {
    const { dispatch, pending } = useTask();
    const pendingPushUp = pending.filter((task) => task.task === "Task 💪").reduce((total, task) => total + task.value, 0);;
    const pendingWeightLifting = pending.filter((task) => task.task === "Task 🏋️‍♂️").reduce((total, task) => total + task.value, 0);;
    const pendingRunning = pending.filter((task) => task.task === "Task 🏃‍♂️").reduce((total, task) => total + task.value, 0);;
    return (
        <>
            {pendingPushUp>0?<p>Pending Pushups {pendingPushUp}</p>:""}
            {pendingWeightLifting>0?<p>Pending Squats {pendingWeightLifting}</p>:""}
            {pendingRunning>0?<p>Pending Running {pendingRunning}</p>:""}
            {pending.length > 0 ? 
                pending.slice().reverse().map((task) => (
                    <div key={task.task_id}>
                        <h3>{task.task} : {task.value}</h3>
                        <p>{task.date}</p>
                        <button onClick={() => dispatch({ type: "task/completed", payload: task })}>Complete</button>
                        <button onClick={() => dispatch({ type: "task/delete", payload: task })}>Delete</button>
                    </div>
                )) : (
                <p>No pending tasks</p>
            )}
        </>
    );
}

export default SavedTask;
