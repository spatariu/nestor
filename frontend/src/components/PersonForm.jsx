import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const PersonForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [person, setPerson] = useState({
    firstName: '',
    lastName: '',
    jobTitle: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/people/${id}`)
        .then(response => setPerson(response.data))
        .catch(error => console.error('Error fetching person:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson(prevPerson => ({
      ...prevPerson,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `/api/people/${id}` : '/api/people';
    
    axios[method](url, person)
      .then(() => history.push('/people'))
      .catch(error => console.error('Error saving person:', error));
  };

  return (
    <div>
      <h2>{id ? 'Edit Person' : 'Add New Person'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={person.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={person.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            value={person.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default PersonForm;
