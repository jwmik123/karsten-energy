import { Phone, Mail, MapPin } from "lucide-react";
import ReviewBadge from "./ReviewBadge";

export default function TopBar() {
  return (
    <div className="bg-white text-black py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm">
          <ReviewBadge />
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>info@karstenenergy.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
