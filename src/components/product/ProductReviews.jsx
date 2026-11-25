import { useState } from 'react';
import { CheckCircle2, ThumbsUp, Send } from 'lucide-react';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import { productReviews, defaultFallbackReviews } from '@/data/reviews';
import { RatingStars } from '@/components/common/RatingStars';
import { Button } from '@/components/common/Button';

export function ProductReviews({ productId, averageRating = 4.8, totalReviews = 120 }) {
  const initial = productReviews.filter((r) => r.productId === String(productId));
  const [reviews, setReviews] = useState(
    initial.length > 0 ? initial : defaultFallbackReviews
  );
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      toast.error('Please provide your name and review comment.');
      return;
    }
    const initials = author
      .trim()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newReview = {
      id: `rev-${Date.now()}`,
      productId: String(productId),
      author: author.trim(),
      avatar: initials || 'GC',
      rating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      title: title.trim() || 'Verified Purchase Review',
      comment: comment.trim(),
      verified: true,
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    setAuthor('');
    setTitle('');
    setComment('');
    setRating(5);
    toast.success('Thank you! Your review has been published.');
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left: Summary & Write Review Form */}
      <div className="space-y-6">
        <div
          className="rounded-2xl border p-5"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h4 className="text-sm font-extrabold uppercase tracking-wider">Customer Rating</h4>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold">{Number(averageRating).toFixed(1)}</span>
            <div>
              <RatingStars rating={averageRating} showNumber={false} size="medium" />
              <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                Based on {Number(totalReviews).toLocaleString()} global ratings
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-5 space-y-3.5"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h4 className="text-sm font-extrabold uppercase tracking-wider">Write a Review</h4>

          <div>
            <label className="mb-1 block text-xs font-semibold">Your Rating</label>
            <Rating
              value={rating}
              onChange={(_, val) => val && setRating(val)}
              sx={{ color: '#FF9900' }}
            />
          </div>

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2874F0]"
            style={{ borderColor: 'var(--border-color)' }}
          />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Review headline (optional)"
            className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2874F0]"
            style={{ borderColor: 'var(--border-color)' }}
          />

          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts on build quality, fit, or performance..."
            className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2874F0]"
            style={{ borderColor: 'var(--border-color)' }}
          />

          <Button type="submit" className="w-full">
            <Send className="h-4 w-4" />
            <span>Submit Review</span>
          </Button>
        </form>
      </div>

      {/* Right: Reviews List */}
      <div className="lg:col-span-2 space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border p-5 space-y-2.5"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101828] text-xs font-bold text-[#FF9900]">
                  {rev.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold">{rev.author}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {rev.date}
                  </p>
                </div>
              </div>

              {rev.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified Purchase
                </span>
              )}
            </div>

            <RatingStars rating={rev.rating} showNumber={false} />
            <h5 className="text-sm font-bold">{rev.title}</h5>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {rev.comment}
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                <ThumbsUp className="h-3.5 w-3.5" />
                {rev.helpfulCount} people found this helpful
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;