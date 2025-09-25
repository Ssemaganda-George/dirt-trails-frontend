// src/components/Hero.tsx
import { useState, useEffect } from "react";
import { MapPin, Calendar, Users, Compass, Eye, Trees, ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  icon: JSX.Element;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, icon, value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1 relative">
      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600">
        {icon} {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-1.5 sm:py-2 px-2 sm:px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-800 font-medium flex items-center justify-between text-xs sm:text-sm"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className="w-full px-2 sm:px-3 py-2 text-left hover:bg-green-50 text-xs sm:text-sm text-gray-800 font-medium"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface Tour {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  duration_days: number;
}

const Hero: React.FC = () => {
  const [destination, setDestination] = useState("Uganda");
  const [days, setDays] = useState("Five");
  const [guests, setGuests] = useState("4 adults");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<Tour[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const safariImages = [
    "/images/dt3.jpg",
    "/images/field-covered-greenery-surrounded-by-zebras-sunlight-blue-sky.jpg",
    "/images/dt6.jpg",
    "/images/dt2.JPG",
    "/images/crossroad-car-safari-scene.jpg",
    "/images/dt5.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % safariImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const countries: Option[] = [
    { label: "Uganda - Pearl of Africa", value: "Uganda" },
    { label: "Kenya - Land of Safari", value: "Kenya" },
    { label: "Tanzania - Serengeti Plains", value: "Tanzania" },
    { label: "Rwanda - Land of a Thousand Hills", value: "Rwanda" },
  ];

  const durations: Option[] = [
    { label: "3 Days", value: "Three" },
    { label: "5 Days", value: "Five" },
    { label: "7 Days", value: "Seven" },
    { label: "10+ Days", value: "Ten" },
  ];

  const groupSizes: Option[] = [
    { label: "2 adults", value: "2 adults" },
    { label: "4 adults", value: "4 adults" },
    { label: "6 adults", value: "6 adults" },
    { label: "2 adults, 2 children", value: "2 adults, 2 children" },
  ];

  const dayMapping: Record<string, number> = {
    "Three": 3,
    "Five": 5,
    "Seven": 7,
    "Ten": 10
  };

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSearchResults(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/tours?active=true");
      const data: Tour[] = await res.json();

      const filtered = data.filter((tour) =>
        tour.location?.includes(destination) &&
        tour.duration_days === dayMapping[days]
      );

      if (filtered.length > 0) {
        setSearchResults(filtered);
      } else {
        setErrorMessage("No safari available for your selection.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[90vh] flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        {safariImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-2000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 z-10"></div>

      <div className="container relative z-20 flex flex-col xl:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-10 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-white flex-grow max-w-7xl mx-auto">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl text-center xl:text-left">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-2 sm:px-3 py-1 mb-3 sm:mb-4">
            <Compass className="text-amber-300" size={14} />
            <span className="text-amber-100 font-medium text-[10px] sm:text-xs tracking-wide">SAFE & EXPERT-GUIDED JOURNEYS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Explore.</span>
            <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">Connect.</span>
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Sustain.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 text-gray-200 leading-relaxed">
            Because the best journey begins from where the pavement ends...
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center xl:justify-start">
            <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
              <Eye size={16} /> Plan My Safari
            </button>
            <button className="border-2 border-green-400/80 bg-green-500/20 backdrop-blur-sm text-green-200 hover:bg-green-500 hover:text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
              <Trees size={16} /> Explore Conservation
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-amber-200/30 p-3 sm:p-4 lg:p-5 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-sm text-gray-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-green-600 text-white font-bold">D</div>
              <h2 className="font-semibold text-gray-800 text-sm sm:text-base">Book Your Safari</h2>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <CustomDropdown label="Destination" icon={<MapPin size={16}/>} value={destination} options={countries} onChange={setDestination} placeholder="Select Destination" />
              <CustomDropdown label="Days" icon={<Calendar size={16}/>} value={days} options={durations} onChange={setDays} placeholder="Select Days" />
              <CustomDropdown label="Guests" icon={<Users size={16}/>} value={guests} options={groupSizes} onChange={setGuests} placeholder="Select Guests" />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="mt-3 sm:mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-5 lg:px-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 text-sm sm:text-base w-full"
          >
            Search Safari
          </button>

          {/* Search results / messages */}
          <div className="mt-4 text-gray-800">
            {loading && <p>Searching...</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {searchResults && (
              <ul className="space-y-2">
                {searchResults.map((tour) => (
                  <li key={tour.id} className="p-2 border rounded-lg bg-green-50">
                    <h3 className="font-semibold">{tour.title}</h3>
                    <p>{tour.description}</p>
                    <p><strong>Location:</strong> {tour.location}</p>
                    <p><strong>Days:</strong> {tour.duration_days}</p>
                    <p><strong>Price:</strong> ${tour.price}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
