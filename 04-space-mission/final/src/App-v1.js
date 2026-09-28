import { useState } from "react";

const messages = [
  "Build the rocket 🚀",
  "Train the crew 👩‍🚀",
  "Land on the Moon 🌕",
];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // const [test, setTest] = useState({ name: "Neil" });

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep((s) => s + 1);
    }

    // BAD PRACTICE
    // test.name = "Buzz";
    // setTest({ name: "Buzz" });
  }

  return (
    <div>
      <button className="toggle" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="mission">
          <div className="stages">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="briefing">
            Step {step}: {messages[step - 1]}
            {/* {test.name} */}
          </p>

          <div className="controls">
            <button
              style={{ backgroundColor: "#ff7a18", color: "#0b1026" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#ff7a18", color: "#0b1026" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
