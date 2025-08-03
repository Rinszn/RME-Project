import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [branch, setBranch] = useState({
    name: 'SMT',
    address: 'Tanza',
    phone: '09562805713',
    email: 'RME@gmail.com',
    owner: 'Justine',
    tin: '12345',
    dateOpen: '08/15/2024',
  });

  return (
    <div className="admin-container">
      <div className="section-header">
        <h2>Branch Information</h2>
        <button className="edit-btn">Edit</button>
      </div>
      <div className="branch-info-box">
        <div className="branch-row">
          <div className="branch-field">
            <label>Branch Name:</label>
            <input type="text" value={branch.name} readOnly />
          </div>
          <div className="branch-field">
            <label>Branch Address:</label>
            <input type="text" value={branch.address} readOnly />
          </div>
        </div>
        <div className="branch-row">
          <div className="branch-field">
            <label>Branch Telephone #:</label>
            <input type="text" value={branch.phone} readOnly />
          </div>
          <div className="branch-field">
            <label>Branch Email:</label>
            <input type="text" value={branch.email} readOnly />
          </div>
        </div>
        <div className="branch-row">
          <div className="branch-field">
            <label>Branch Owner's Name:</label>
            <input type="text" value={branch.owner} readOnly />
          </div>
          <div className="branch-field">
            <label>TIN #:</label>
            <input type="text" value={branch.tin} readOnly />
          </div>
        </div>
        <div className="branch-row">
          <div className="branch-field full-width">
            <label>Date Open:</label>
            <input type="text" value={branch.dateOpen} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
