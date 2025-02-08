import React, { useState } from 'react';
import Modal from 'react-modal';
import './CreatePollModal.css'; // Import your CSS file for modal styles
import { URL } from '../utils/urls';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CreatePollModal = ({ isOpen, closeModal }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [targetRole, setTargetRole] = useState('Teacher'); // Default role

    const navigate = useNavigate();


    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(URL.POLL_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
                ,
                body: JSON.stringify({
                    title: question,
                    options: options,

                    targetRole: targetRole
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create poll');
            }

            closeModal();
            navigate(0);
            // Optionally, you can handle success feedback or navigate to another page
            // Example: redirect to dashboard

        } catch (error) {
            console.error('Error creating poll:', error);

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="modal-header">
                <h2>Create New Poll</h2>
                <button className="close-btn" onClick={closeModal}>
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <label>Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    ))}
                    <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                    >
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>

                    </select>
                    <button type="button" onClick={handleAddOption}>
                        Add Option
                    </button>
                    <button type="submit">Create Poll</button>
                </form>
            </div>
        </Modal>
    );
};

export default CreatePollModal;
