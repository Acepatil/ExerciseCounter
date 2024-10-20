import { useTask } from "./CounterContext";

function CompletedTask() {
    const { completed,dispatch } = useTask();
    const completedPushUp = completed.filter((task) => task.task === "Task 💪").reduce((total, task) => total + task.value, 0);
    const completedWeightLifting = completed.filter((task) => task.task === "Task 🏋️‍♂️").reduce((total, task) => total + task.value, 0);
    const completedRunning = completed.filter((task) => task.task === "Task 🏃‍♂️").reduce((total, task) => total + task.value, 0);
    return (
        <>
            {completedPushUp>0?<p>Completed Pushups {completedPushUp}</p>:""}
            {completedWeightLifting>0?<p>Completed Squats {completedWeightLifting}</p>:""}
            {completedRunning>0?<p>Completed Running {completedRunning}</p>:""}
            {completed.length > 0 ? (
                completed.slice().reverse().map((task) => (
                    <div key={task.task_id}>
                        <h3>{task.task} : {task.value}</h3>
                        <p>{task.date}</p>
                        <button onClick={() => dispatch({ type: "task/uncompleted", payload: task })}>Uncomplete</button>
                    </div>
                ))
            ) : (
                <p>No completed tasks</p> 
            )}
        </>
    );
}

export default CompletedTask;
