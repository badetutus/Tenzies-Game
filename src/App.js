import "./App.css";
import Die from "./components/Die";
import Button from "./components/Button";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [randomNArray, setArray] = useState(generateArray());

  const [newGame, setType] = useState(false);
  const [rollNumber, setRoll] = useState(0);

  useEffect(() => {
    const allHeld = randomNArray.every((el) => el.isHeld === true);
    const firstValue = randomNArray[0].value;
    const allSame = randomNArray.every((el) => el.value === firstValue);

    if (allHeld & allSame) {
      setType(true);
    }
  }, [randomNArray]);

  function generateArray() {
    const randomNArray = [];
    for (let i = 0; i < 10; i++) {
      randomNArray.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }

    return randomNArray;
  }

  function generateDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function handleRoll() {
    if (newGame) {
      setArray(generateArray());
      setType(false);
      setRoll(0);
    } else {
      setArray((oldA) =>
        oldA.map((die) => {
          return die.isHeld ? die : generateDie();
        })
      );
      setRoll((prev) => prev + 1);
    }
  }

  function handelDieClick(id) {
    setArray((oldA) =>
      oldA.map((el) => {
        if (el.id === id) {
          return { ...el, isHeld: !el.isHeld };
        } else {
          return el;
        }
      })
    );

    console.log(randomNArray);
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="setofdies">
        {randomNArray.map((element, index) => (
          <Die
            hold={() => handelDieClick(element.id)}
            key={index}
            value={element.value}
            id={element.id}
            isHeld={element.isHeld}
          />
        ))}
      </div>
      <Button onClick={handleRoll} type={newGame} />
      <p>Number of Rolls : {rollNumber}</p>
    </main>
  );
}
