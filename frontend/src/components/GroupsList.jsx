import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupsList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/api/groups')
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  return (
    <div>
      <h2>Groups List</h2>
      <Link to="/groups/new" className="btn btn-primary mb-3">Add New Group</Link>
      <ul className="list-group">
        {groups.map(group => (
          <li key={group.id} className="list-group-item">
            {group.name}
            <Link to={`/groups/${group.id}`} className="btn btn-sm btn-info ml-2">View</Link>
            <Link to={`/groups/${group.id}/edit`} className="btn btn-sm btn-secondary ml-2">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
