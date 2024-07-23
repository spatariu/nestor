import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [newParentGroupId, setNewParentGroupId] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3000/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    try {
      await axios.post('http://localhost:3000/groups', { name: groupName });
      setGroupName('');
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleUpdateGroup = async () => {
    if (!selectedGroup || !groupName.trim()) return;
    try {
      await axios.put(`http://localhost:3000/groups/${selectedGroup.id}`, { name: groupName });
      setGroupName('');
      setSelectedGroup(null);
      fetchGroups();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`http://localhost:3000/groups/${groupId}`);
      fetchGroups();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setGroupName(group.name);
  };

  const handleMoveGroup = async () => {
    if (!selectedGroup || newParentGroupId === '') return;
    try {
      await axios.put(`http://localhost:3000/groups/${selectedGroup.id}/move`, { parentGroupId: newParentGroupId === '' ? null : parseInt(newParentGroupId) });
      setNewParentGroupId('');
      setSelectedGroup(null);
      setShowMoveModal(false);
      fetchGroups();
    } catch (error) {
      console.error('Error moving group:', error);
    }
  };

  return (
    <div className="container">
      <h1>Groups Management</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={selectedGroup ? handleUpdateGroup : handleCreateGroup}
        >
          {selectedGroup ? 'Update Group' : 'Create Group'}
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Parent Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>{group.parentGroup.name || 'None'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleSelectGroup(group)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowMoveModal(true);
                  }}
                >
                  Move
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showMoveModal} onHide={() => setShowMoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Move Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formParentGroup">
            <Form.Label>Select New Parent Group</Form.Label>
            <Form.Control
              as="select"
              value={newParentGroupId}
              onChange={(e) => setNewParentGroupId(e.target.value)}
            >
              <option value="">Select group</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMoveModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleMoveGroup}>Move Group</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GroupsPage;
