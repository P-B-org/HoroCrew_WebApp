import React, { useState } from "react";
import "./TarotInfo.css";

import back from "../../../public/images/tarot/back.png";
import tarot1 from "../../../public/images/tarot/tarot1.png";
import tarot2 from "../../../public/images/tarot/tarot2.png";
import tarot3 from "../../../public/images/tarot/tarot3.png";
import tarot4 from "../../../public/images/tarot/tarot4.png";
import tarot5 from "../../../public/images/tarot/tarot5.png";
import tarot6 from "../../../public/images/tarot/tarot6.png";

export const TarotInfo = ({ tarot }) => {
  const tarotCards = [tarot1, tarot2, tarot3, tarot4, tarot5, tarot6];
  const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];

  const [image, setImage] = useState(back);

  return (
    <div className="tarot-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="my-3">
        <img
          style={{ height: "300px" }}
          src={image}
          onClick={() => {
            setImage(randomCard);
          }}
        />
        <h3 className="mt-3">
          {tarot.name} || {tarot.sequence}
        </h3>
        <div className="px-5">
          <h6 className="mb-0">Description:</h6>
          <p>{tarot.desc}</p>
          <i className="bi bi-arrow-repeat"></i>
          <h6 className="mb-0">Reverse description:</h6>
          <p>{tarot.rdesc}</p>
        </div>
      </div></div>
  );
};
