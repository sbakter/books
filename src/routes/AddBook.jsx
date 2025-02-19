import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * AddBook component that allows users to add a new book.
 * @returns {JSX.Element} - The rendered component.
 */
function AddBook() {
  const { alert, post } = useAxios('http://localhost:3001');
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
    img: '',
  });
  const navigate = useNavigate();

  /**
   * Handles changes to the genres select input.
   * @param {object} event - The change event.
   */
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  /**
   * Handles changes to the rating input.
   * @param {object} event - The change event.
   */
  const rateChangeHandler = (event, newValue) => {
    setRateValue(newValue);
    setBook({
      ...book,
      stars: newValue,
    });
  };

  /**
   * Handles changes to the form inputs.
   * @param {object} e - The change event.
   */
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  /**
   * Handles the form submission to add a new book.
   */
  async function postHandler(e) {
    e.preventDefault();
    const bookWithDefaultImage = {
      ...book,
      img: book.img || 'https://via.placeholder.com/150',
    };
    await post('books', bookWithDefaultImage);
    navigate('/');
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="stars"
              value={rateValue}
              onChange={rateChangeHandler}
              size="large"
            />
            <Box sx={{ ml: 2 }}>{rateValue}</Box>
          </Box>
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
