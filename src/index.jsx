import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {
  return <div>hello react app</div>;
};

root.render(<App />);

