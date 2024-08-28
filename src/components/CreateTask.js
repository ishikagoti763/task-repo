import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component to create a new task

function CreateTask() {
  const [questionText, setQuestionText] = useState('');
  const navigate = useNavigate();

  // Handle task submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/create',
        { questionText },
        {
          headers: {
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response);
      
      if (response.status === 201) {
        // const userId = response.data.user.userId;
        navigate(`/startTask`);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (

    <div className="auth-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Question: </label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateTask;


