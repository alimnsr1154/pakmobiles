import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import '../css/PhoneComparison.css'; // Import the CSS file


import {
  Container,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

const PhoneComparison = () => {
  const [selectedPhones, setSelectedPhones] = useState([]);

  const handlePhoneSelect = (event) => {
    const selected = event.target.value;
    setSelectedPhones(selected);
  };

  const phones = [
    { id: 1, name: 'Phone A', brand: 'Brand X', ram: '6GB', storage: '128GB' },
    { id: 2, name: 'Phone B', brand: 'Brand Y', ram: '8GB', storage: '256GB' },
    { id: 3, name: 'Phone C', brand: 'Brand Z', ram: '4GB', storage: '64GB' },
  ];

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Phones to Compare</InputLabel>
            <Select
              multiple
              value={selectedPhones}
              onChange={handlePhoneSelect}
              renderValue={(selected) => selected.join(', ')}
            >
              {phones.map((phone) => (
                <MenuItem key={phone.id} value={phone.name}>
                  {phone.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {selectedPhones.length > 1 && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Feature</TableCell>
                    {selectedPhones.map((phone) => (
                      <TableCell key={phone} align="center">
                        {phone}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    {selectedPhones.map((phone) => (
                      <TableCell key={phone} align="center">
                        {phones.find((p) => p.name === phone)?.brand}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>RAM</TableCell>
                    {selectedPhones.map((phone) => (
                      <TableCell key={phone} align="center">
                        {phones.find((p) => p.name === phone)?.ram}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Storage</TableCell>
                    {selectedPhones.map((phone) => (
                      <TableCell key={phone} align="center">
                        {phones.find((p) => p.name === phone)?.storage}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Add more rows for other specifications */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        {selectedPhones.length <= 1 && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Select at least two phones to compare.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PhoneComparison;
