import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TypeRacer() {
  const [answerText, setAnswerText] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState('Not Completed');
  const [isRunning, setIsRunning] = useState(false);
  // const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectQuestionText, setSelectQuestionText] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  console.log('User ID:', userId); 

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/api/task/${userId}`, {

          headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response);


        setTasks(response.data.data);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [userId]);


  // the task list in the sidebar
  function TaskSidebar({ tasks, onSelectTask }) {
    return (
      <div className="sidebar">
        <h3>Your Tasks</h3>
        <ul>
          {tasks.map(task => (
            <li key={task._id} onClick={() => onSelectTask(task)}>
              <span>{task.questionText}</span> - <span>{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      handleFail();
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const handleStart = () => {
    setIsRunning(true);
    setStatus('In Progress');
    setAnswerText('');
    setMistakes(0);
    setSeconds(30);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAnswerText(value);

    let mistakesCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== selectQuestionText[i]) {
        mistakesCount++;
      }
    }
    setMistakes(mistakesCount);

    if (value === selectQuestionText && mistakesCount === 0) {
      handlePass();
    }
  };

  const handlePass = () => {
    setIsRunning(false);
    setStatus('Congratulations! You passed the task.');

  };

  const handleFail = () => {
    setIsRunning(false);
    setStatus('You failed the task. Try again!');

  };

  
  const handleSelectTask = (task) => {
    setSelectQuestionText(task.questionText);  // Set the selected question text
    setAnswerText(''); // Reset the answer field
    setMistakes(0); // Reset the mistakes counter
    setIsRunning(false); // Stop any running timer
    setStatus('Not Completed'); // Reset status
    setSeconds(30); // Reset the timer
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8000/api/update/${userId}`,
        {
          answerText,
          mistakes,
          status
        },
        {
          headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Task updated:', response.data);

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <>
      <div className="task-container">
        <TaskSidebar tasks={tasks} onSelectTask={handleSelectTask} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Type Racer</h1>
        <h2>{status}</h2>
        <p><strong>Time Left:</strong> {seconds} seconds</p>
        <p><strong>Mistakes:</strong> {mistakes}</p>
        <p><strong>Question : </strong> {selectQuestionText}
        </p>
        <input
          type="text"
          value={answerText}
          onChange={handleChange}
          disabled={!isRunning}
          style={{ width: '80%', padding: '10px', fontSize: '16px' }}
        />
        <br />
        <br />
        <button onClick={handleStart} disabled={isRunning} style={{ marginRight: '10px' }}>
          Start
        </button>
        <button onClick={handleSubmit()} disabled={isRunning || !userId}>
          Submit
        </button>
      </div>
    </>
  );
}

export default TypeRacer;



