import React, { FC } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { RenderRouter } from './router';

const App: FC = () => {
  return (
    <HashRouter>
      <RenderRouter />
    </HashRouter>
  );
};

export default App;

