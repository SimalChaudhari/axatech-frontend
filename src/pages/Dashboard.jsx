import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Helmet><title>Dashboard - Axatech</title></Helmet>
      <section className="section dashboard-section">
        <div className="container">
          <h1>Client Dashboard</h1>
          <p className="muted">Welcome, {user?.name}.</p>
          <div className="dashboard-card">
            <h2>Your account</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            {user?.company && <p><strong>Company:</strong> {user.company}</p>}
            {user?.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            <Button to="/contact" variant="primary" fullWidth={false} className="mt-4">
              Submit an enquiry
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
