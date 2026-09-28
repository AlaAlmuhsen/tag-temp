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
      <StepMessage step={1}>
        <p>Pass in a payload</p>
        <p>📦</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read the children prop</p>
        <p>🛰️</p>
      </StepMessage>
      {/* <Steps /> */}
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

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="controls">
              <Button
                bgColor="#22d3ee"
                textColor="#0b1026"
                onClick={() => alert(`Mission briefing: ${messages[step - 1]}`)}
              >
                Read briefing
              </Button>
            </div>
          </StepMessage>

          <div className="controls">
            <Button bgColor="#ff7a18" textColor="#0b1026" onClick={handlePrevious}>
              <span>⏪</span> Previous
            </Button>

            <Button bgColor="#ff7a18" textColor="#0b1026" onClick={handleNext}>
              Next <span>⏩</span>
              <span>🚀</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="briefing">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
