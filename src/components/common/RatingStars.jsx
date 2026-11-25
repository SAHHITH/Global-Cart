import Rating from '@mui/material/Rating';

export function RatingStars({ rating = 4.5, reviews, size = 'small', showNumber = true }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Rating
        value={Number(rating)}
        precision={0.1}
        readOnly
        size={size}
        sx={{
          color: '#FF9900',
          '& .MuiRating-iconEmpty': {
            color: 'rgba(152, 162, 179, 0.45)',
          },
        }}
      />
      {showNumber && (
        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
      {reviews !== undefined && (
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          ({Number(reviews).toLocaleString()})
        </span>
      )}
    </div>
  );
}

export default RatingStars;