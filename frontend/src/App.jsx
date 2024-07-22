import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PeoplePage from './pages/PeoplePage';
import GroupsPage from './pages/GroupsPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/people" Component={PeoplePage} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
