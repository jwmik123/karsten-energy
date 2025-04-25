"use client";

import { useState } from "react";

interface ReviewCardProps {
  reviewerName: string;
  reviewerImg?: string;
  rating: number;
  reviewText: string;
  date: string;
  width?: number;
  className?: string;
}

export default function ReviewCard({
  reviewerName,
  reviewerImg,
  rating,
  reviewText,
  date,
  width = 300,
  className = "",
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Default fallback image if none provided
  const avatarSrc =
    reviewerImg ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewerName)}&background=random`;

  // Limit text length if not expanded
  const maxLength = 150;
  const isLongText = reviewText.length > maxLength;
  const displayText =
    !expanded && isLongText
      ? `${reviewText.substring(0, maxLength)}...`
      : reviewText;

  // Generate stars based on rating
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-md ${className}`}
      style={{ width: `${width}px`, minHeight: "200px" }}
    >
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img
            src={avatarSrc}
            alt={reviewerName}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{reviewerName}</h3>
          <div className="flex items-center">
            <div className="flex mr-2">{stars}</div>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
        </div>
      </div>

      <div className="text-gray-600 text-sm">
        <p>{displayText}</p>
      </div>

      <div className="mt-3 flex items-center">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
          className="h-5 mr-2"
        />
        <span className="text-xs text-gray-500">Beoordeling op Google</span>
      </div>
    </div>
  );
}
