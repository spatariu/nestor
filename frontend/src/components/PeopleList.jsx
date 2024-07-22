import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('/api/people')
      .then(response => setPeople(response.data))
      .catch(error => console.error('Error fetching people:', error));
  }, []);

  return (
    <div>
      <h2>People List</h2>
      <Link to="/people/new" className="btn btn-primary mb-3">Add New Person</Link>
      <ul className="list-group">
        {people.map(person => (
          <li key={person.id} className="list-group-item">
            {person.firstName} {person.lastName} - {person.jobTitle}
            <Link to={`/people/${person.id}/edit`} className="btn btn-sm btn-secondary ml-2">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
