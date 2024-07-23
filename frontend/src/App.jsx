import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PeoplePage from './pages/PeoplePage';
import GroupsPage from './pages/GroupsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/groups" element={<GroupsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
