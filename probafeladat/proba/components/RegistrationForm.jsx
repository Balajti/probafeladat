import { useState } from 'react';

function RegistrationForm({ onSuccess, email }) {
  const [registeredEmail, setRegisteredEmail] = useState(email);
  const [name, setName] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        email: registeredEmail,
        name: name,
      };

      const response = await fetch('https://ncp-dummy.staging.moonproject.io/api/balajti-zsolt/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        alert('Sikeres regisztráció!');
        onSuccess(registeredEmail);
      } else if (response.status === 422) {
        const data = await response.json();
        const errorCode = data.errors[0].code;

        if (errorCode === 'email:not_found') {
          alert('A kódfeltöltéshez be kell regisztrálni!');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Regisztráció</h1>

      <form className="form" onSubmit={handleRegistration}>
        <div className="inputs">
          <p>E-MAIL CÍM:</p>
          <input
            type="email"
            name="email"
            id="email"
            value={registeredEmail}
            onChange={(e) => setRegisteredEmail(e.target.value)}
          />
        </div>
        <div className="inputs">
          <p>Név:</p>
          <input
            type="text"
            name="kod"
            id="kod"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
