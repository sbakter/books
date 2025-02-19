import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Chip, Rating, Card, CardMedia, CardContent } from '@mui/material';
import useAxios from '../services/useAxios';

/**
 * SinglePage component that displays detailed information about a book.
 * @returns {JSX.Element} - The rendered component.
 */
function SinglePage() {
  const { id } = useParams();
  const { data: book, loading, get } = useAxios('http://localhost:3000');

  useEffect(() => {
    if (id) {
      get(`books/${id}`);
    }
  }, [id]);

  return (
    <Box sx={{ mx: 'auto', p: 2, maxWidth: 800 }}>
      {loading && <CircularProgress />}
      {!loading && book && (
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={book.img}
            alt={book.name}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.name}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              {book.author}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Rating name="read-only" value={book.stars} readOnly size="large" />
              <Box sx={{ ml: 2 }}>{book.stars}</Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              {book.genres.map((genre, i) => (
                <Chip key={i} label={genre} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {book.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default SinglePage;
