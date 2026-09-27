import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const coffeeData = [
  {
    name: "Espresso",
    ingredients: "A single shot of rich, dark-roasted arabica",
    price: 3,
    photoName: "coffees/espresso.svg",
    soldOut: false,
  },
  {
    name: "Cappuccino",
    ingredients: "Espresso, steamed milk, and a thick layer of foam",
    price: 4,
    photoName: "coffees/cappuccino.svg",
    soldOut: false,
  },
  {
    name: "Caffè Latte",
    ingredients: "Espresso with plenty of steamed milk and light foam",
    price: 5,
    photoName: "coffees/latte.svg",
    soldOut: false,
  },
  {
    name: "Caffè Mocha",
    ingredients: "Espresso, chocolate sauce, steamed milk, and cream",
    price: 6,
    photoName: "coffees/mocha.svg",
    soldOut: false,
  },
  {
    name: "Iced Americano",
    ingredients: "Espresso shots poured over cold water and ice",
    price: 5,
    photoName: "coffees/americano.svg",
    soldOut: true,
  },
  {
    name: "Caramel Macchiato",
    ingredients: "Vanilla, steamed milk, espresso, and caramel drizzle",
    price: 7,
    photoName: "coffees/macchiato.svg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Coffee Co.</h1>
    </header>
  );
}

function Menu() {
  const coffees = coffeeData;
  // const coffees = [];
  const numCoffees = coffees.length;

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {numCoffees > 0 ? (
        <>
          <p>
            Freshly roasted, small-batch beans. 6 handcrafted drinks to choose
            from. All brewed to order, all organic, all delicious.
          </p>

          <ul className="coffees">
            {coffees.map((coffee) => (
              <Coffee coffeeObj={coffee} key={coffee.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}

      {/* <Coffee
        name="Cappuccino"
        ingredients="Espresso, steamed milk, and a thick layer of foam"
        photoName="coffees/cappuccino.svg"
        price={4}
      />
      <Coffee
        name="Caffè Latte"
        ingredients="Espresso, steamed milk"
        price={5}
        photoName="coffees/latte.svg"
      /> */}
    </main>
  );
}

function Coffee({ coffeeObj }) {
  console.log(coffeeObj);

  // if (coffeeObj.soldOut) return null;

  return (
    <li className={`coffee ${coffeeObj.soldOut ? "sold-out" : ""}`}>
      <img src={coffeeObj.photoName} alt={coffeeObj.name} />
      <div>
        <h3>{coffeeObj.name}</h3>
        <p>{coffeeObj.ingredients}</p>

        {/* {coffeeObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{coffeeObj.price}</span>
        )} */}

        <span>{coffeeObj.soldOut ? "SOLD OUT" : coffeeObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 7;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry we're closed");

  // if (!isOpen) return <p>CLOSED</p>;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );

  // return React.createElement("footer", null, "We're currently open!");
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"));
