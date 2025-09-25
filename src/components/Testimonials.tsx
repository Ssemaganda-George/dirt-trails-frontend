import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "USA",
      quote: "The Masai Mara Safari exceeded all our expectations.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      name: "David Chen",
      location: "Singapore",
      quote: "Wonderful safari experience! We saw the wildebeest migration.",
      rating: 4,
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      name: "Emma Brown",
      location: "Australia",
      quote: "This was our honeymoon trip and it couldn't have been more perfect.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Hear from travelers who have experienced the magic of East Africa with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
