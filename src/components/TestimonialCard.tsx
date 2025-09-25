import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  quote: string;
  rating: number;
  imageSrc: string;
}

const TestimonialCard = ({ name, location, quote, rating, imageSrc }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <img src={imageSrc} alt={name} className="w-12 h-12 object-cover rounded-full mr-4" />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      <p className="mb-4">"{quote}"</p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className={i < rating ? "text-green-600 fill-current" : "text-gray-300"} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
