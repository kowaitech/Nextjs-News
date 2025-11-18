'use client';

import { useState, useEffect } from 'react';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/feedback');
      // Using fetch() - primary method
      const data = await response.json();
      
      // Axios alternative (commented for reference):
      // const response = await axios.get('/api/feedback');
      // const data = response.data;
      
      if (response.ok) {
        setFeedbacks(data.feedbacks || []);
      } else {
        console.error('Error fetching feedbacks:', data.error);
        alert('Failed to load feedbacks');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit new feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Using fetch() - primary method
      const data = await response.json();
      
      // Axios alternative (commented for reference):
      // const response = await axios.post('/api/feedback', formData);
      // const data = response.data;
      
      if (response.ok) {
        alert('Feedback submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
        fetchFeedbacks(); // Refresh the list
      } else {
        alert('Failed to submit feedback: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing
  const handleEdit = (feedback) => {
    setEditingId(feedback._id);
    setFormData({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', message: '' });
  };

  // Update feedback
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`/api/feedback/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Using fetch() - primary method
      const data = await response.json();
      
      // Axios alternative (commented for reference):
      // const response = await axios.put(`/api/feedback/${editingId}`, formData);
      // const data = response.data;
      
      if (response.ok) {
        alert('Feedback updated successfully!');
        setEditingId(null);
        setFormData({ name: '', email: '', message: '' });
        fetchFeedbacks(); // Refresh the list
      } else {
        alert('Failed to update feedback: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update feedback');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete feedback
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: 'DELETE',
      });
      // Using fetch() - primary method
      const data = await response.json();
      
      // Axios alternative (commented for reference):
      // const response = await axios.delete(`/api/feedback/${id}`);
      // const data = response.data;
      
      if (response.ok) {
        alert('Feedback deleted successfully!');
        fetchFeedbacks(); // Refresh the list
      } else {
        alert('Failed to delete feedback: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete feedback');
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Feedback System</h1>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                {editingId ? '✏️ Edit Feedback' : '➕ Submit New Feedback'}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={editingId ? handleUpdate : handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your feedback message"
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Processing...'
                      : editingId
                      ? 'Update Feedback'
                      : 'Submit Feedback'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h3 className="card-title mb-0">📋 All Feedbacks</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading feedbacks...</p>
                </div>
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No feedbacks yet. Be the first to submit one!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((feedback, index) => (
                        <tr key={feedback._id}>
                          <td>{index + 1}</td>
                          <td>{feedback.name}</td>
                          <td>{feedback.email}</td>
                          <td>
                            <div
                              style={{
                                maxWidth: '300px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                              title={feedback.message}
                            >
                              {feedback.message}
                            </div>
                          </td>
                          <td>
                            {new Date(feedback.createdAt).toLocaleString()}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEdit(feedback)}
                                title="Edit"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(feedback._id)}
                                title="Delete"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

