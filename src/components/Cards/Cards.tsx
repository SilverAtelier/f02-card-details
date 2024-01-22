import React from 'react';
import card1img from '../../assets/images/bg-card-front.png';
import card2img from '../../assets/images/bg-card-back.png';
import cardLogo from '../../assets/images/card-logo.svg';
import { CARD_DEFAULTS } from '../../constants';
import { UserDetails } from '../../constants';


type CardsProps = {
    formData: UserDetails;
};

const Cards: React.FC<CardsProps> = ({ formData }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-front">
          <img src={card1img} alt="card" />
          <div className="card-logo">
            <img src={cardLogo} alt="card logo" />
          </div>
          <div className="card-details">
            <div className="card-details-upper">
              <p className="card-number-front">
                {formData.cardNumber === '' ? CARD_DEFAULTS.cardNumber : formData.cardNumber}
              </p>
            </div>
            <div className="card-details-lower">
              <span className="card-holder">
                {formData.cardHolder === '' ? CARD_DEFAULTS.cardHolder : formData.cardHolder}
              </span>
              <span className="card-expiry">
                {(formData.cardExpMonth === '' ? CARD_DEFAULTS.cardExpMonth : formData.cardExpMonth) +
                  '/' + (formData.cardExpYear === '' ? CARD_DEFAULTS.cardExpYear : formData.cardExpYear)}
              </span>
            </div>
          </div>
        </div>
        <div className="card-back">
          <img src={card2img} alt="card" />
          <div className="card-number-back">
            <span className="card-number-back-text">
              {formData.cardCvc === '' ? CARD_DEFAULTS.cardCvc : formData.cardCvc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
