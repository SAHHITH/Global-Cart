import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Truck } from 'lucide-react';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-linear-to-r from-[#2874F0] via-[#1C5ED6] to-[#101828] px-4 py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs">
        <div className="hidden md:flex items-center gap-1.5 font-medium text-white/90">
          <Truck className="h-3.5 w-3.5 text-[#FF9900]" />
          <span>Free Express Delivery on orders over ₹999</span>
        </div>

        <p className="mx-auto flex items-center gap-1.5 text-center font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-[#FF9900] shrink-0" />
          <span>
            Use code <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-[#FF9900]">WELCOME15</span> for 15% OFF your first order!
          </span>
          <Link to="/offers" className="ml-1 underline hover:text-[#FF9900]">
            View Offers
          </Link>
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="rounded p-0.5 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementBar;