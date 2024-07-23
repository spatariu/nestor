import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { getPeople } from '../services/api';

function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [editPersonData, setEditPersonData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    groupId: ''
  });
  const [createPersonData, setCreatePersonData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    groupId: ''
  });
  const [movePersonData, setMovePersonData] = useState({
    id: '',
    currentGroupId: '',
    newGroupId: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await getPeople();
        setPeople(response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    }

    async function fetchGroups() {
      try {
        const response = await axios.get('http://localhost:3000/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }

    fetchPeople();
    fetchGroups();
  }, []);

  const handleEdit = (person) => {
    setEditPersonData(person);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/people/${id}`);
      setPeople(people.filter(person => person.id !== id));
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedPerson = { ...editPersonData, groupId: parseInt(editPersonData.groupId, 10) };
      await axios.put(`http://localhost:3000/people/${editPersonData.id}`, updatedPerson);
      setShowEditModal(false);
      setPeople(people.map(person => (person.id === editPersonData.id ? updatedPerson : person)));
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.firstName) newErrors.firstName = 'First name is required';
    if (!data.lastName) newErrors.lastName = 'Last name is required';
    if (!data.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.groupId) newErrors.groupId = 'Group is required';
    return newErrors;
  };

  const handleCreate = async () => {
    const newErrors = validate(createPersonData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const newPerson = { ...createPersonData, groupId: parseInt(createPersonData.groupId, 10) };
      const response = await axios.post('http://localhost:3000/people', newPerson);
      setShowCreateModal(false);
      setPeople([...people, response.data]);
      setCreatePersonData({
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        groupId: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  const handleChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: name === 'groupId' ? Number(value) : value
    }));
  };

  const handleMove = (person) => {
    setMovePersonData({
      id: person.id,
      currentGroupId: person.groupId,
      newGroupId: ''
    });
    setShowMoveModal(true);
  };

  const handleSaveMove = async () => {
    try {
      const updatedPerson = { ...movePersonData, newGroupId: parseInt(movePersonData.newGroupId, 10) };
      await axios.put(`http://localhost:3000/people/${movePersonData.id}`, { groupId: updatedPerson.newGroupId });
      setShowMoveModal(false);
      setPeople(people.map(person => (person.id === movePersonData.id ? { ...person, groupId: updatedPerson.newGroupId } : person)));
    } catch (error) {
      console.error('Error moving person:', error);
    }
  };

  return (
    <div>
      <h1>People</h1>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>Create Person</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Email</th>
            <th>Group</th>
            <th>Actions</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.jobTitle}</td>
              <td>{person.email}</td>
              <td>{groups.find(group => group.id === person.groupId)?.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(person)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(person.id)}>Delete</Button>
              </td>
              <td>
                <Button variant="info" onClick={() => handleMove(person)}>Move</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Person Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={editPersonData.firstName}
                onChange={(e) => handleChange(e, setEditPersonData)}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={editPersonData.lastName}
                onChange={(e) => handleChange(e, setEditPersonData)}
              />
            </Form.Group>
            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                name="jobTitle"
                value={editPersonData.jobTitle}
                onChange={(e) => handleChange(e, setEditPersonData)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editPersonData.email}
                onChange={(e) => handleChange(e, setEditPersonData)}
              />
            </Form.Group>
            <Form.Group controlId="formGroup">
              <Form.Label>Group</Form.Label>
              <Form.Control
                as="select"
                name="groupId"
                value={editPersonData.groupId}
                onChange={(e) => handleChange(e, setEditPersonData)}
              >
                <option value="">Select group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Create Person Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={createPersonData.firstName}
                onChange={(e) => handleChange(e, setCreatePersonData)}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={createPersonData.lastName}
                onChange={(e) => handleChange(e, setCreatePersonData)}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                name="jobTitle"
                value={createPersonData.jobTitle}
                onChange={(e) => handleChange(e, setCreatePersonData)}
                isInvalid={!!errors.jobTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobTitle}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={createPersonData.email}
                onChange={(e) => handleChange(e, setCreatePersonData)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGroup">
              <Form.Label>Group</Form.Label>
              <Form.Control
                as="select"
                name="groupId"
                value={createPersonData.groupId}
                onChange={(e) => handleChange(e, setCreatePersonData)}
                isInvalid={!!errors.groupId}
              >
                <option value="">Select group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.groupId}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleCreate}>Create Person</Button>
        </Modal.Footer>
      </Modal>

      {/* Move Person Modal */}
      <Modal show={showMoveModal} onHide={() => setShowMoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Move Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewGroup">
              <Form.Label>New Group</Form.Label>
              <Form.Control
                as="select"
                name="newGroupId"
                value={movePersonData.newGroupId}
                onChange={(e) => handleChange(e, setMovePersonData)}
              >
                <option value="">Select new group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMoveModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveMove}>Move Person</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PeoplePage;
