import React, {useState} from 'react';
import './App.css';
import 
{ Box,
  InputLabel,
  MenuItem,
  FormControl,
  Grid,
  TextField,
  Button
 }
from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText';

function App() {

  interface responsType {
    exchangeRate:Number;
    convertedAmount: Number;
  }

  const [sourceValue, setSourceValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [amount, setAmount] = useState<Number>();
  const [sourceValueError, setSourceValueError] = useState(false);
  const [targetValueError, setTargetValueError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  
  const [apiResponse, setApiResponse] = useState<responsType|any>();

  const currencyType = ["USD","INR","EUR","YEN","CHF"]

  const handleSource = (event: SelectChangeEvent) => {
    setSourceValue(event.target.value);
    setSourceValueError(false);
  };
  const handleTarget = (event: SelectChangeEvent) => {
    setTargetValue(event.target.value);
    setTargetValueError(false);
  };
  const handleAmount = (event: any) => {
    setAmount(event.target.value);
    setAmountError(false);
  };

  const handleConvertion = () => {
    if(amount && targetValue && sourceValue){      
        setAmountError(false);
        setTargetValueError(false);
        setSourceValueError(false);
        const api = "https://mocki.io/v1/74152a5b-911c-48bf-9818-beff1df80baa";
        axios.get(`${api}${"?sourceCurrency="}${sourceValue}${"&targetCurrency="}${targetValue}${"&amount="}${amount}`)
        .then((response) => {
          setApiResponse(response.data)
        })
        .catch((err)=> console.log(err)); 
    } else {
      if(!amount){
        setAmountError(true)
      } 
      if(!targetValue){
        setTargetValueError(true)
      }  
      if(!sourceValue){        
        setSourceValueError(true)
      }  
    }

  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} className='textAlignCenter' >
              <h2>Currency Conversion App</h2>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={2} md={3}> 
            </Grid>
            <Grid item xs={4} md={3}>  
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth required>
                  <InputLabel id="demo-simple-select-standard-label">Source Currency</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sourceValue}
                    onChange={handleSource}
                    label="Source Currency"
                  >
                    <MenuItem value="" disabled>
                    <em>Please Select</em>
                    </MenuItem>
                    {currencyType.map((curencyType)=>  <MenuItem value={curencyType} key={curencyType} >{curencyType}</MenuItem> )}
                  </Select>
                 {sourceValueError && <FormHelperText error >Required</FormHelperText>} 
                </FormControl>
            </Grid>
            <Grid item xs={4} md={3}> 
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth required>
                  <InputLabel id="demo-simple-select-standard-label">Target Currency</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={targetValue}
                    onChange={handleTarget}
                    label="Target Currency"
                  >
                    <MenuItem value="" disabled>
                      <em>Please Select</em>
                    </MenuItem>
                    {currencyType.map((curencyType)=>  <MenuItem value={curencyType} key={curencyType} >{curencyType}</MenuItem> )}
                  </Select>
                  {targetValueError && <FormHelperText error >Required</FormHelperText>} 
                </FormControl>
            </Grid>
            <Grid item xs={2} md={3}>
            </Grid>
        </Grid>
        <Grid container spacing={2} className="marginTop20">
            <Grid item xs={12} md={12} className='textAlignCenter' >
            <FormControl variant="standard">
              <TextField
                required
                type="number"
                id="standard-required"
                label="Enter Amount"
                variant="standard"
                value={amount}
                onInput={handleAmount}
              />
               {amountError && <FormHelperText error >Required</FormHelperText>} 
              </FormControl>
            </Grid>
        </Grid>
        <Grid container className="marginTop20" >
            <Grid item xs={12} md={12} className='textAlignCenter' >
              <Button onClick={handleConvertion} variant="contained">Convert</Button>
            </Grid>
        </Grid>
        <Grid container className="marginTop20" >
            <Grid item xs={12} md={12} className='textAlignCenter' >
               <label><b>Converted Amount: <span className='colorGreen' >{apiResponse?.convertedAmount}</span></b></label>
            </Grid>
            <Grid item xs={12} md={12} className='textAlignCenter' >              
               <label><b>Exchange Rate: <span className='colorGreen'>{apiResponse?.exchangeRate}</span></b></label>               
            </Grid>
        </Grid>
     </Box>
    </div>
  );
}

export default App;
