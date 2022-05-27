import * as React from 'react';
import { FC, useState } from 'react';
// import './style/index.css';
import { Button } from 'antd';

const App: FC = () => {
  const [count, setCount] = useState<number>(2222);

  return (
    <div className="box">
      count: {count}
      <Button type="primary">czczxczc</Button>
    </div>
  );
};

export default App;

