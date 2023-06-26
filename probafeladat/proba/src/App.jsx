import { useState } from 'react';
import SubmitForm from '../components/SubmitForm';
import RegistrationForm from '../components/RegistrationForm';

import './App.css';

function App() {
  const [displaySubmitForm, setDisplaySubmitForm] = useState(true);
  const [displayRegistrationForm, setDisplayRegistrationForm] = useState(false);
  const [regIsSuccess, setRegIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [fPurchasetime, setFPurchasetime] = useState("");
  const [code, setCode] = useState('');

  const handleSubmitSuccess = (email, fPurchasetime, code) => {
    setDisplaySubmitForm(false);
    setDisplayRegistrationForm(true);
    setEmail(email);
    setFPurchasetime(fPurchasetime);
    setCode(code);
  };

  const handleRegistrationSuccess = () => {
    setDisplaySubmitForm(true);
    setDisplayRegistrationForm(false);
    setRegIsSuccess(true);
    
  };
  

  return (
    <>
      {displaySubmitForm && (
        <SubmitForm
          onSuccess={handleSubmitSuccess}
          submitAgain={regIsSuccess}
          Code = {code}
          Time = {fPurchasetime}
          registeredEmail={email}
        />
      )}

      {displayRegistrationForm && (
        <RegistrationForm
          onSuccess={handleRegistrationSuccess}
          email={email}
        />
      )}
    </>
  );
}

export default App;
