
import React, { useEffect } from 'react';

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const serviceList = [
    {
      title: "Real Estate Consultant",
      subtitle: "Bespoke Strategic Advisory",
      description: "Our consultancy transcends simple brokerage. We provide discerning patrons with deep market intelligence, architectural evaluation, and strategic acquisition frameworks tailored for multi-generational wealth preservation.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Estate Portfolio Management",
      subtitle: "Unified Asset Stewardship",
      description: "A comprehensive approach to managing global real estate interests. From optimizing yields in commercial holdings to maintaining the architectural integrity of private residences, we ensure your portfolio remains a coherent legacy.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Strategic Acquisitions",
      subtitle: "Off-Market Intelligence",
      description: "Access to the world's most exclusive properties before they enter the public consciousness. Our network provides privileged entry to off-market landmarks that define sovereign living.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20 md:mb-32 reveal">
          <div className="flex items-center space-x-4 mb-4 md:mb-6">
            <div className="w-10 md:w-12 h-px bg-[#C5A059]"></div>
            <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[10px]">What We Offer</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-serif text-[#0F172A] leading-tight tracking-tighter mb-8 md:mb-12">
            The Pillars of <br/> <span className="italic text-[#C5A059]">Excellence</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-base md:text-xl font-light leading-relaxed">
            Signature Spaces provides a sanctuary for capital and a blueprint for living. Our services are designed for those who view real estate not just as an asset, but as an extension of their legacy.
          </p>
        </div>

        {/* Detailed Service Sections */}
        <div className="space-y-24 md:space-y-40">
          {serviceList.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 md:gap-32 items-center reveal`}>
              <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden bg-slate-50">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-[1.5s] hover:grayscale-0 hover:scale-105"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-10">
                <div>
                  <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[9px] mb-3 md:mb-4 block">{service.subtitle}</span>
                  <h2 className="text-3xl md:text-6xl font-serif text-[#0F172A] leading-tight">{service.title}</h2>
                </div>
                <p className="text-slate-400 text-base md:text-xl font-light leading-relaxed italic">
                  "{service.description}"
                </p>
                <div className="pt-4 md:pt-6">
                  <button className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#0F172A] font-black border-b border-[#0F172A] pb-2 hover:text-[#C5A059] hover:border-[#C5A059] transition-all">
                    Enquire for Strategy &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Network Section */}
        <div className="mt-32 md:mt-60 bg-[#0F172A] p-8 md:p-32 text-center reveal">
           <h3 className="text-white font-serif text-3xl md:text-7xl mb-8 md:mb-12 leading-tight">
             A Global Network of <br/> <span className="italic text-[#C5A059]">Bespoke Intelligence</span>
           </h3>
           <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-lg font-light leading-relaxed mb-12 md:mb-16">
             Our advisors are stationed across major financial hubs—Dubai, London, Singapore, and New York—ensuring that your portfolio benefits from local nuances and global shifts.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 border-t border-white/10 pt-12 md:pt-16">
              {[
                { label: 'Market Cap Managed', value: '$4.2B+' },
                { label: 'Global Offices', value: '12' },
                { label: 'Active Mandates', value: '85' },
                { label: 'Client Retention', value: '98%' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1 md:space-y-2">
                  <p className="text-white text-3xl md:text-5xl font-serif italic">{stat.value}</p>
                  <p className="text-[#C5A059] uppercase tracking-[0.3em] text-[7px] md:text-[9px] font-bold">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
