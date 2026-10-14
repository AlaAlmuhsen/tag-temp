import { useState } from "react";

const TICKET_PRICE = 12;

function TicketCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Derived state
  const total = count * TICKET_PRICE;

  const dec = function () {
    // setCount((count) => count - 1);
    setCount((count) => Math.max(0, count - step));
  };

  const inc = function () {
    // setCount((count) => count + 1);
    setCount((count) => count + step);
  };

  const defineCount = function (e) {
    setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>
        🎟️ {count} tickets = ${total}
      </p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default TicketCounter;
