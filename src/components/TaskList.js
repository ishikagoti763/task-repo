// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function TaskSidebar() {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/tasks/all', {
//           headers: {
//             'token': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await response.json();
//         setTasks(data.tasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleTaskClick = (taskId) => {
//     navigate(`/tasks/${taskId}`);
//   };

//   return (
//     <div className="task-sidebar">
//       <h3>Your Tasks</h3>
//       <ul>
//         {tasks.map(task => (
//           <li key={task._id} onClick={() => handleTaskClick(task._id)}>
//             <span>{task.questionText}</span>
//             <span>{task.status}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TaskSidebar;



