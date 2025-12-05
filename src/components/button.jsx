export default function TaskList(task) {
    return (
        <ul>
            {task.map((task) => (
                <li key={task.id}>{task.name}
                    <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
            {task.text}
          </span></li>
            ))}
        </ul>
    )
}