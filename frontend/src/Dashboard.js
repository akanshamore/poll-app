import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';
import CreatePoll from './pages/CreatePoll';


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const userRole = user?.role;

    console.log('user', user)

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user?.name}!</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            {userRole === 'institute' && <CreatePoll />}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;