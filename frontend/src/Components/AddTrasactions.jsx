import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Container, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function AddTransactions() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    const transactionData = {
      title,
      amount: parseFloat(amount),
      category,
    };

    try {
      const response = await axios.post('http://192.168.166.218:5000/transactions', transactionData);
      console.log('Data saved successfully:', response.data);
      // Clear the form
      setTitle('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Grid container p={5} direction="column" spacing={2} alignItems="center" maxWidth="sm" border={1} >
          <Typography variant="h4" gutterBottom style={{ marginTop: '20px', display: "flex", justifyContent: "center", alignItems: "center" }}>
            Add Transaction
          </Typography>
          <Grid item xs={12} style={{ width: '100%' }}>
            <TextField 
              label="Enter Title" 
              variant="outlined" 
              fullWidth 
              value={title} 
              onChange={handleTitleChange} 
            />
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
            <TextField 
              label="Amount" 
              variant="outlined" 
              fullWidth 
              value={amount} 
              onChange={handleAmountChange} 
            />
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
            <Box width="100%">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="dropdown-label">Select Type</InputLabel>
                <Select
                  labelId="dropdown-label"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Select Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="grocery">🛒 Grocery</MenuItem>
                  <MenuItem value="courses">📚 Courses</MenuItem>
                  <MenuItem value="food">🍕 Food</MenuItem>
                  <MenuItem value="salary">💵 Salary</MenuItem>
                  <MenuItem value="shopping">🛍️ Shopping</MenuItem>
                  <MenuItem value="travelling">✈ Travelling</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
            <Box width="100%">
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleSubmit}
              >
                Add Transaction
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AddTransactions;
