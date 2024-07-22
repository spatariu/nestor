import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const GroupForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [group, setGroup] = useState({
    name: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/groups/${id}`)
        .then(response => setGroup(response.data))
        .catch(error => console.error('Error fetching group:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup(prevGroup => ({
      ...prevGroup,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `/api/groups/${id}` : '/api/groups';
    
    axios[method](url, group)
      .then(() => history.push('/groups'))
      .catch(error => console.error('Error saving group:', error));
  };

  return (
    <div>
      <h2>{id ? 'Edit Group' : 'Add New Group'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={group.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default GroupForm;
