import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [donut, setDonut] = useState({ totalUsers: 0, totalOrders: 0, totalFoods: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get("http://localhost:4000/api/admin/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setStats(response.data.data);
                }
            } catch (error) {
                console.log("Failed to load stats", error);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        if (stats) {
            setDonut({
                totalUsers: stats.totalUsers,
                totalOrders: stats.totalOrders,
                totalFoods: stats.totalFoods
            })
        }
    }, [stats]);

    const data = {
        labels: ['Users', 'Orders', 'Foods'],
        datasets: [{
            data: [donut.totalUsers, donut.totalOrders, donut.totalFoods],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        }]
    }

    const options = {
        response: false,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
    };

    if (!stats) return <div className='loading-stats'>loading stats...</div>;

  return (
    <div className='dashboard'>
        <h1 className='dashboard-title'>Admin Dashboard</h1>
        <div className='dashboard-container'>
            <div className='stats-grid'>
                <div className='stat-card'>
                    <h2>Total Users</h2>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Orders</h2>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h2>Today's Orders</h2>
                    <p>{stats.todayOrders}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Foods</h2>
                    <p>{stats.totalFoods}</p>
                </div>
            </div>
        </div>

        <div className='donut-container'>
            <Doughnut data={data} options={options} className='donut-chart' />
        </div>
    </div>
  )
}

export default Dashboard