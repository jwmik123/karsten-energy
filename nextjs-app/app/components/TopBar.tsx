import { Phone, Mail, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+1 234 567 890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>info@karstenenergy.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
