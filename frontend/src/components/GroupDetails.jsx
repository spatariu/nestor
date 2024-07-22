import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    axios.get(`/api/groups/${id}`)
      .then(response => setGroup(response.data))
      .catch(error => console.error('Error fetching group details:', error));
  }, [id]);

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>Group Details</h2>
      <h3>{group.name}</h3>
      <h4>People</h4>
      <ul className="list-group mb-3">
        {group.people.map(person => (
          <li key={person.id} className="list-group-item">
            {person.firstName} {person.lastName} - {person.jobTitle}
          </li>
        ))}
      </ul>
      <h4>Subgroups</h4>
      <ul className="list-group">
        {group.subgroups.map(subgroup => (
          <li key={subgroup.id} className="list-group-item">
            {subgroup.name}
            <Link to={`/groups/${subgroup.id}`} className="btn btn-sm btn-info ml-2">View</Link>
          </li>
        ))}
      </ul>
      <Link to={`/groups/${id}/edit`} className="btn btn-secondary mt-3">Edit Group</Link>
    </div>
  );
};

export default GroupDetails;
