import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Chip, Rating } from '@mui/material';
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
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && book && (
        <Box>
          <Typography variant="h4" component="h1">
            {book.name}
          </Typography>
          <Typography variant="h6" component="h2">
            {book.author}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Rating name="read-only" value={book.stars} readOnly size="large" />
            <Box sx={{ ml: 2 }}>{book.stars}</Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            {book.genres.map((genre, i) => (
              <Chip key={i} label={genre} variant="outlined" size="small" />
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <img src={book.img} alt={book.name} style={{ maxWidth: '100%' }} />
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {book.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SinglePage;
