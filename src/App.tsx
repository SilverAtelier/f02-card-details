import { useState} from 'react';
import './styles/App.css';
import Form from './components/Form/Form';
import Cards from './components/Cards/Cards';
import Complete from './components/Complete/Complete';
import { UserDetails } from './constants';

function App() {
  const [card, setCard] = useState<UserDetails>({
    cardHolder: '',
    cardNumber: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCvc: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const handleUpdate = (cardData: UserDetails) => {
    const cardNumber = cardData.cardNumber
      .toString()
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ');
    cardData.cardNumber = cardNumber;
    setCard(cardData);
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <Cards formData={card} />
      {submitted == false ? <Form onUpdate={handleUpdate} onSub={handleSubmit}/> : <Complete />}
    </>
  );
}

export default App;
