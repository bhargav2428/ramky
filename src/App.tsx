import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Shield, 
  TrendingUp, 
  Trees, 
  Route, 
  Building2, 
  Phone, 
  Mail, 
  ChevronRight,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Menu,
  X,
  CheckCircle2,
  Award,
  Users,
  ArrowDown,
  Bed,
  Bath,
  Sofa,
  Utensils,
  Maximize,
  Info
} from "lucide-react";
import { useState, useEffect, useRef, ReactNode } from "react";

// --- Types ---
type Page = 'home' | 'project' | 'about' | 'gallery' | 'contact';

// --- Components ---

const Reveal = ({ children, width = "100%", delay = 0.2 }: { children: ReactNode, width?: "100%" | "fit-content", delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Navbar = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { label: string; id: Page }[] = [
    { label: "Home", id: "home" },
    { label: "The Project", id: "project" },
    { label: "About Us", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-luxury-black/90 backdrop-blur-lg py-4 shadow-2xl" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <div className="relative">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-luxury-gold group-hover:text-luxury-offwhite transition-colors">RAMKY</span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-500"></div>
          </div>
          <div className="ml-3 border-l border-luxury-gold/30 pl-3 hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-offwhite/70">Infra & Developers</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-all relative group ${activePage === link.id ? "text-luxury-gold" : "text-luxury-offwhite/70 hover:text-luxury-offwhite"}`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-luxury-gold transition-all duration-500 ${activePage === link.id ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </button>
          ))}
          <button 
            onClick={() => setActivePage('contact')}
            className="px-8 py-3 bg-luxury-gold text-luxury-black text-xs uppercase tracking-widest font-bold hover:bg-luxury-offwhite transition-all duration-500 rounded-sm"
          >
            Enquire Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-luxury-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-luxury-black border-t border-white/10 py-10 px-6 flex flex-col space-y-6 items-center shadow-2xl"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setIsMobileMenuOpen(false); }}
              className={`text-lg font-serif tracking-wide ${activePage === link.id ? "text-luxury-gold" : "text-luxury-offwhite"}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { setActivePage('contact'); setIsMobileMenuOpen(false); }}
            className="w-full py-4 bg-luxury-gold text-luxury-black text-sm uppercase tracking-widest font-bold"
          >
            Enquire Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video/Image Placeholder */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1449156001935-d2863fb72690?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Real Estate Sunset" 
          className="w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/40 via-transparent to-luxury-black"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-luxury-gold text-xs md:text-sm uppercase tracking-[0.6em] font-bold mb-8 block">The Pinnacle of Living</span>
          <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-serif mb-10 leading-[0.9] tracking-tighter">
            Ramky’s <br />
            <span className="italic text-gold-gradient">Brindavanam</span>
          </h1>
          <p className="text-luxury-offwhite/80 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light tracking-wide leading-relaxed">
            The Future of Investment Begins Here. A 100-acre legacy crafted for those who seek the extraordinary.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button 
              onClick={onCtaClick}
              className="px-12 py-6 bg-luxury-gold text-luxury-black text-sm uppercase tracking-[0.3em] font-bold hover:bg-luxury-offwhite transition-all duration-700 rounded-sm flex items-center group shadow-2xl shadow-luxury-gold/20"
            >
              Schedule a Site Visit
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="px-12 py-6 border border-luxury-offwhite/20 text-luxury-offwhite text-sm uppercase tracking-[0.3em] font-bold hover:bg-luxury-offwhite hover:text-luxury-black transition-all duration-700 rounded-sm backdrop-blur-sm">
              View Master Plan
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-24 md:mb-32 text-center">
    <Reveal>
      <span className={`text-xs uppercase tracking-[0.5em] font-bold mb-6 block ${light ? "text-luxury-gold" : "text-luxury-gold"}`}>
        {subtitle}
      </span>
      <h2 className={`text-5xl md:text-7xl font-serif leading-tight ${light ? "text-luxury-offwhite" : "text-luxury-offwhite"}`}>
        {title}
      </h2>
      <div className="w-32 h-[1px] bg-luxury-gold mx-auto mt-10 opacity-50"></div>
    </Reveal>
  </div>
);

const SnapshotCard = ({ icon: Icon, title, value, description }: { icon: any, title: string, value: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -15, scale: 1.02 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card p-12 rounded-sm border-white/5 hover:border-luxury-gold/40 transition-all duration-700 group"
  >
    <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-10 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-700">
      <Icon size={36} />
    </div>
    <p className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-4">{title}</p>
    <h3 className="text-5xl font-serif mb-6 text-luxury-offwhite tracking-tight">{value}</h3>
    <p className="text-luxury-offwhite/50 text-base leading-relaxed font-light">{description}</p>
  </motion.div>
);

interface Room {
  id: string;
  name: string;
  area: string;
  description: string;
  image: string;
  path: string; // SVG path data
  icon: any;
}

interface FloorPlan {
  id: string;
  title: string;
  totalArea: string;
  rooms: Room[];
}

const floorPlans: FloorPlan[] = [
  {
    id: "3bhk",
    title: "3BHK Luxury Villa",
    totalArea: "2400 Sq.Ft",
    rooms: [
      {
        id: "living",
        name: "Grand Living Room",
        area: "450 Sq.Ft",
        description: "A spacious, double-height living area designed for grand gatherings and premium comfort.",
        image: "https://images.unsplash.com/photo-1600607687940-467f5b637a53?q=80&w=2070&auto=format&fit=crop",
        path: "M 10 10 H 190 V 110 H 10 Z",
        icon: Sofa
      },
      {
        id: "master",
        name: "Master Suite",
        area: "380 Sq.Ft",
        description: "The ultimate sanctuary featuring a private balcony, walk-in closet, and spa-like ensuite.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
        path: "M 190 10 H 290 V 110 H 190 Z",
        icon: Bed
      },
      {
        id: "kitchen",
        name: "Gourmet Kitchen",
        area: "220 Sq.Ft",
        description: "State-of-the-art modular kitchen with premium finishes and a dedicated utility area.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        path: "M 10 110 H 110 V 210 H 10 Z",
        icon: Utensils
      },
      {
        id: "dining",
        name: "Fine Dining",
        area: "180 Sq.Ft",
        description: "Elegant dining space adjacent to the kitchen, perfect for intimate family meals.",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop",
        path: "M 110 110 H 190 V 210 H 110 Z",
        icon: Maximize
      }
    ]
  }
];

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-white/5 rounded-sm ${className}`} />
);

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-luxury-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card max-w-2xl w-full p-12 md:p-20 rounded-sm border-luxury-gold/20 relative"
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-luxury-offwhite/40 hover:text-luxury-gold hover:bg-white/10 transition-all duration-300 z-50 group"
              aria-label="Close popup"
            >
              <X size={32} className="group-hover:scale-110 transition-transform" />
            </button>
            
            <span className="text-luxury-gold text-xs uppercase tracking-[0.6em] font-bold mb-8 block">Exclusive Opportunity</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">Don't Miss the <br /><span className="italic">Future of Luxury</span></h2>
            <p className="text-luxury-offwhite/60 text-xl mb-12 font-light leading-relaxed">
              Download our exclusive investment brochure and get a private tour of the 100-acre masterpiece.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <button className="px-10 py-5 bg-luxury-gold text-luxury-black text-sm uppercase tracking-[0.3em] font-bold hover:bg-luxury-offwhite transition-all duration-700 rounded-sm">
                Download Brochure
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-10 py-5 border border-white/10 text-luxury-offwhite text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/5 transition-all duration-500 rounded-sm"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InteractiveFloorPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(floorPlans[0]);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-48 bg-luxury-black">
      <div className="container mx-auto px-6">
        <SectionHeading title="Interactive Floor Plans" subtitle="Experience Your Space" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* SVG Floor Plan */}
          <div className="lg:col-span-7 glass-card p-10 md:p-20 rounded-sm border-white/5 relative overflow-hidden min-h-[500px]">
            {isLoading ? (
              <div className="space-y-12">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="relative aspect-square md:aspect-video flex items-center justify-center">
                  <Skeleton className="w-full h-full max-w-2xl" />
                </div>
              </div>
            ) : (
              <>
                <div className="absolute top-10 left-10 z-10">
                  <h4 className="text-3xl font-serif text-luxury-gold mb-2">{selectedPlan.title}</h4>
                  <p className="text-luxury-offwhite/40 uppercase tracking-widest text-xs font-bold">Total Area: {selectedPlan.totalArea}</p>
                </div>

                <div className="relative aspect-square md:aspect-video flex items-center justify-center mt-20">
                  <svg viewBox="0 0 300 220" className="w-full h-full max-w-2xl drop-shadow-2xl">
                    {selectedPlan.rooms.map((room) => (
                      <motion.path
                        key={room.id}
                        d={room.path}
                        fill={activeRoom?.id === room.id ? "rgba(201, 162, 74, 0.3)" : "rgba(255, 255, 255, 0.03)"}
                        stroke={activeRoom?.id === room.id ? "#C9A24A" : "rgba(255, 255, 255, 0.1)"}
                        strokeWidth="1"
                        className="cursor-pointer transition-all duration-500 hover:fill-luxury-gold/20"
                        onClick={() => setActiveRoom(room)}
                        whileHover={{ scale: 1.01 }}
                      />
                    ))}
                    {/* Labels */}
                    {selectedPlan.rooms.map((room) => {
                      // Simple centroid calculation for labels (hardcoded for demo)
                      const coords = room.id === 'living' ? {x: 100, y: 60} : 
                                    room.id === 'master' ? {x: 240, y: 60} :
                                    room.id === 'kitchen' ? {x: 60, y: 160} :
                                    {x: 150, y: 160};
                      
                      return (
                        <text
                          key={`label-${room.id}`}
                          x={coords.x}
                          y={coords.y}
                          textAnchor="middle"
                          className="fill-luxury-offwhite/30 text-[8px] uppercase tracking-widest font-bold pointer-events-none select-none"
                        >
                          {room.name}
                        </text>
                      );
                    })}
                  </svg>
                </div>
                
                <div className="mt-12 flex items-center space-x-6 text-luxury-offwhite/30 text-xs uppercase tracking-widest">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-luxury-gold/50 bg-luxury-gold/10"></div>
                    <span>Click room to explore</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Room Details */}
          <div className="lg:col-span-5 min-h-[500px]">
            {isLoading ? (
              <div className="space-y-12">
                <Skeleton className="aspect-video w-full" />
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="h-10 w-48" />
                  </div>
                  <Skeleton className="h-8 w-32" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activeRoom ? (
                  <motion.div
                    key={activeRoom.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-12"
                  >
                    <div className="aspect-video rounded-sm overflow-hidden shadow-2xl border border-white/5">
                      <img 
                        src={activeRoom.image} 
                        alt={activeRoom.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setActiveRoom(null)}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-luxury-gold text-luxury-black rounded-full flex items-center justify-center hover:bg-luxury-offwhite transition-colors z-20 shadow-xl"
                      >
                        <X size={20} />
                      </button>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold">
                          <activeRoom.icon size={24} />
                        </div>
                        <h4 className="text-4xl font-serif text-luxury-gold tracking-tight">{activeRoom.name}</h4>
                      </div>
                      
                      <div className="inline-block px-4 py-2 bg-luxury-gold/5 border border-luxury-gold/20 rounded-sm mb-8">
                        <span className="text-luxury-gold text-sm uppercase tracking-widest font-bold">Area: {activeRoom.area}</span>
                      </div>
                      
                      <p className="text-luxury-offwhite/60 text-xl leading-relaxed font-light">
                        {activeRoom.description}
                      </p>
                    </div>

                    <button 
                      onClick={() => setActiveRoom(null)}
                      className="text-luxury-gold text-xs uppercase tracking-[0.4em] font-bold flex items-center hover:text-luxury-offwhite transition-colors group"
                    >
                      <ArrowRight className="mr-4 rotate-180 group-hover:-translate-x-2 transition-transform" size={16} />
                      Back to Overview
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col justify-center items-center text-center p-12 border border-dashed border-white/10 rounded-sm"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-luxury-offwhite/20 mb-10">
                      <Info size={40} />
                    </div>
                    <h4 className="text-3xl font-serif mb-6 text-luxury-offwhite/40">Select a Room</h4>
                    <p className="text-luxury-offwhite/20 text-lg font-light leading-relaxed max-w-xs">
                      Click on any area of the floor plan to view high-resolution imagery and detailed specifications.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const AmenityCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden aspect-[4/5] bg-luxury-gray rounded-sm shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
    <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-[2s] opacity-50 group-hover:opacity-70">
      <img 
        src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop`} 
        alt={title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="absolute bottom-0 left-0 w-full p-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
      <div className="w-14 h-14 bg-luxury-gold text-luxury-black rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700 shadow-xl shadow-luxury-gold/20">
        <Icon size={28} />
      </div>
      <h4 className="text-3xl font-serif mb-4 text-luxury-offwhite tracking-tight">{title}</h4>
      <p className="text-luxury-offwhite/50 text-base opacity-0 group-hover:opacity-100 transition-all duration-700 leading-relaxed font-light">{description}</p>
    </div>
  </motion.div>
);

// --- Page Content ---

const HomePage = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <main>
      <Hero onCtaClick={() => setActivePage('contact')} />

      {/* Prestige Statement */}
      <section className="py-48 md:py-64 bg-luxury-black relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-serif mb-16 leading-[1.1] max-w-6xl mx-auto tracking-tight">
              “Crafted for the <span className="italic text-luxury-gold">future</span>. <br />
              Designed for <span className="italic text-luxury-gold">legacy</span>.”
            </h2>
            <p className="text-luxury-offwhite/50 text-xl md:text-2xl max-w-4xl mx-auto font-light leading-relaxed tracking-wide">
              Ramky’s Brindavanam is more than a development; it's a testament to timeless luxury and strategic foresight in the heart of the world's next great metropolis.
            </p>
          </Reveal>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-luxury-gold rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.08, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-luxury-gold rounded-full"
          ></motion.div>
        </div>
      </section>

      {/* Project Snapshot */}
      <section className="py-40 bg-luxury-gray/20">
        <div className="container mx-auto px-6">
          <SectionHeading title="Project Snapshot" subtitle="At a Glance" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <SnapshotCard 
              icon={Trees} 
              title="Expansive Living" 
              value="100 Acres" 
              description="A massive premium development offering unparalleled space and greenery for generations."
            />
            <SnapshotCard 
              icon={MapPin} 
              title="Prime Location" 
              value="Mucherla" 
              description="Strategically located in the Future City, the next global growth engine of the region."
            />
            <SnapshotCard 
              icon={TrendingUp} 
              title="Investment Value" 
              value="High ROI" 
              description="Positioned in the 4th Future City Growth Zone with massive appreciation potential."
            />
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-48 bg-luxury-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <div className="lg:w-1/2">
              <Reveal>
                <span className="text-luxury-gold text-xs uppercase tracking-[0.5em] font-bold mb-6 block">Future City Advantage</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight tracking-tight">
                  The Epicenter of <br />
                  <span className="italic text-luxury-gold">Global Growth</span>
                </h2>
                <p className="text-luxury-offwhite/60 text-xl mb-12 leading-relaxed font-light">
                  Mucherla is evolving into the 4th Future City, a hub of innovation and luxury. Investing here means being at the doorstep of tomorrow's landmarks.
                </p>
                <ul className="space-y-8 mb-16">
                  {[
                    { icon: Building2, text: "Proximity to AI City & World Trade Center" },
                    { icon: Shield, text: "Near Health City & International Education Hubs" },
                    { icon: Route, text: "Seamless connectivity to the Outer Ring Road" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 rounded-full bg-luxury-gold/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-500">
                        <item.icon size={22} />
                      </div>
                      <span className="text-luxury-offwhite/80 text-lg font-light tracking-wide">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setActivePage('project')}
                  className="px-10 py-5 border border-luxury-gold text-luxury-gold text-xs uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-700"
                >
                  Explore Investment Potential
                </button>
              </Reveal>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Future City Drone Sunset" 
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-12 -left-12 w-80 h-80 border border-luxury-gold/10 -z-0 hidden md:block"></div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 border border-luxury-gold/10 -z-0 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Amenities */}
      <section className="py-48 bg-luxury-gray/5">
        <div className="container mx-auto px-6">
          <SectionHeading title="Signature Amenities" subtitle="Luxury Redefined" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <AmenityCard 
              icon={Building2} 
              title="Grand Clubhouse" 
              description="A 50,000 sq.ft. space for social excellence, recreation, and elite networking."
            />
            <AmenityCard 
              icon={Trees} 
              title="Themed Parks" 
              description="Meticulously landscaped gardens, Zen zones, and serene walking trails."
            />
            <AmenityCard 
              icon={Users} 
              title="Goshala" 
              description="A traditional touch of serenity, sustainable living, and spiritual connection."
            />
            <AmenityCard 
              icon={Route} 
              title="Wide Roads" 
              description="60ft and 40ft wide internal roads with premium streetscaping and lighting."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 bg-luxury-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Real Estate Drone" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-luxury-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-9xl font-serif mb-12 text-luxury-offwhite tracking-tighter">Own Your Future Today</h2>
            <p className="text-luxury-offwhite/50 text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Limited premium plots available in the most sought-after growth zone. Secure your legacy at Ramky’s Brindavanam.
            </p>
            <button 
              onClick={() => setActivePage('contact')}
              className="px-16 py-8 bg-luxury-gold text-luxury-black text-sm uppercase tracking-[0.4em] font-bold hover:bg-luxury-offwhite transition-all duration-700 rounded-sm shadow-2xl shadow-luxury-gold/30"
            >
              Request Pricing & Brochure
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

const ProjectPage = () => {
  return (
    <main className="pt-48">
      <section className="container mx-auto px-6 mb-48">
        <SectionHeading title="The Masterpiece" subtitle="Project Details" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h3 className="text-4xl md:text-6xl font-serif mb-10 text-luxury-gold tracking-tight">Grand Entrance Concept</h3>
            <p className="text-luxury-offwhite/60 text-xl leading-relaxed mb-12 font-light">
              The entrance to Ramky’s Brindavanam is designed to be a landmark in itself. A majestic gateway that signifies your arrival into a world of curated luxury and absolute security.
            </p>
            <div className="space-y-8">
              {[
                "DTCP Approved Layout",
                "RERA Registered Project",
                "IGBC Green Certified Development",
                "100% Vaastu Compliant Plots"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-6 group">
                  <CheckCircle2 className="text-luxury-gold group-hover:scale-110 transition-transform" size={28} />
                  <span className="text-luxury-offwhite text-lg font-light tracking-widest uppercase">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Entrance" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-luxury-gray/10 py-48">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-32">
              <h3 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">Infrastructure Highlights</h3>
              <p className="text-luxury-offwhite/50 text-xl max-w-3xl mx-auto font-light leading-relaxed">Built with precision, our underground infrastructure ensures a clutter-free and premium living environment for the elite.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { title: "Underground Cabling", desc: "No overhead wires, ensuring clear views and absolute safety." },
              { title: "Storm Water Drains", desc: "Advanced drainage system for a flood-free, sustainable layout." },
              { title: "24/7 Security", desc: "Gated community with AI-powered CCTV and professional guards." },
              { title: "Water Supply", desc: "Dedicated overhead tanks for uninterrupted, pure supply." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-luxury-gold/5 rounded-full flex items-center justify-center text-luxury-gold mx-auto mb-10 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-700">
                  <Award size={32} />
                </div>
                <h4 className="text-2xl font-serif mb-4 tracking-tight">{item.title}</h4>
                <p className="text-base text-luxury-offwhite/40 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InteractiveFloorPlan />

      <section className="py-48 container mx-auto px-6">
        <Reveal>
          <div className="glass-card p-16 md:p-32 rounded-sm relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <span className="text-luxury-gold text-xs uppercase tracking-[0.6em] font-bold mb-8 block">The Future City Vision</span>
              <h3 className="text-5xl md:text-8xl font-serif mb-16 tracking-tight">Unprecedented Growth</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {[
                  { title: "AI City", desc: "The upcoming global hub for artificial intelligence and tech innovation." },
                  { title: "World Trade Center", desc: "A massive commercial landmark driving business and value." },
                  { title: "Health City", desc: "World-class medical facilities and wellness centers nearby." },
                  { title: "Education Hub", desc: "Top-tier international schools and universities in the vicinity." }
                ].map((item, i) => (
                  <div key={i} className="border-l border-luxury-gold/20 pl-10 group hover:border-luxury-gold transition-colors duration-700">
                    <h4 className="text-3xl font-serif mb-4 text-luxury-gold group-hover:translate-x-2 transition-transform duration-500">{item.title}</h4>
                    <p className="text-luxury-offwhite/50 text-lg leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Background decorative text */}
            <div className="absolute -bottom-20 -right-20 text-[25rem] font-serif font-bold text-white/[0.02] pointer-events-none select-none">
              2026
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

const AboutPage = () => {
  return (
    <main className="pt-48">
      <section className="container mx-auto px-6 mb-48">
        <SectionHeading title="Legacy of Trust" subtitle="About Ramky Infra" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-square rounded-sm overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Ramky Infra Headquarters" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[5s]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <Reveal>
            <h3 className="text-4xl md:text-6xl font-serif mb-10 text-luxury-gold tracking-tight">Building the Future Since 1994</h3>
            <p className="text-luxury-offwhite/60 text-xl leading-relaxed mb-10 font-light">
              Ramky Infra is a leading infrastructure development and management company in India. With a focus on sustainable growth and excellence, we have delivered landmark projects across sectors.
            </p>
            <p className="text-luxury-offwhite/60 text-xl leading-relaxed mb-12 font-light">
              Ramky’s Brindavanam is our latest vision for premium living—a perfect blend of nature, modern infrastructure, and strategic location in the heart of the Future City.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-5xl font-serif text-luxury-gold mb-2 tracking-tighter">30+</h4>
                <p className="text-luxury-offwhite/40 uppercase tracking-[0.3em] text-xs font-bold">Years of Excellence</p>
              </div>
              <div>
                <h4 className="text-5xl font-serif text-luxury-gold mb-2 tracking-tighter">180+</h4>
                <p className="text-luxury-offwhite/40 uppercase tracking-[0.3em] text-xs font-bold">Projects Delivered</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-luxury-gray/5 py-48">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <Reveal>
              <h4 className="text-4xl font-serif mb-8 text-luxury-gold tracking-tight">Our Vision</h4>
              <p className="text-luxury-offwhite/50 text-xl leading-relaxed font-light">
                To be the most trusted name in infrastructure and real estate, creating value for our customers through innovation, quality, and sustainable practices.
              </p>
            </Reveal>
            <Reveal>
              <h4 className="text-4xl font-serif mb-8 text-luxury-gold tracking-tight">Our Mission</h4>
              <p className="text-luxury-offwhite/50 text-xl leading-relaxed font-light">
                To deliver world-class projects that enhance the quality of life, while maintaining the highest standards of integrity and environmental responsibility.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-48 container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-32">
            <h3 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">Trusted Partners</h3>
            <p className="text-luxury-offwhite/40 text-xl max-w-2xl mx-auto font-light">Collaborating with global leaders to ensure the highest standards of quality and design.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 items-center opacity-30">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="flex justify-center grayscale hover:grayscale-0 transition-all duration-700"
            >
              <div className="flex items-center space-x-4">
                <Building2 className="text-luxury-gold" size={48} />
                <div className="text-3xl font-serif text-luxury-offwhite tracking-widest uppercase">Partner {i}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

const GalleryPage = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", cat: "Layout" },
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", cat: "Development" },
    { url: "https://images.unsplash.com/photo-1600607687940-467f5b637a53?q=80&w=2070&auto=format&fit=crop", cat: "Lifestyle" },
    { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop", cat: "Layout" },
    { url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop", cat: "Development" },
    { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2070&auto=format&fit=crop", cat: "Lifestyle" },
  ];

  return (
    <main className="pt-48 pb-48">
      <div className="container mx-auto px-6">
        <SectionHeading title="Visual Journey" subtitle="Gallery" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer shadow-2xl"
            >
              <img 
                src={img.url} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:blur-[2px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-[2px]">
                <div className="text-center transform scale-50 group-hover:scale-100 transition-transform duration-700">
                  <span className="text-luxury-gold text-xs uppercase tracking-[0.6em] font-bold mb-4 block">{img.cat}</span>
                  <h4 className="text-3xl font-serif text-luxury-offwhite tracking-tight">View Detail</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

const ContactPage = () => {
  return (
    <main className="pt-48 pb-48">
      <div className="container mx-auto px-6">
        <SectionHeading title="Book Your Site Visit" subtitle="Get in Touch" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <Reveal>
            <h3 className="text-4xl md:text-6xl font-serif mb-12 text-luxury-gold tracking-tight">Let's Discuss Your Future Address</h3>
            <p className="text-luxury-offwhite/60 text-xl mb-16 leading-relaxed font-light">
              Our investment consultants are ready to guide you through the most promising real estate opportunity in the Future City.
            </p>
            <div className="space-y-12 mb-16">
              <div className="flex items-start space-x-8 group">
                <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-700">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2 tracking-tight">Corporate Office</h4>
                  <p className="text-luxury-offwhite/50 text-lg font-light">Ramky Towers, Gachibowli, Hyderabad, 500032</p>
                </div>
              </div>
              <div className="flex items-start space-x-8 group">
                <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-700">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2 tracking-tight">Direct Line</h4>
                  <p className="text-luxury-offwhite/50 text-lg font-light">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start space-x-8 group">
                <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-700">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2 tracking-tight">Email Us</h4>
                  <p className="text-luxury-offwhite/50 text-lg font-light">sales@ramkyinfra.com</p>
                </div>
              </div>
            </div>
            <div className="h-96 w-full rounded-sm overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 shadow-2xl border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222661234!2d78.306447314877!3d17.420042988059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f1f1f1f1f1%3A0x1f1f1f1f1f1f1f1f!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-12 md:p-20 rounded-sm shadow-2xl border border-white/5"
          >
            <h4 className="text-3xl font-serif mb-12 tracking-tight">Inquiry Form</h4>
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-bold">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-luxury-gold outline-none transition-colors text-luxury-offwhite text-lg font-light" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-bold">Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-luxury-gold outline-none transition-colors text-luxury-offwhite text-lg font-light" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-bold">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-luxury-gold outline-none transition-colors text-luxury-offwhite text-lg font-light" />
              </div>
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-bold">Message</label>
                <textarea rows={4} placeholder="I'm interested in..." className="w-full bg-transparent border-b border-white/10 py-4 focus:border-luxury-gold outline-none transition-colors text-luxury-offwhite resize-none text-lg font-light"></textarea>
              </div>
              <button className="w-full py-8 bg-luxury-gold text-luxury-black text-sm uppercase tracking-[0.4em] font-bold hover:bg-luxury-offwhite transition-all duration-700 rounded-sm shadow-xl shadow-luxury-gold/20">
                Book Site Visit Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <footer className="bg-luxury-black pt-32 pb-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-10 h-10 bg-luxury-gold flex items-center justify-center rounded-sm">
                <span className="text-luxury-black font-serif font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-serif font-bold tracking-tighter text-luxury-offwhite">RAMKY</span>
            </div>
            <p className="text-luxury-offwhite/40 text-lg leading-relaxed font-light mb-10">
              Crafting premium living experiences in the heart of Hyderabad's Future City.
            </p>
            <div className="flex space-x-6">
              {['Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                <a key={social} href="#" className="text-luxury-gold hover:text-luxury-offwhite transition-colors text-sm uppercase tracking-widest font-bold">{social}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-10 tracking-tight">Quick Links</h4>
            <ul className="space-y-6">
              {['home', 'project', 'about', 'gallery', 'contact'].map((page) => (
                <li key={page}>
                  <button 
                    onClick={() => setActivePage(page as Page)}
                    className="text-luxury-offwhite/40 hover:text-luxury-gold transition-colors text-lg font-light capitalize"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-10 tracking-tight">Project Status</h4>
            <ul className="space-y-6 text-luxury-offwhite/40 text-lg font-light">
              <li>DTCP Approved</li>
              <li>RERA Registered</li>
              <li>Underground Cabling Complete</li>
              <li>Clubhouse Construction Started</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-10 tracking-tight">Contact</h4>
            <ul className="space-y-6 text-luxury-offwhite/40 text-lg font-light">
              <li>Ramky Towers, Gachibowli</li>
              <li>Hyderabad, 500032</li>
              <li>+91 98765 43210</li>
              <li>sales@ramkyinfra.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <p className="text-luxury-offwhite/20 text-sm font-light">
            © 2026 Ramky Infra & Developers Pvt Ltd. All Rights Reserved.
          </p>
          <div className="flex space-x-12 text-luxury-offwhite/20 text-sm font-light">
            <a href="#" className="hover:text-luxury-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">RERA Details</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-offwhite selection:bg-luxury-gold selection:text-luxury-black">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
          {activePage === 'project' && <ProjectPage />}
          {activePage === 'about' && <AboutPage />}
          {activePage === 'gallery' && <GalleryPage />}
          {activePage === 'contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>

      <ExitIntentPopup />

      <Footer setActivePage={setActivePage} />

      {/* Sticky WhatsApp Button */}
      <motion.a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
