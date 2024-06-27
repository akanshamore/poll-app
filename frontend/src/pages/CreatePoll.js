import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [role, setRole] = useState('student');
    const { user } = useContext(AuthContext);

    const handleCreatePoll = (e) => {
        e.preventDefault();
        console.log('Creating poll:', { question, role, createdBy: user.name });
        // Add logic to save poll to backend
    };

    if (user.role !== 'institute') {
        return <p>You do not have permission to create polls.</p>;
    }

    return (
        <div>
            <h2>Create Poll</h2>
            <form onSubmit={handleCreatePoll}>
                <div>
                    <label>Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Target Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
                <button type="submit">Create Poll</button>
            </form>
        </div>
    );
};

export default CreatePoll;