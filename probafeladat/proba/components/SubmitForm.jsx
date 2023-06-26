import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

function SubmitForm({ onSuccess, submitAgain, Code, Time, registeredEmail }) {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [fPurchasetime, setfPurchasetime] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formattedPurchaseTime = `${startDate.toISOString().split('T')[0]} ${time}`
        setfPurchasetime(formattedPurchaseTime);
      const requestBody = {
        email: email,
        code: code,
        purchase_time: formattedPurchaseTime,
      };

      const response = await fetch('https://ncp-dummy.staging.moonproject.io/api/balajti-zsolt/code/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        setEmail('');
        setCode('');
        console.log('Sikeresen feltöltötte a kódot');
      } else if (response.status === 422) {
        const data = await response.json();
        const errorCode = data.errors[0].code;

        if (errorCode === 'email:not_found') {
          alert('A kódfeltöltéshez be kell regisztrálni!');
          onSuccess(email, fPurchasetime, code);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  let i = 1;
  useEffect(() => {
    if (submitAgain) {
        if (i === 1) {
            setEmail(registeredEmail);     
            setCode(Code);
            setfPurchasetime(Time)
            handleSubmit();
            console.log("kdslfmd ", submitAgain, " ", registeredEmail, " ", Code, " ", Time);
            i +=1;
        }
    }
  }, [submitAgain]);

  return (
    <div className="container">
      <h1>Kódfeltöltés</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="inputs">
          <p>E-MAIL CÍM:</p>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required = {true}
          />
        </div>

        <div className="inputs">
          <p>KÓD:</p>
          <input
            type="text"
            name="kod"
            id="kod"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required = {true}
          />
        </div>

        <div className="inputs">
          <p>VÁSÁRLÁS DÁTUMA:</p>

          <div className="dates">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              includeDateIntervals={[
                { start: new Date('2023-05-31'), end: new Date('2023-08-31') },
              ]}
            />

            <TimePicker
              onChange={handleTimeChange}
              value={time}
              disableClock="false"
              locale="hu-HU"
            />
          </div>
        </div>
        <button type="submit">Kódfeltöltés</button>
      </form>
    </div>
  );
}

export default SubmitForm;
