import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../compoments/Payment/Sidebar';
import '../../style/payment/Profile.css'; 
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    id: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8070/PMprofiles/all');
        if (response.data && response.data.length > 0) {
          const profileData = response.data[0];
          setFormData({ 
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            password: profileData.password || '',
            id: profileData._id || ''
          });
          setError(null);
        } else {
          setError('No profile found. Please create a profile first.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) {
      errors.name = 'Name is required.';
    }

    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (formData.id) {
        // Update existing profile
        await axios.put(`http://localhost:8070/PMprofiles/update/${formData.id}`, formData);
        alert('Profile updated successfully!');
      } else {
        // Create new profile
        const response = await axios.post('http://localhost:8070/PMprofiles/add', formData);
        alert('Profile created successfully!');
        setFormData({ ...formData, id: response.data._id });
      }
      setIsModalOpen(false);
      setError(null);
      // Refresh the page to show the profile
      window.location.reload();
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`http://localhost:8070/PMprofiles/delete/${formData.id}`);
      alert('Profile deleted successfully!');
      setFormData({ name: '', email: '', phone: '', password: '', id: '' });
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile.');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.profileContent}>
          <div style={styles.loadingContainer}>
            <div style={styles.loader}></div>
            <p style={styles.loadingText}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.profileContent}>
        <div style={styles.contentWrapper}>
          {/* Header */}
          <div style={styles.header}>
            <button style={styles.backBtn} onClick={() => navigate('/PaymentDashBoardPage')}>
              ← BACK
            </button>
            <h1 style={styles.profileTitle}>Payment Manager Profile</h1>
          </div>

          {error && (
            <div style={styles.errorCard}>
              <div style={styles.errorIcon}>⚠️</div>
              <p style={styles.errorText}>{error}</p>
              <button 
                style={styles.createProfileButton} 
                onClick={() => setIsModalOpen(true)}
              >
                ➕ Create Profile
              </button>
            </div>
          )}

          {!error && formData.id && (
            <>
              {/* Profile Card */}
              <div style={styles.profileCard}>
                <div style={styles.profileImageContainer}>
                  <div style={styles.imagePlaceholder}>
                    <span style={styles.avatarInitial}>
                      {formData.name ? formData.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                  </div>
                </div>

                <div style={styles.profileDetails}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>👤 Name:</span>
                    <span style={styles.detailValue}>{formData.name || 'N/A'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>✉️ Email:</span>
                    <span style={styles.detailValue}>{formData.email || 'N/A'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>📞 Phone:</span>
                    <span style={styles.detailValue}>{formData.phone || 'N/A'}</span>
                  </div>
                </div>

                <div style={styles.buttonContainer}>
                  <button style={styles.editButton} onClick={() => setIsModalOpen(true)}>
                    ✏️ Edit Profile
                  </button>
                  <button style={styles.deleteButton} onClick={handleDelete}>
                    🗑️ Delete Profile
                  </button>
                </div>
              </div>
            </>
          )}

          {isModalOpen && (
            <div style={styles.modalOverlay}>
              <div style={styles.modalContent}>
                <h2 style={styles.modalTitle}>
                  {formData.id ? 'Edit Profile' : 'Create Profile'}
                </h2>
                <form onSubmit={handleUpdate} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                  {validationErrors.name && <div style={styles.errorMessage}>{validationErrors.name}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                  {validationErrors.email && <div style={styles.errorMessage}>{validationErrors.email}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                  {validationErrors.phone && <div style={styles.errorMessage}>{validationErrors.phone}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                  {validationErrors.password && <div style={styles.errorMessage}>{validationErrors.password}</div>}
                </div>

                <div style={styles.modalButtonContainer}>
                  <button type="submit" style={styles.saveButton}>
                    {formData.id ? 'Save Changes' : 'Create Profile'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelButton}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

// Styles for the Profile component
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8f9fa',
  },
  profileContent: {
    flex: 1,
    padding: '40px 20px',
    marginLeft: '250px',
  },
  contentWrapper: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  backBtn: {
    padding: '10px 20px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  profileTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2C3E50',
    margin: 0,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  loader: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #4A90E2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    color: '#7F8C8D',
    fontSize: '16px',
  },
  errorCard: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    border: '2px solid #E74C3C',
    textAlign: 'center',
    marginBottom: '20px',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: '16px',
    margin: '0 0 20px 0',
  },
  createProfileButton: {
    padding: '14px 28px',
    background: '#27AE60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  profileCard: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #E8E8E8',
  },
  profileImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  imagePlaceholder: {
    width: '150px',
    height: '150px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  avatarInitial: {
    fontSize: '64px',
    fontWeight: '700',
    color: '#fff',
  },
  profileDetails: {
    marginBottom: '30px',
  },
  detailRow: {
    display: 'flex',
    padding: '16px 0',
    borderBottom: '1px solid #E8E8E8',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#7F8C8D',
    width: '150px',
  },
  detailValue: {
    fontSize: '16px',
    color: '#2C3E50',
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  editButton: {
    padding: '14px 28px',
    background: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  deleteButton: {
    padding: '14px 28px',
    background: '#E74C3C',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    marginBottom: '25px',
    fontSize: '28px',
    color: '#2C3E50',
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2C3E50',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  errorMessage: {
    color: '#E74C3C',
    fontSize: '13px',
    marginTop: '5px',
  },
  modalButtonContainer: {
    display: 'flex',
    gap: '12px',
    marginTop: '25px',
  },
  saveButton: {
    flex: 1,
    padding: '14px',
    background: '#27AE60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  cancelButton: {
    flex: 1,
    padding: '14px',
    background: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default Profile;