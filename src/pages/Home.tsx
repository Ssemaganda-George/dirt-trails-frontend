import Hero from "../components/Hero";
import ImpactSummary from "../components/ImpactSummary";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";

const impactData = [
  { icon: () => null, label: 'Eco-Tourism Operator', value: 'E', bgColor: 'bg-green-600' },
  { icon: () => null, label: 'Conservation Award', color: 'text-yellow-500' },
  { icon: () => null, label: '60+ trees planted', color: 'text-green-600', value: '60+' },
  { icon: () => null, label: '200+ tonnes of carbon offset', color: 'text-green-600', value: '200+' },
  { icon: () => null, label: '4.6/5 from 50+ Reviews', color: 'text-yellow-500', value: '4.6/5' }
];

const Home = () => {
  return (
    <>
      <Hero />
      <ImpactSummary items={impactData} />
      <Partners />
      <Testimonials />
    </>
  );
};

export default Home;
