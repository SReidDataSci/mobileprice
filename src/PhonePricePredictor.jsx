import React, { useState } from 'react';
import axios from 'axios';

const PhonePricePredictor = () => {
  const [formData, setFormData] = useState({
    battery_power: '',
    blue: '',
    clock_speed: '',
    dual_sim: '',
    fc: '',
    four_g: '',
    int_memory: '',
    m_dep: '',
    mobile_wt: '',
    n_cores: '',
    px_height: '',
    px_width: '',
    pc: '',
    ram: '',
    sc_h: '',
    sc_w: '',
    talk_time: '',
    three_g: '',
    touch_screen: '',
    wifi: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mobileprice-production.up.railway.app', formData);
      setPrediction(response.data.price_range);
    } catch (error) {
      console.error('Error making prediction', error);
    }
  };


  return (
    <div>
      <h1>Phone Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        {/* Render input fields dynamically */}
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && <h2>Predicted Price Range: {prediction}</h2>}
    </div>
  );
};

export default PhonePricePredictor;
