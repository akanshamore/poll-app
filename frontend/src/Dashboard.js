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


    const voteOnPoll = async (pollId, optionIndex) => {
        try {
            const response = await fetch(`${URL.POLL_URL}/vote/${pollId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ optionIndex })
            });
            if (!response.ok) {
                throw new Error('Failed to vote on poll');
            }
            const updatedPoll = await response.json();
            // Update the polls state to reflect the new vote count
            setPolls(prevPolls =>
                prevPolls.map(poll =>
                    poll._id === updatedPoll._id ? updatedPoll : poll
                )
            );
        } catch (err) {
            console.error('Voting error:', err);
            // Handle error state or display a notification
        }
    };


    const hasVoted = (poll, userId) => {

        // Check if userId is in any of the votes arrays of poll options
        return poll.options.some(option => option.votes.includes(userId));
    };


    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <p>Welcome, {user?.name}!</p>
            <p>Email: {user?.email}</p>
            <p>Role: {userRole}</p>
            <button className="logout-btn" onClick={logout}>Logout</button>

            <div className="create-poll-button">
                <button className="btn" onClick={openModal}>
                    Create New Poll
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {polls.length > 0 && (
                <div>
                    {polls.map(poll => (
                        <div key={poll._id} className="poll-card">
                            <h3>{poll.title}</h3>
                            <ul>
                                {poll.options.map((option, index) => (
                                    <li key={option._id}>
                                        {option.optionText}: {option.votes.length} votes

                                        {user.role !== 'Institute' && <>{hasVoted(poll, user.userId) && (
                                            <span className="voted-message"> - You have already voted</span>
                                        )}
                                            {!hasVoted(poll, user.userId) && (
                                                <button className="vote-btn" onClick={() => voteOnPoll(poll._id, index)}>
                                                    Vote
                                                </button>
                                            )}</>}


                                    </li>
                                ))}
                            </ul>
                            <p>Created By: {poll.createdBy}</p>
                            <p>Target Role: {poll.targetRole}</p>
                        </div>
                    ))}
                </div>
            )}

            <CreatePollModal isOpen={modalIsOpen} closeModal={closeModal} />
        </div>
    );
};

export default Dashboard;