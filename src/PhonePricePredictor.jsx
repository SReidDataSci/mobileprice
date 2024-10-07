import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Skeleton, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('https://mobileprice-production.up.railway.app/predict', formData);
      setPrediction(response.data.price_range); // Store only the price range
      setPredictionMade(true);
    } catch (error) {
      console.error('Error making prediction', error);
      setPrediction('Error making prediction. Please try again.');
      setPredictionMade(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        backgroundColor: '#fff', 
        padding: theme.spacing(4), 
        borderRadius: theme.shape.borderRadius, 
        boxShadow: theme.shadows[3], 
        textAlign: 'center',
        mt: 4,
        backgroundColor: '#f5f5f5'
      }}
    >
      {!predictionMade ? ( // Render form only if prediction has not been made
        <>
          <Typography variant="h4" mb={2}>Phone Price Predictor</Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {Object.keys(formData).map((key) => (
              <Box key={key}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <TextField
                    fullWidth
                    label={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    variant="outlined"
                  />
                )}
              </Box>
            ))}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <Skeleton width="50%" /> : "Predict"}
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h5" mt={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          The predicted price range is 
          <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>{prediction}</span>
        </Typography>
      )}
    </Container>
  );
};

export default PhonePricePredictor;
