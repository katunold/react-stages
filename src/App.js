import React from 'react';
import AssemblyLine from './assemblyLine';
import './App.css';

const App = () => {
  const stages = ['Idea', 'Development', 'Testing', 'Deployment'];

  return (
      <div>
        <h1>Assembly Line</h1>
        <AssemblyLine stages={stages} />
      </div>
  );
};

export default App;
