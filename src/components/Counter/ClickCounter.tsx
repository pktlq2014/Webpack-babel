import React, { useState } from 'react';
const ClickCounter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count {count}</button>;
};
export default ClickCounter;
