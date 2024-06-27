import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';
import { URL } from './utils/urls';
import './Dashboard.css';
import CreatePollModal from './components/CreatePollModal';


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [polls, setPolls] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userRole = user?.role;

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch(URL.POLL_URL, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch polls');
                }
                const data = await response.json();
                setPolls(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);


    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <p>Welcome, {user?.name}!</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <button onClick={logout}>Logout</button>


            <div className="create-poll-button">
                <button className="btn" onClick={openModal}>
                    Create New Poll
                </button>
            </div>
            {loading && <p>Loading...</p>}

            {error && <p className="error-message">{error}</p>}

            {polls && polls.length > 0 && (
                <div>
                    {polls.map(poll => (
                        <div key={poll._id} className="poll-card">
                            <h3>{poll.title}</h3>
                            <ul>
                                {poll.options.map(option => (
                                    <li key={option._id}>
                                        {option.optionText}: {option.votes.length} votes
                                    </li>
                                ))}
                            </ul>
                            <p>Created By: {poll.createdBy}</p>
                            <p>Target Role: {poll.targetRole}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for creating new poll */}
            <CreatePollModal isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
    );
};

export default Dashboard;