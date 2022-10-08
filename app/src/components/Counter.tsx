import { useState } from 'preact/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <div className="flex justify-between mt-5">
      <button type="button" onClick={subtract}>
        -
      </button>
      <pre>{count}</pre>
      <button type="button" onClick={add}>
        +
      </button>
    </div>
  );
}

export default Counter;
