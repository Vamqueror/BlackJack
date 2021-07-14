import React, { useEffect, useState } from "react";
import './index.css';



function PlayerHand(props) {
    let cardImages = props.cards.map(function (item, index) {
        return <img className="card" key={index} src={`${process.env.PUBLIC_URL}/images/GameCards/${item.value}_of_${item.type}.png`} alt={""} />
    })

    if (props.hideLeft == true && 'hideLeft' in props) {
        cardImages[0] = <img className="card" key={0} src={`${process.env.PUBLIC_URL}/images/GameCards/card_back.png`} alt={""} />
    }

    return <div>
        {cardImages}
    </div>
}

export default PlayerHand