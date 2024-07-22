import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    try {
      await axios.post('/api/groups', { name: groupName });
      setGroupName('');
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleUpdateGroup = async () => {
    if (!selectedGroup || !groupName.trim()) return;
    try {
      await axios.put(`/api/groups/${selectedGroup.id}`, { name: groupName });
      setGroupName('');
      setSelectedGroup(null);
      fetchGroups();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`/api/groups/${groupId}`);
      fetchGroups();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setGroupName(group.name);
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
      <ul className="list-group">
        {groups.map((group) => (
          <li key={group.id} className="list-group-item d-flex justify-content-between align-items-center">
            {group.name}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleSelectGroup(group)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteGroup(group.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsPage;
