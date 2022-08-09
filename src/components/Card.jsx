import React, { useEffect, useState } from "react";
import Car from "../data/Car";
import "../styles/Card.css";

const Card = () => {
  const [data, setData] = useState(Car);
  const [openCard, setOpenCard] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    data.sort(() => Math.random() - 0.5);
  }, []);

  const doubleData = [...data, ...data];

  useEffect(() => {
    const firstMatch = doubleData[openCard[0]];
    const secondMatch = doubleData[openCard[1]];

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatched([...matched, firstMatch.id]);
    }
    if (openCard.length === 2) setTimeout(() => setOpenCard([]), 1000);
  }, [openCard]);

  const handleFlip = (index) => {
    setOpenCard((opened) => [...opened, index]);
  };

  const resetGame = () => {
    setOpenCard([]);
    setMatched([]);
    data.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <h1 className="card_title">Игра памяти</h1>
      <div className="card_list">
        {doubleData.map((data, index) => {
          let flipCard = false;
          if (openCard.includes(index)) flipCard = true;
          if (matched.includes(data.id)) flipCard = true;

          return (
            <div
              className={`card_item ${flipCard ? " flipped " : ""}`}
              key={index}
              onClick={() => handleFlip(index)}
            >
              <div className="card_inner">
                <div className="front">
                  <img className="card_img" src={data.img} alt={data.name} />
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="reset" onClick={resetGame}>
        Начать заново
      </button>
    </>
  );
};

export default Card;
