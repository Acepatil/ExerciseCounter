import { useTask } from "./CounterContext";

function CompletedTask() {
    const { completed,dispatch } = useTask();

    return (
        <>
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
