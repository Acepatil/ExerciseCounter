import CompletedTask from "./CompletedTask"
import Counter from "./Counter"
import { TaskProvider } from "./CounterContext"
import SavedTask from "./SavedTask"

function App() {
  return (
    <div>
      <TaskProvider>
      <Counter />
      <SavedTask />
      <CompletedTask />
      </TaskProvider>
    </div>
  )
}

export default App
