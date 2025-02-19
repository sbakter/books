import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useAxios from '../services/useAxios';

/**
 * Books component that fetches and displays a list of books.
 * @returns {JSX.Element} - The rendered component.
 */
function Books() {
  const { data: books, loading: isLoading, get } = useAxios('http://localhost:3000');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!books) {
      get('books');
    }
  }, []);

  useEffect(() => {
    if (books) {
      setFilteredBooks(
        books.filter((book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [books, searchTerm]);

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <CircularProgress />}
      {!isLoading && filteredBooks && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button
                    size="small"
                    component={Link}
                    to={`/book/${book.id}`}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
