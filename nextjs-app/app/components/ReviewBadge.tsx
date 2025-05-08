import { Star } from "lucide-react";

export default function ReviewBadge() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-full px-6 py-4">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-[#FFB400] text-[#FFB400]" />
        ))}
      </div>
      <span className="text-sm font-bold text-black">
        9.9/10 van 100+ reviews
      </span>
    </div>
  );
}
