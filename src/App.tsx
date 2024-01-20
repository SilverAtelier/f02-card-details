import { useState } from 'react';
import './styles/App.css';
// import Complete from './components/Complete/Complete';
import Form from './components/Form/Form';
import Cards from './components/Cards/Cards';
import { CARD_DEFAULTS } from './constants';
import { UserDetails } from './constants';
function App() {
  const [formData, setFormData] = useState<UserDetails>({
    cardHolder: CARD_DEFAULTS.cardHolder,
    cardNumber: CARD_DEFAULTS.cardNumber,
    cardExpMonth: CARD_DEFAULTS.cardExpMonth,
    cardExpYear: CARD_DEFAULTS.cardExpYear,
    cardCvc: CARD_DEFAULTS.cardCvc,
  });
  const handleSubmit = (formData: UserDetails) => {
    setFormData(formData);
  };
  return (
    <>
      <Cards formData={formData} />
      <Form onSubmit={handleSubmit}/>
    </>
  )
}

export default App
