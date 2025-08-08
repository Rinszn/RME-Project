import React, { useState } from 'react';
import './Signup.css';

const steps = [
  { title: 'YOUR INFO' },
  { title: 'SELECT PLAN' },
  { title: 'ADD-ONS' },
  { title: 'SUMMARY' },
];

const Signup = ({ onClose }) => { // ✅ Accept onClose prop here
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    addons: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const updatedAddons = checked
          ? [...prev.addons, value]
          : prev.addons.filter((a) => a !== value);
        return { ...prev, addons: updatedAddons };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h2>Personal Info</h2>
            <p className="text-muted">Please provide your name, email address, and phone number.</p>
            <form>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Stephen King"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. stephenking@lorem.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +1 234 567 890"
                value={formData.phone}
                onChange={handleChange}
              />
            </form>
          </>
        );

      case 1:
        return (
          <>
            <h2>Select Plan</h2>
            <p className="text-muted">Choose the plan that best fits you.</p>
            <form>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="Basic"
                  checked={formData.plan === 'Basic'}
                  onChange={handleChange}
                /> Basic Plan
              </label><br />

              <label>
                <input
                  type="radio"
                  name="plan"
                  value="Standard"
                  checked={formData.plan === 'Standard'}
                  onChange={handleChange}
                /> Standard Plan
              </label><br />

              <label>
                <input
                  type="radio"
                  name="plan"
                  value="Premium"
                  checked={formData.plan === 'Premium'}
                  onChange={handleChange}
                /> Premium Plan
              </label>
            </form>
          </>
        );

      case 2:
        return (
          <>
            <h2>Add-Ons</h2>
            <p className="text-muted">Select additional features.</p>
            <form>
              <label>
                <input
                  type="checkbox"
                  name="addons"
                  value="Priority Support"
                  checked={formData.addons.includes('Priority Support')}
                  onChange={handleChange}
                /> Priority Support
              </label><br />

              <label>
                <input
                  type="checkbox"
                  name="addons"
                  value="Extra Storage"
                  checked={formData.addons.includes('Extra Storage')}
                  onChange={handleChange}
                /> Extra Storage
              </label><br />

              <label>
                <input
                  type="checkbox"
                  name="addons"
                  value="Custom Reports"
                  checked={formData.addons.includes('Custom Reports')}
                  onChange={handleChange}
                /> Custom Reports
              </label>
            </form>
          </>
        );

      case 3:
        return (
          <>
            <h2>Summary</h2>
            <p className="text-muted">Review your selections before submitting.</p>
            <ul>
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Phone:</strong> {formData.phone}</li>
              <li><strong>Plan:</strong> {formData.plan || 'None selected'}</li>
              <li><strong>Add-Ons:</strong> {formData.addons.length > 0 ? formData.addons.join(', ') : 'None selected'}</li>
            </ul>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        {/* Sidebar */}
        <div className="signup-sidebar">
          <ul>
            {steps.map((s, index) => (
              <li key={index} className={step === index ? 'active' : ''}>
                <span>{index + 1}</span>
                <div>
                  <p>STEP {index + 1}</p>
                  <strong>{s.title}</strong>
                </div>
              </li>
            ))}
          </ul>
          <div className="sidebar-graphic"></div>
        </div>

        {/* Dynamic Right Panel */}
        <div className="signup-form-area">
          <div className="form-content">
            {renderStepContent()}
          </div>
          <div className="button-row">

             {/* ✅ Close button in footer */}
            {onClose && (
              <button type="button" className="btn-outline-secondary" onClick={onClose}>
                Close
              </button>
            )}
            
            {step > 0 && (
              <button type="button" className="btn-secondary" onClick={prev}>
                Go Back
              </button>
            )}

           

            <button type="button" className="btn-primary" onClick={next}>
              {step === steps.length - 1 ? 'Submit' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
