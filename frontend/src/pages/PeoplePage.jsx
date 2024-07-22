import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getPeople } from '../services/api';


function PeoplePage() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await getPeople();
        setPeople(response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    }

    fetchPeople();
  }, []);

  return (
    <div>
      <h1>People</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.jobTitle}</td>
              <td>
                <Button variant="warning" onClick={() => editPerson(person.id)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => deletePerson(person.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function editPerson(id) {
  // Implement edit person functionality
}

function deletePerson(id) {
  // Implement delete person functionality
}

export default PeoplePage;
