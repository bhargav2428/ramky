import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text,
  Html,
  PresentationControls,
  Stage,
  Bounds,
  useBounds
} from "@react-three/drei";
import * as THREE from "three";
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
  Info,
  Quote,
  Box,
  Activity,
  Target,
  Rocket,
  Globe,
  Zap,
  Cpu,
  Layers,
  Wind,
  Droplets,
  Heart,
  Sun,
  Moon,
  FileText,
  ExternalLink,
  MessageCircle,
  Send
} from "lucide-react";
import { useState, useEffect, useRef, ReactNode, createContext, useContext } from "react";
import { on } from "events";
import { gain } from "three/tsl";
import { g } from "motion/react-client";

// --- Types ---
type Page = 'home' | 'project' | 'about' | 'gallery' | 'partners' | 'contact' | 'blogs';
type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

const localImages = {
  logo: "/image_12-removebg-preview.png",
  logoAlt: "/image_12-removebg-preview.png.png",
  founder: "/image.png",
  heroA: "/DJI_0171 (1).JPG", // Luxury villa exterior for "The Pinnacle of Living"
  // Modern city skyline for "Strategic Investment"
  heroC: "/9.Arch Brindavanam (1) 1.png",
  aerial: "/WhatsApp Image 2026-04-08 at 21.53.03 (1).jpegs", // Aerial drone footage of the project site
  masterPlan: "/Group 3.png", // Architectural master plan poster
  masterPlanVideo: "/WhatsApp Video 2026-04-09 at 11.10.57.mp4", // Architectural master plan video
  amenityA: "/WhatsApp Image 2026-04-08 at 21.53.02.jpeg", // Luxury clubhouse interior
  amenityB: "/WhatsApp Image 2026-04-08 at 21.53.01 (1).jpeg", // Infinity swimming pool
  amenityC: "/WhatsApp Image 2026-04-08 at 21.53.02 (1).jpeg", // Modern fitness gym
  amenityD: "/WhatsApp Image 2026-04-08 at 21.53.01.jpeg", // Beautiful landscaped park
  galleryA: "/WhatsApp Image 2026-04-08 at 21.52.57 (1).jpeg", // Layout image 1
  galleryB: "/WhatsApp Image 2026-04-08 at 21.52.57.jpeg", // Layout image 2
  galleryC: "/WhatsApp Image 2026-04-08 at 21.52.58 (1).jpeg", // Layout image 3
  galleryD: "/WhatsApp Image 2026-04-08 at 21.52.58.jpeg", // Layout image 4
  galleryE: "/WhatsApp Image 2026-04-08 at 21.53.08 (3).jpeg", // Layout image 5
  galleryF: "/WhatsApp Image 2026-04-08 at 21.53.08.jpeg",
  galleryG: "/WhatsApp Image 2026-04-08 at 21.53.09 (1).jpeg",
  galleryH: "/WhatsApp Image 2026-04-08 at 21.53.09.jpeg",
  galleryI: "/WhatsApp Image 2026-04-08 at 21.53.06 (1).jpeg",
  galleryJ: "/WhatsApp Image 2026-04-08 at 21.53.06 (2).jpeg",
  galleryK: "/WhatsApp Image 2026-04-08 at 21.53.06.jpeg",
  galleryL: "/WhatsApp Image 2026-04-08 at 21.53.07 (1).jpeg",
  galleryM: "/WhatsApp Image 2026-04-08 at 21.53.07.jpeg",
  galleryN: "/WhatsApp Image 2026-04-08 at 21.53.08 (1).jpeg",
  galleryO: "/WhatsApp Image 2026-04-08 at 21.53.08 (2).jpeg",
  blueprintA: "/image 4.png", // 2D Blueprint 1
  blueprintB: "/image 5.png", // 2D Blueprint 2
  onsiteA: "/WhatsApp Image 2026-04-08 at 21.52.57 (1).jpeg", // Construction site image 1
  onsiteB: "/WhatsApp Image 2026-04-08 at 21.52.57.jpeg", // Construction site image 2
  onsiteC: "/WhatsApp Image 2026-04-08 at 21.52.58 (1).jpeg", // Construction site image 3
  onsiteD: "/WhatsApp Image 2026-04-08 at 21.52.58.jpeg", // Construction site image 4

} as const;

const socialLinks = {
  linkedin: "https://www.linkedin.com/in/ramky-infra-and-developers-086963350",
  instagram: "https://www.instagram.com/ramky.infra?igsh=NHRweTR5NHVlZDR3",
  facebook: "https://www.facebook.com/share/1CHcBKKPHY/",
  officeMap: "https://maps.app.goo.gl/AjnqNqRDtCa9SmRL8?g_st=aw",
} as const;

// --- 3D Components ---

const LandscapeTree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.08, 0.12, 0.7, 10]} />
      <meshStandardMaterial color="#5B4636" roughness={0.9} />
    </mesh>
    <mesh position={[0, 0.95, 0]} castShadow>
      <sphereGeometry args={[0.42, 14, 14]} />
      <meshStandardMaterial color="#3E6B47" roughness={0.95} />
    </mesh>
  </group>
);

const PlotLight = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 0.08, 0]}>
      <cylinderGeometry args={[0.06, 0.06, 0.16, 12]} />
      <meshStandardMaterial color="#C9A24A" emissive="#C9A24A" emissiveIntensity={1.4} />
    </mesh>
    <pointLight position={[0, 0.25, 0]} intensity={0.25} color="#D4AF37" distance={2} />
  </group>
);

const Room = ({ position, size, color, name, description, onSelect, isSelected }: {
  position: [number, number, number],
  size: [number, number, number],
  color: string,
  name: string,
  description: string,
  onSelect: () => void,
  isSelected: boolean
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.015;

    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        isSelected ? 0.2 : 0,
        0.08,
      );
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, hovered ? 1.02 : 1, 0.08));
    }

    if (roofRef.current) {
      roofRef.current.scale.setScalar(isSelected ? pulse : 1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={0.08} floatIntensity={isSelected ? 0.35 : 0.12}>
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
            <boxGeometry args={size} />
            <meshStandardMaterial
              color={isSelected ? "#D4AF37" : hovered ? "#B8C0CC" : color}
              roughness={0.28}
              metalness={0.18}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          </mesh>

          <mesh ref={roofRef} castShadow position={[0, size[1] + 0.08, 0]}>
            <boxGeometry args={[size[0] * 0.96, 0.16, size[2] * 0.96]} />
            <meshStandardMaterial color="#E8D7A8" roughness={0.32} metalness={0.08} />
          </mesh>

          <mesh position={[0, size[1] * 0.48, size[2] / 2 + 0.06]}>
            <planeGeometry args={[size[0] * 0.72, size[1] * 0.5]} />
            <meshStandardMaterial
              color="#7DC7D9"
              emissive="#7DC7D9"
              emissiveIntensity={0.16}
              polygonOffset
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
            />
          </mesh>

          <mesh position={[-size[0] / 2 - 0.06, size[1] * 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[size[2] * 0.5, size[1] * 0.42]} />
            <meshStandardMaterial
              color="#97B5D1"
              emissive="#97B5D1"
              emissiveIntensity={0.1}
              polygonOffset
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
            />
          </mesh>
        </group>
      </Float>

      <Html position={[0, size[1] + 0.8, 0]} center>
        <div className="px-2 py-1 bg-black/70 border border-luxury-gold/30 rounded-sm text-[10px] uppercase tracking-[0.2em] text-white whitespace-nowrap">
          {name}
        </div>
      </Html>

      {(isSelected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[Math.max(size[0], size[2]) * 0.34, Math.max(size[0], size[2]) * 0.42, 48]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={isSelected ? 0.65 : 0.28} />
        </mesh>
      )}
    </group>
  );
};

const VillaModel = ({ onRoomSelect, selectedRoom }: { onRoomSelect: (room: any) => void, selectedRoom: any }) => {
  const rooms = [
    { name: "Master Suite", pos: [-4.5, 0.02, -2.8], size: [4.2, 1.9, 4.2], color: "#7B8794", desc: "A sprawling sanctuary with panoramic views and a private terrace." },
    { name: "Grand Living", pos: [1.2, 0.02, -0.4], size: [6.8, 2.6, 7.6], color: "#A0AEC0", desc: "Double-height ceilings and floor-to-ceiling glass walls for ultimate luxury." },
    { name: "Dining Hall", pos: [-3.8, 0.02, 3.4], size: [4.4, 1.8, 3.8], color: "#8792A2", desc: "An elegant space for fine dining and hosting elite gatherings." },
    { name: "Private Cinema", pos: [6.2, 0.02, -3.2], size: [3.4, 1.8, 4.4], color: "#5F6B7A", desc: "State-of-the-art acoustic design with premium leather seating." },
    { name: "Infinity Pool", pos: [0.2, 0.03, 6.3], size: [10.8, 0.28, 4.4], color: "#1E5E7A", desc: "A temperature-controlled pool overlooking the lush greenery." },
  ];

  const trees: Array<[number, number, number]> = [
    [-8, 0, -7], [-6.8, 0, -8], [-4.5, 0, -7.5], [8, 0, -7.2],
    [9, 0, -4.6], [9.2, 0, -1.2], [-9, 0, 2], [-8, 0, 5.2],
    [8.8, 0, 5.6], [6.8, 0, 8], [2.8, 0, 8.4], [-2.5, 0, 8.2],
  ];

  const plotLights: Array<[number, number, number]> = [
    [-10, 0, -10], [-6, 0, -10], [-2, 0, -10], [2, 0, -10], [6, 0, -10], [10, 0, -10],
    [-10, 0, 10], [-6, 0, 10], [-2, 0, 10], [2, 0, 10], [6, 0, 10], [10, 0, 10],
  ];

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]} receiveShadow>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#0F1720" roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#141F18" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[17.5, 0.16, 14.5]} />
        <meshStandardMaterial color="#D9D4CA" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.015, -8.2]} receiveShadow>
        <boxGeometry args={[20, 0.08, 2.4]} />
        <meshStandardMaterial color="#2A2F38" roughness={0.9} />
      </mesh>
      <mesh position={[-7.2, 0.015, 0.2]} receiveShadow>
        <boxGeometry args={[2.2, 0.08, 17.5]} />
        <meshStandardMaterial color="#2A2F38" roughness={0.9} />
      </mesh>
      <mesh position={[7.4, 0.015, 0.2]} receiveShadow>
        <boxGeometry args={[2.2, 0.08, 17.5]} />
        <meshStandardMaterial color="#2A2F38" roughness={0.9} />
      </mesh>

      <mesh position={[0.2, 0.14, 0.8]} receiveShadow>
        <boxGeometry args={[6, 0.05, 0.9]} />
        <meshStandardMaterial color="#B69A63" roughness={0.75} />
      </mesh>

      {rooms.map((room, i) => (
        <Room
          key={i}
          position={room.pos as [number, number, number]}
          size={room.size as [number, number, number]}
          color={room.color}
          name={room.name}
          description={room.desc}
          onSelect={() => onRoomSelect(room)}
          isSelected={selectedRoom?.name === room.name}
        />
      ))}

      {trees.map((position, i) => (
        <LandscapeTree key={i} position={position} scale={i % 3 === 0 ? 1.1 : 0.92} />
      ))}

      {plotLights.map((position, i) => (
        <PlotLight key={i} position={position} />
      ))}

      <ambientLight intensity={1.15} />
      <hemisphereLight intensity={0.9} groundColor="#0f1720" color="#f7f1de" />
      <directionalLight position={[10, 14, 8]} intensity={2.4} color="#ffffff" castShadow />
      <pointLight position={[0, 4, 6]} intensity={2.4} color="#78D5F7" distance={18} />
      <pointLight position={[0, 8, -2]} intensity={1.8} color="#D4AF37" distance={24} />
      <spotLight position={[-10, 18, 10]} angle={0.32} penumbra={1} intensity={2.2} castShadow />
    </group>
  );
};

const Villa3DExperience = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <div className="w-full h-[700px] relative bg-[var(--bg-secondary)] rounded-sm overflow-hidden border border-[var(--border-color)] group">
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h3 className="text-3xl font-serif text-luxury-gold mb-2">3D Interactive Villa</h3>
        <p className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.3em]">Explore the Masterpiece</p>
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        onCreated={({ gl, scene }) => {
          gl.setClearColor("#161616");
          scene.background = new THREE.Color("#161616");
        }}
      >
        <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={40} />
        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={10} 
          maxDistance={25}
          autoRotate={!selectedRoom}
          autoRotateSpeed={0.5}
        />
        <VillaModel 
          selectedRoom={selectedRoom}
          onRoomSelect={(room) => setSelectedRoom(room)} 
        />
        
        <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>

      {/* UI Overlay for Room Details */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-10 right-10 bottom-10 w-96 glass-card p-10 flex flex-col justify-between z-20 border-l border-luxury-gold/20"
          >
            <button 
              onClick={() => setSelectedRoom(null)}
              className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-luxury-gold transition-colors"
            >
              <X size={24} />
            </button>
            <div>
              <span className="text-luxury-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Room Details</span>
              <h4 className="text-4xl font-serif mb-6 text-[var(--text-primary)]">{selectedRoom.name}</h4>
              <p className="text-[var(--text-secondary)] leading-relaxed font-light mb-10">
                {selectedRoom.description}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-widest">Area</span>
                  <span className="text-luxury-gold font-serif">1,200 Sq.Ft.</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-widest">Flooring</span>
                  <span className="text-luxury-gold font-serif">Italian Marble</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-widest">Smart Home</span>
                  <span className="text-luxury-gold font-serif">Fully Integrated</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedRoom(null)}
              className="w-full py-5 border border-luxury-gold/30 text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold hover:text-[var(--bg-primary)] transition-all duration-500"
            >
              Back to Overview
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-10 text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] pointer-events-none">
        Use mouse to rotate & zoom • Click rooms for details
      </div>
    </div>
  );
};

// --- Components ---

// --- Components ---

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[var(--bg-primary)] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Animated Logo Placeholder */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <img
            src={localImages.logo}
            alt="Ramky Brindavanam logo"
            className="w-28 h-28 rounded-sm object-contain shadow-2xl"
          />
        </motion.div>
        
        {/* Pulsing Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "easeOut" 
            }}
            className="absolute inset-0 border border-luxury-gold/20 rounded-full"
          ></motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-serif text-[var(--text-primary)] tracking-widest mb-2">RAMKY BRINDAVANAM</h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-[1px] bg-luxury-gold/30"></div>
          <span className="text-[10px] text-luxury-gold uppercase tracking-[0.5em] font-bold">The Future of Living</span>
          <div className="w-12 h-[1px] bg-luxury-gold/30"></div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-[var(--border-color)]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-luxury-gold"
        ></motion.div>
      </div>
    </motion.div>
  );
};

const HeroCarousel = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const slides = [
    {
      image: localImages.heroA,
      title: "The Pinnacle of Living",
      subtitle: "Ramky’s Brindavanam",
      desc: "A 100-acre legacy crafted for those who seek the extraordinary in the heart of Future City."
    },
    {
      image: localImages.heroC,
      title: "Architectural Excellence",
      subtitle: "Curated Luxury",
      desc: "Meticulously planned infrastructure with underground cabling, wide roads, and elite amenities."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]">
      <AnimatePresence mode="wait">
        <motion.div 
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <motion.div style={{ y }} className="w-full h-full">
            {!isLoaded && (
              <div className="absolute inset-0 bg-[var(--border-color)] animate-pulse flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={slides[current].image} 
              alt={slides[current].subtitle} 
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-70' : 'opacity-0'}`}
              referrerPolicy="no-referrer"
              loading={current === 0 ? "eager" : "lazy"}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[var(--hero-overlay)]"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-luxury-gold text-xs md:text-sm uppercase tracking-[0.6em] font-bold mb-8 block">
              {slides[current].title}
            </span>
            <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-serif mb-10 leading-[0.9] tracking-tighter text-[var(--text-primary)]">
              {slides[current].subtitle.split(' ')[0]} <br />
              <span className="italic text-gold-gradient">{slides[current].subtitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light tracking-wide leading-relaxed">
              {slides[current].desc}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <button 
                onClick={onCtaClick}
                className="px-12 py-6 bg-luxury-gold text-[var(--bg-primary)] text-sm uppercase tracking-[0.3em] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 rounded-sm flex items-center group shadow-2xl shadow-luxury-gold/20"
              >
                Schedule a Site Visit
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="px-12 py-6 border border-[var(--border-color)] text-[var(--text-primary)] text-sm uppercase tracking-[0.3em] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 rounded-sm backdrop-blur-sm">
                View Master Plan
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-12 left-12 flex flex-col space-y-4 z-20">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className="group flex items-center space-x-4"
          >
            <div className={`h-[2px] transition-all duration-700 ${current === i ? 'w-12 bg-luxury-gold' : 'w-6 bg-white/20 group-hover:bg-white/40'}`}></div>
            <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-700 ${current === i ? 'text-luxury-gold' : 'text-white/20 group-hover:text-white/40'}`}>0{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-12 flex flex-col items-center opacity-40"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

const MasterPlanSection = () => {
  return (
    <section className="py-16 md:py-20 bg-[var(--bg-secondary)] relative overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute -top-24 -right-24 w-96 h-96 border border-luxury-gold/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 border border-luxury-gold/10 rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="The Master Plan" subtitle="Strategic Project Layout" />
        
        <div className="relative group mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm overflow-hidden border border-[var(--border-color)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={localImages.masterPlan}
              className="w-full aspect-video object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s]"
            >
              <source src={localImages.masterPlanVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent"></div>
            
            {/* Interactive Hotspots */}
            <div className="absolute top-1/4 left-1/3 group/hotspot">
              <div className="w-4 h-4 bg-luxury-gold rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-luxury-gold rounded-full relative z-10 cursor-pointer"></div>
              <div className="absolute top-8 left-0 w-48 glass-card p-4 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-500 pointer-events-none">
                <h5 className="text-luxury-gold font-serif text-sm mb-1">Grand Clubhouse</h5>
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">50,000 Sq.Ft. Luxury</p>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/4 group/hotspot">
              <div className="w-4 h-4 bg-luxury-gold rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-luxury-gold rounded-full relative z-10 cursor-pointer"></div>
              <div className="absolute bottom-8 right-0 w-48 glass-card p-4 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-500 pointer-events-none">
                <h5 className="text-luxury-gold font-serif text-sm mb-1">Themed Parks</h5>
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Zen & Serenity Zones</p>
              </div>
            </div>

            <div className="absolute top-1/2 right-1/3 group/hotspot">
              <div className="w-4 h-4 bg-luxury-gold rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-luxury-gold rounded-full relative z-10 cursor-pointer"></div>
              <div className="absolute top-8 right-0 w-48 glass-card p-4 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-500 pointer-events-none">
                <h5 className="text-luxury-gold font-serif text-sm mb-1">Goshala</h5>
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Sustainable Living</p>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Total Area", value: "100 Acres" },
              { label: "Open Space", value: "45%" },
              { label: "Total Plots", value: "450+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center p-8 border border-luxury-gold/10 rounded-sm hover:border-luxury-gold/30 transition-all duration-500"
              >
                <p className="text-luxury-gold font-mono text-xs uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <p className="text-3xl font-serif text-[var(--text-primary)]">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FutureCityVision = () => {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #C9A24A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="The Future City Vision" subtitle="A Strategic Masterpiece" />

        <div className="max-w-6xl mx-auto mt-20 space-y-32">
          {/* Step 1: Vision + Growth */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="inline-block p-4 bg-luxury-gold/10 rounded-full mb-8">
              <Globe className="text-luxury-gold" size={48} />
            </div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-[var(--text-primary)] tracking-tight">Unprecedented Growth</h3>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              A visionary blueprint for a 100-acre legacy in the heart of Hyderabad's next global growth engine.
            </p>
          </motion.div>

          {/* Step 2: AI City + World Trade Center */}
          <div className="relative">
            {/* Animated Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-luxury-gold/20 -translate-y-1/2 hidden lg:block overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="glass-card p-10 md:p-12 rounded-sm border-[var(--border-color)] hover:border-luxury-gold/40 transition-all duration-700 group"
              >
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-sm flex items-center justify-center text-luxury-gold mb-8 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <Cpu size={32} />
                </div>
                <h4 className="text-2xl font-serif mb-4 text-[var(--text-primary)]">AI City</h4>
                <p className="text-[var(--text-secondary)] text-base font-light leading-relaxed">
                  The upcoming global hub for artificial intelligence and tech innovation, attracting world-class talent and enterprises.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="glass-card p-10 md:p-12 rounded-sm border-[var(--border-color)] hover:border-luxury-gold/40 transition-all duration-700 group"
              >
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-sm flex items-center justify-center text-luxury-gold mb-8 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <Building2 size={32} />
                </div>
                <h4 className="text-2xl font-serif mb-4 text-[var(--text-primary)]">World Trade Center</h4>
                <p className="text-[var(--text-secondary)] text-base font-light leading-relaxed">
                  A massive commercial landmark driving business and value, positioning the region as a premier trade destination.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Step 3: Health City + Education Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="glass-card p-10 md:p-12 rounded-sm border-[var(--border-color)] hover:border-luxury-gold/40 transition-all duration-700 group text-center"
            >
              <div className="w-16 h-16 bg-luxury-gold/10 rounded-sm flex items-center justify-center text-luxury-gold mb-8 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                <Activity size={32} />
              </div>
              <h4 className="text-2xl font-serif mb-4 text-[var(--text-primary)]">Health City</h4>
              <p className="text-[var(--text-secondary)] text-base font-light leading-relaxed">
                World-class medical facilities and wellness centers nearby, ensuring top-tier healthcare for all residents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="glass-card p-10 md:p-12 rounded-sm border-[var(--border-color)] hover:border-luxury-gold/40 transition-all duration-700 group text-center"
            >
              <div className="w-16 h-16 bg-luxury-gold/10 rounded-sm flex items-center justify-center text-luxury-gold mb-8 mx-auto group-hover:scale-110 transition-transform duration-700">
                <Rocket size={32} />
              </div>
              <h4 className="text-2xl font-serif mb-4 text-[var(--text-primary)]">Education Hub</h4>
              <p className="text-[var(--text-secondary)] text-base font-light leading-relaxed">
                Top-tier international schools and universities in the vicinity, fostering a culture of learning and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] -z-10"></div>
    </section>
  );
};

const VisionMissionSection = () => {
  const items = [
    {
      title: "Our Vision",
      desc: "To redefine luxury living by creating sustainable, tech-enabled ecosystems that empower the next generation of global citizens.",
      icon: Globe,
      gradient: "from-blue-500/20 to-luxury-gold/20"
    },
    {
      title: "Our Mission",
      desc: "To deliver excellence through innovation, transparency, and architectural brilliance, ensuring every project is a legacy for our investors.",
      icon: Target,
      gradient: "from-luxury-gold/20 to-orange-500/20"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-sm -z-10`}></div>
              <div className="glass-card p-12 md:p-20 h-full flex flex-col justify-center border-[var(--border-color)] group-hover:border-luxury-gold/30 transition-all duration-700">
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-sm flex items-center justify-center text-luxury-gold mb-8 group-hover:scale-110 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <item.icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif mb-6 text-[var(--text-primary)] tracking-tight">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light max-w-xl">
                  {item.desc}
                </p>
                
                {/* Abstract Shape */}
                <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <item.icon size={120} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Reveal = ({ children, width = "fit-content", delay = 0.25 }: RevealProps) => {
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
  const { theme, toggleTheme } = useTheme();

  const handleEnquireNow = () => {
    const whatsappMessage = `*New Inquiry - Ramky Brindavanam*

🏢 *Project:* Ramky Brindavanam
📍 *Location:* Jubilee Hills, Hyderabad

*I'm interested in learning more about this project. Please share details.*

*Sent via Website Enquire Now button*`;

    const whatsappUrl = `https://wa.me/919966858799?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

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
    { label: "Partners", id: "partners" },
    { label: "Blogs", id: "blogs" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-[var(--bg-primary)]/90 backdrop-blur-lg py-3 shadow-2xl" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <img
            src={localImages.logo}
            alt="Ramky logo"
            className="w-36 h-24 rounded-sm object-contain mr-4 group-hover:scale-110 transition-transform duration-500"
          />
          {/* <div className="relative">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-luxury-gold group-hover:text-[var(--text-primary)] transition-colors">RAMKY</span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-500"></div>
          </div> */}
          <div className="ml-3 border-l border-luxury-gold/30 pl-3 hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--text-secondary)]">Infra & Developers</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative group ${activePage === link.id ? "text-luxury-gold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-luxury-gold transition-all duration-500 ${activePage === link.id ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </button>
          ))}
          
          <div className="h-6 w-[1px] bg-[var(--border-color)] mx-2"></div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 text-luxury-gold hover:bg-luxury-gold/10 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={handleEnquireNow}
            className="px-6 py-2 bg-luxury-gold text-[var(--bg-primary)] text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 rounded-sm"
          >
            Enquire Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 text-luxury-gold"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-luxury-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-10 px-6 flex flex-col space-y-6 items-center shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setIsMobileMenuOpen(false); }}
                className={`text-lg font-serif tracking-wide ${activePage === link.id ? "text-luxury-gold" : "text-[var(--text-primary)]"}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => { handleEnquireNow(); setIsMobileMenuOpen(false); }}
              className="w-full py-4 bg-luxury-gold text-[var(--bg-primary)] text-sm uppercase tracking-widest font-bold"
            >
              Enquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const slides = [
    {
      image: localImages.heroA,
      title: "Ramky’s Brindavanam",
      subtitle: "The Pinnacle of Living",
      desc: "A 100-acre legacy crafted for those who seek the extraordinary in the heart of Future City."
    },
    {
      image: localImages.heroC,
      title: "Architectural Marvel",
      subtitle: "Modern Infrastructure",
      desc: "Experience world-class amenities and futuristic design that redefines urban luxury living."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          {!isLoaded && (
            <div className="absolute inset-0 bg-luxury-gray/20 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title} 
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-50 dark:opacity-40' : 'opacity-0'}`}
            referrerPolicy="no-referrer"
            loading={currentSlide === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/60 via-transparent to-[var(--bg-primary)]"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-luxury-gold text-[10px] md:text-xs uppercase tracking-[0.8em] font-bold mb-6 block">
              {slides[currentSlide].subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-[1.1] tracking-tighter text-[var(--text-primary)]">
              {slides[currentSlide].title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "italic text-gold-gradient" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
              {slides[currentSlide].desc}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={onCtaClick}
                className="px-10 py-5 bg-luxury-gold text-luxury-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 rounded-sm flex items-center group shadow-2xl shadow-luxury-gold/20"
              >
                Schedule a Site Visit
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </button>
              <button className="px-10 py-5 border border-luxury-gold/20 text-[var(--text-primary)] text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-700 rounded-sm backdrop-blur-sm">
                View Master Plan
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-12 pointer-events-none z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500 pointer-events-auto backdrop-blur-sm"
        >
          <ChevronRight className="rotate-180" size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500 pointer-events-auto backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Manual Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex space-x-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-12 h-[2px] transition-all duration-500 ${currentSlide === i ? "bg-luxury-gold w-20" : "bg-luxury-gold/20 hover:bg-luxury-gold/40"}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-12 flex flex-col items-start opacity-40"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] mb-4 font-bold text-luxury-gold">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 md:mb-12 text-center max-w-4xl mx-auto px-6">
    <Reveal>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mb-3 block text-luxury-gold">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      <div className="w-16 h-[1px] bg-luxury-gold mx-auto mt-4 opacity-40"></div>
    </Reveal>
  </div>
);

const SnapshotCard = ({ icon: Icon, title, value, description }: { icon: any, title: string, value: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card p-10 rounded-sm border-[var(--border-color)] hover:border-luxury-gold/40 transition-all duration-700 group text-center relative overflow-hidden"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-luxury-gold/0 via-luxury-gold/5 to-luxury-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"></div>
    <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-6 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700 mx-auto">
      <Icon size={24} />
    </div>
    <p className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-3">{title}</p>
    <h3 className="text-3xl font-serif mb-3 text-[var(--text-primary)] tracking-tight">{value}</h3>
    <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">{description}</p>
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
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
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
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-[var(--bg-primary)]/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card max-w-2xl w-full p-12 md:p-20 rounded-sm border-luxury-gold/20 relative"
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-[var(--text-secondary)] hover:text-luxury-gold hover:bg-white/10 transition-all duration-300 z-50 group"
              aria-label="Close popup"
            >
              <X size={32} className="group-hover:scale-110 transition-transform" />
            </button>
            
            <span className="text-luxury-gold text-xs uppercase tracking-[0.6em] font-bold mb-8 block">Exclusive Opportunity</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight text-[var(--text-primary)]">Don't Miss the <br /><span className="italic">Future of Luxury</span></h2>
            <p className="text-[var(--text-secondary)] text-xl mb-12 font-light leading-relaxed">
              Download our exclusive investment brochure and get a private tour of the 100-acre masterpiece.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <a 
                href="/Ramky-Villa-Pitch-Deck.pdf" 
                download="Ramky-Villa-Pitch-Deck.pdf"
                className="px-10 py-5 bg-luxury-gold text-[var(--bg-primary)] text-sm uppercase tracking-[0.3em] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 rounded-sm text-center"
              >
                Download Brochure
              </a>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-10 py-5 border border-[var(--border-color)] text-[var(--text-primary)] text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/5 transition-all duration-500 rounded-sm"
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
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !activeRoom) {
      setActiveRoom(selectedPlan.rooms[0] ?? null);
    }
  }, [isLoading, activeRoom, selectedPlan]);

  return (
    <section className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left">
            <span className="text-luxury-gold text-xs uppercase tracking-[0.5em] font-bold mb-4 block">Experience Your Space</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-[var(--text-primary)]">Architectural Vision</h2>
          </div>
          
          <div className="flex bg-[var(--card-bg)] p-2 rounded-sm border border-[var(--border-color)] shadow-2xl">
            <button 
              onClick={() => setViewMode('2d')}
              className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 rounded-sm flex items-center ${viewMode === '2d' ? 'bg-luxury-gold text-[var(--bg-primary)] shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              <Maximize className="mr-3" size={14} />
              2D Blueprint
            </button>
            <button 
              onClick={() => setViewMode('3d')}
              className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 rounded-sm flex items-center ${viewMode === '3d' ? 'bg-luxury-gold text-[var(--bg-primary)] shadow-lg' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              <Box className="mr-3" size={14} />
              3D Interactive
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {viewMode === '2d' ? (
            <motion.div 
              key="2d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* SVG Floor Plan */}
              <div className="lg:col-span-7 glass-card p-8 md:p-16 rounded-sm border-[var(--border-color)] relative overflow-hidden min-h-[500px]">
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
                  <p className="text-[var(--text-secondary)] uppercase tracking-widest text-xs font-bold">Total Area: {selectedPlan.totalArea}</p>
                </div>

                <div className="relative aspect-square md:aspect-video flex items-center justify-center mt-20">
                  <svg viewBox="0 0 300 220" className="w-full h-full max-w-2xl drop-shadow-2xl">
                    {selectedPlan.rooms.map((room) => (
                      <motion.path
                        key={room.id}
                        d={room.path}
                        fill={activeRoom?.id === room.id ? "rgba(201, 162, 74, 0.32)" : "rgba(201, 162, 74, 0.09)"}
                        stroke={activeRoom?.id === room.id ? "#C9A24A" : "rgba(201, 162, 74, 0.35)"}
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all duration-500"
                        onClick={() => setActiveRoom(room)}
                        whileHover={{ scale: 1.01 }}
                      />
                    ))}
                    {/* Labels */}
                    {selectedPlan.rooms.map((room) => {
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
                          className="fill-[var(--text-secondary)] text-[8px] uppercase tracking-widest font-bold pointer-events-none select-none opacity-40"
                        >
                          {room.name}
                        </text>
                      );
                    })}
                  </svg>
                </div>
                
                <div className="mt-12 flex items-center space-x-6 text-[var(--text-secondary)] text-xs uppercase tracking-widest">
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
                    <div className="aspect-video rounded-sm overflow-hidden shadow-2xl border border-[var(--border-color)]">
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
                        className="absolute -top-4 -right-4 w-10 h-10 bg-luxury-gold text-luxury-black rounded-full flex items-center justify-center hover:bg-[var(--bg-primary)] transition-colors z-20 shadow-xl"
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
                      
                      <p className="text-[var(--text-secondary)] text-xl leading-relaxed font-light">
                        {activeRoom.description}
                      </p>
                    </div>

                    <button 
                      onClick={() => setActiveRoom(null)}
                      className="text-luxury-gold text-xs uppercase tracking-[0.4em] font-bold flex items-center hover:text-[var(--text-primary)] transition-colors group"
                    >
                      <ArrowRight className="mr-4 rotate-180 group-hover:-translate-x-2 transition-transform" size={16} />
                      Back to Overview
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col justify-center items-center text-center p-12 border border-dashed border-[var(--border-color)] rounded-sm"
                  >
                    <div className="w-20 h-20 bg-[var(--card-bg)] rounded-full flex items-center justify-center text-luxury-gold/20 mb-10">
                      <Info size={40} />
                    </div>
                    <h4 className="text-3xl font-serif mb-6 text-[var(--text-primary)] opacity-60">Select a Room</h4>
                    <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed max-w-xs">
                      Click on any area of the floor plan to view high-resolution imagery and detailed specifications.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="3d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Villa3DExperience />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const AmenityCard = ({ icon: Icon, title, description, image }: { icon: any, title: string, description: string, image: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden aspect-[4/5] bg-[var(--bg-secondary)] rounded-sm shadow-2xl border border-[var(--border-color)]"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
    <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-[2s] opacity-50 group-hover:opacity-70">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="absolute bottom-0 left-0 w-full p-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
      <div className="w-12 h-12 bg-luxury-gold text-[var(--bg-primary)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700 shadow-xl shadow-luxury-gold/20">
        <Icon size={24} />
      </div>
      <h4 className="text-2xl font-serif mb-3 text-white tracking-tight">{title}</h4>
      <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-all duration-700 leading-relaxed font-light">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, image }: { quote: string, author: string, role: string, image: string }) => {
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 20;
    const yPct = (mouseY / height - 0.5) * -20;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: y, rotateY: x, transformStyle: "preserve-3d" }}
      className="glass-card p-10 md:p-12 rounded-sm border-[var(--border-color)] relative group hover:border-luxury-gold/30 transition-all duration-700 cursor-default"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute -top-4 -left-4 w-12 h-12 bg-luxury-gold flex items-center justify-center text-[var(--bg-primary)] rounded-sm shadow-2xl z-10"
      >
        <Quote size={24} />
      </div>
      
      <p 
        style={{ transform: "translateZ(30px)" }}
        className="text-[var(--text-secondary)] text-lg italic leading-relaxed font-light mb-10 relative z-0"
      >
        "{quote}"
      </p>
      
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="flex items-center space-x-4"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-luxury-gold/20 group-hover:border-luxury-gold transition-colors duration-700">
          <img 
            src={image} 
            alt={author} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h4 className="text-lg font-serif text-[var(--text-primary)] tracking-tight">{author}</h4>
          <p className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Investing in Ramky's Brindavanam was one of the best decisions for our family's future. The scale of the project and the strategic location in the Future City are unmatched.",
      author: "Dr. Arvind Kumar",
      role: "Senior Surgeon",
      image: localImages.founder
    },
    {
      quote: "The attention to detail in the infrastructure, especially the underground cabling and the wide roads, shows Ramky's commitment to delivering truly world-class living.",
      author: "Priya Sharma",
      role: "Tech Entrepreneur",
      image: "/image 1.png"
    },
    {
      quote: "A rare combination of spiritual serenity with the Goshala and modern luxury with the clubhouse. It's exactly the kind of legacy we wanted to build for our children.",
      author: "Rajesh Reddy",
      role: "Industrialist",
      image: "/image 3.png"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-luxury-gold/5 blur-[150px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-luxury-gold/5 blur-[150px] -z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Voices of Trust" subtitle="Client Testimonials" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FounderSection = () => {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden group shadow-2xl order-first lg:order-last">
              <img 
                src="/image.png" 
                alt="Ramakrishna Garagaparthi" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <p className="text-luxury-gold font-serif text-2xl italic">"Building legacies, not just structures."</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass-card p-10 md:p-16 rounded-sm border-[var(--border-color)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-3xl -z-0 group-hover:bg-luxury-gold/10 transition-colors duration-700"></div>
              <span className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-6 block">The Visionary</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[var(--text-primary)] leading-tight">Ramakrishna <span className="italic text-luxury-gold">Garagaparthi</span></h2>
              <p className="text-luxury-gold text-xs uppercase tracking-[0.3em] font-bold mb-8">Actor, Producer & Businessman</p>
              
              {/* Signature Style Name */}
              <div className="mb-8 opacity-40 select-none pointer-events-none">
                <span className="font-serif text-5xl md:text-6xl text-luxury-gold italic tracking-tighter">Ramky</span>
              </div>

              <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed mb-8">
                Popularly known as Ramky, he is a prominent builder and an acclaimed actor in the Telugu film industry. Starting his career with the Nandi Award-winning film "Gangaputhrulu," he has since founded Ramky Infra & Developers Pvt Ltd with a vision to deliver high-quality, affordable housing.
              </p>
              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-luxury-gold font-serif text-xl mb-2">Vision</h4>
                  <p className="text-[var(--text-secondary)] text-sm font-light">To deliver high-quality construction at affordable prices, making housing accessible to all.</p>
                </div>
                <div>
                  <h4 className="text-luxury-gold font-serif text-xl mb-2">Mission</h4>
                  <p className="text-[var(--text-secondary)] text-sm font-light">To help middle-class families achieve the dream of owning a home and lead a stable, secure life.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- Project Roadmap Component ---
const ProjectRoadmap = () => {
  const milestones = [
    {
      year: "2023",
      title: "Vision & Acquisition",
      description: "Strategic acquisition of 100 acres in the heart of the Future City growth corridor.",
      status: "completed",
      icon: <Target className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80" // Land acquisition/development site
    },
    {
      year: "2024",
      title: "Master Planning",
      description: "Collaboration with global urban designers to create a sustainable, luxury ecosystem.",
      status: "completed",
      icon: <Layers className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80" // Architectural planning/blueprints
    },
    {
      year: "2025",
      title: "Infrastructure Launch",
      description: "Commencement of 60ft & 40ft internal roads, drainage, and underground cabling.",
      status: "current",
      icon: <Activity className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80" // Construction site/infrastructure
    },
    {
      year: "2026",
      title: "Amenity Development",
      description: "Grand Clubhouse construction and themed park landscaping in full swing.",
      status: "upcoming",
      icon: <Zap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80" // Clubhouse construction
    },
    {
      year: "2027",
      title: "The Grand Handover",
      description: "Completion of the 100-acre masterpiece and welcoming the first residents.",
      status: "upcoming",
      icon: <Rocket className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80" // Completed luxury development
    }
  ];

  return (
    <section className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 bg-dots-pattern opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Project Roadmap" subtitle="The Journey to Excellence" />
        
        <div className="relative mt-20">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-luxury-gold/20 hidden md:block" />
          
          <div className="space-y-24">
            {milestones.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="w-full md:w-1/2 px-6 md:px-12 text-center md:text-left">
                  <div className={`${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} group`}>
                    <div className="relative mb-6 inline-block overflow-hidden rounded-sm shadow-xl">
                      <img 
                        src={m.image} 
                        alt={m.title} 
                        className="w-48 h-32 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-luxury-gold/10 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    <span className="text-luxury-gold font-mono text-sm tracking-[0.3em] mb-2 block">{m.year}</span>
                    <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-4">{m.title}</h3>
                    <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-md mx-auto md:mx-0">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-luxury-gold/30 my-8 md:my-0 shadow-2xl shadow-luxury-gold/10">
                  <div className={`text-luxury-gold ${m.status === 'current' ? 'animate-pulse' : ''}`}>
                    {m.icon}
                  </div>
                  {m.status === 'current' && (
                    <div className="absolute -inset-2 border border-luxury-gold/20 rounded-full animate-ping" />
                  )}
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Onsite Progress Gallery ---
const OnsiteProgress = () => {
  const images = [
    {
      url: localImages.onsiteA,
      title: "Main Entrance Arch",
      category: "Infrastructure"
    },
    {
      url: localImages.onsiteB,
      title: "Internal Road Network",
      category: "Roads"
    },
    {
      url: localImages.onsiteC,
      title: "Clubhouse Foundation",
      category: "Amenities"
    },
    {
      url: localImages.onsiteD,
      title: "Landscaping Phase 1",
      category: "Parks"
    }
  ];

  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <SectionHeading title="Onsite Progress" subtitle="Witness the Transformation" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-[400px] overflow-hidden rounded-sm cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] mb-2">{img.category}</span>
                <h4 className="text-white text-xl font-serif">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Full Width Map Component ---
const FullWidthMap = () => {
  return (
    <section className="w-full h-[500px] relative bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 grayscale opacity-50 hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps?q=KVR%20Holdings%2C%20Plot%20715%2C%20Road%2036%2C%20Opp%20TATA%20Croma%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="Project Location"
        ></iframe>
      </div>
      
      {/* Map Overlay Card */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10 hidden md:block">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-10 max-w-sm border-luxury-gold/20"
        >
          <h3 className="text-2xl font-serif text-luxury-gold mb-4">Prime Location</h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
            Strategically located in Mucherla, the heart of the 4th Future City. Just 20 minutes from the International Airport.
          </p>
          <div className="flex items-center gap-4 text-xs text-luxury-gold uppercase tracking-widest">
            <MapPin size={16} />
            <a href={socialLinks.officeMap} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Open Correct Location
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PartnersSection = () => {
  const partners = [
    {
      name: "DAMAC Properties",
      label: "International Real Estate Partner",
      summary:
        "DAMAC is showcased as a premium international partner brand known for luxury residential, commercial, and lifestyle developments.",
      highlights: ["Luxury Real Estate", "Dubai", "Global Presence"],
      image: localImages.heroA,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Our Partners" subtitle="Trusted Collaborations" />

        <div className="max-w-3xl mx-auto mb-14 text-center">
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            We collaborate with distinguished brands that reflect quality, ambition, and long-term value. DAMAC is presented here as a featured international partner.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-sm border border-luxury-gold/20 bg-[var(--bg-primary)] shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[280px] lg:min-h-full">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/60" />
                </div>

                <div className="p-8 md:p-10 text-left flex flex-col justify-center">
                  <span className="text-luxury-gold text-[10px] uppercase tracking-[0.45em] font-bold mb-4 block">
                    {partner.label}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif tracking-tight mb-5 text-left text-[var(--text-primary)]">
                    {partner.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed text-left mb-8">
                    {partner.summary}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {partner.highlights.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 border border-[var(--border-color)] rounded-full text-[10px] uppercase tracking-[0.25em] text-luxury-gold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersPage = () => {
  return (
    <main className="pt-32 md:pt-48 bg-[var(--bg-primary)]">
      <PartnersSection />
    </main>
  );
};

// --- Page Content ---

const HomePage = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  const handleEnquireNow = () => {
    const whatsappMessage = `*New Inquiry - Ramky Brindavanam*

🏢 *Project:* Ramky Brindavanam
📍 *Location:* Jubilee Hills, Hyderabad

*I'm interested in scheduling a site visit. Please share availability and details.*

*Sent via Website CTA button*`;

    const whatsappUrl = `https://wa.me/919966858799?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main>
      <Hero onCtaClick={handleEnquireNow} />

      {/* Prestige Statement */}
      <section className="py-16 md:py-20 bg-[var(--bg-primary)] relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="flex justify-center mb-8">
              <div className="w-12 h-px bg-luxury-gold/40" />
              <div className="mx-4 text-luxury-gold"><Award size={20} /></div>
              <div className="w-12 h-px bg-luxury-gold/40" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6 leading-[1.2] max-w-4xl mx-auto tracking-tight text-[var(--text-primary)]">
              “Crafted for the <span className="italic text-luxury-gold">future</span>. <br />
              Designed for <span className="italic text-luxury-gold">legacy</span>.”
            </h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              Ramky’s Brindavanam is more than a development; it's a testament to timeless luxury and strategic foresight in the heart of the world's next great metropolis.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Project Snapshot */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6">
          <SectionHeading title="Project Snapshot" subtitle="At a Glance" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

      {/* Founder Section */}
      <FounderSection />

      {/* Project Roadmap Section */}
      <ProjectRoadmap />

      {/* Future City Vision */}
      <FutureCityVision />

      {/* Onsite Progress Section */}
      <OnsiteProgress />

      {/* Master Plan Section */}
      <MasterPlanSection />

      {/* Signature Amenities */}
      <section className="py-20 bg-luxury-gray/5">
        <div className="container mx-auto px-6">
          <SectionHeading title="Signature Amenities" subtitle="Luxury Redefined" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <AmenityCard 
              icon={Building2} 
              title="Grand Clubhouse" 
              description="A 50,000 sq.ft. space for social excellence, recreation, and elite networking."
              image={localImages.amenityA}
            />
            <AmenityCard 
              icon={Trees} 
              title="Themed Parks" 
              description="Meticulously landscaped gardens, Zen zones, and serene walking trails."
              image={localImages.amenityB}
            />
            <AmenityCard 
              icon={Users} 
              title="Goshala" 
              description="A traditional touch of serenity, sustainable living, and spiritual connection."
              image={localImages.amenityC}
            />
            <AmenityCard 
              icon={Route} 
              title="Wide Roads" 
              description="60ft and 40ft wide internal roads with premium streetscaping and lighting."
              image={localImages.amenityD}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <SectionHeading title="Voices of Trust" subtitle="Client Testimonials" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <TestimonialCard 
              quote="The attention to detail in the master plan and the commitment to green spaces is what sets this project apart from everything else."
              author="Sarah D'Souza"
              role="Urban Architect"
              image="/image 5.png"
            />
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <FullWidthMap />

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={localImages.aerial}
            alt="Luxury Real Estate Drone" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-[var(--bg-primary)]/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-10 text-[var(--text-primary)] tracking-tight leading-tight">Own Your Future Today</h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Limited premium plots available in the most sought-after growth zone. Secure your legacy at Ramky’s Brindavanam.
            </p>
            <button 
              onClick={() => setActivePage('contact')}
              className="px-12 py-6 bg-luxury-gold text-[var(--bg-primary)] text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 rounded-sm shadow-2xl shadow-luxury-gold/30"
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
  const categories = [
    {
      title: "The Grand Entrance",
      desc: "A majestic gateway that reflects the stature of its residents.",
      image: localImages.heroC
    },
    {
      title: "Elite Clubhouse",
      desc: "A 50,000 sq.ft. sanctuary of leisure and social connection.",
      image: localImages.amenityA
    },
    {
      title: "Themed Parks",
      desc: "Lush landscapes designed for serenity and active living.",
      image: localImages.amenityD
    },
    {
      title: "Villa Floor Plans",
      desc: "Detailed 2D blueprints showcasing premium villa layouts and spatial design.",
      image: localImages.blueprintA
    },
    {
      title: "Master Layout Design",
      desc: "Comprehensive architectural plans illustrating the complete project layout.",
      image: localImages.blueprintB
    }
  ];

  return (
    <main className="bg-[var(--bg-primary)]">
      {/* Experience Your Space - Immersive Card Layout */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading title="Experience Your Space" subtitle="Immersive Living" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-sm cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-color)]"
              >
                <div className="relative aspect-[16/10] bg-[var(--bg-primary)]/40 flex items-start justify-center p-4 md:p-5 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-contain object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8 md:p-10 border-t border-[var(--border-color)] group-hover:border-luxury-gold/30 transition-colors duration-700">
                  <h4 className="text-3xl font-serif text-[var(--text-primary)] mb-3 tracking-tight">{cat.title}</h4>
                  <p className="text-[var(--text-secondary)] text-base font-light mb-6 leading-relaxed">
                    {cat.desc}
                  </p>
                  <button className="px-6 py-3 bg-luxury-gold text-luxury-black text-[8px] uppercase tracking-widest font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 rounded-sm">
                    Explore Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InteractiveFloorPlan />
    </main>
  );
};

const AboutPage = () => {
  return (
    <main className="pt-32 md:pt-48 bg-[var(--bg-primary)]">
      <section className="container mx-auto px-6 mb-24 md:mb-32">
        <SectionHeading title="Legacy of Excellence" subtitle="About Ramakrishna Garagaparthi" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
          >
            <img 
              src="/image.png" 
              alt="Ramakrishna Garagaparthi" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[5s]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <Reveal width="100%">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl md:text-5xl font-serif mb-8 text-luxury-gold tracking-tight">A Journey of Passion & Purpose</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6 font-light">
                Garagaparthi Ramakrishna, popularly known as Ramky, is an Indian film actor and businessman. He started his career with the movie "Gangaputhrulu," earning the prestigious Nandi Award for Best Debut Hero in 2010.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6 font-light">
                Beyond cinema, he established GRK Films and produced meaningful films like "Journalist," highlighting the impact of media in politics. His entrepreneurial spirit led him to found Ramky Infra & Developers Pvt Ltd, where he focuses on delivering high-quality, affordable housing.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 font-light">
                Ramky is also a dedicated social activist, contributing to Titli cyclone relief, Pulwama attack vigils, and Hyderabad flood relief. He serves as a member of the Disciplinary Committee in the Film Chamber, upholding ethical standards in the industry.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-serif text-luxury-gold mb-1">Nandi Award</h4>
                  <p className="text-[var(--text-secondary)] uppercase tracking-[0.2em] text-[10px] font-bold opacity-60">Best Debut Hero (2010)</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-luxury-gold mb-1">GRK Films</h4>
                  <p className="text-[var(--text-secondary)] uppercase tracking-[0.2em] text-[10px] font-bold opacity-60">Production House</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <VisionMissionSection />

      <section className="py-24 md:py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading title="Social Contributions" subtitle="Making a Difference" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {[
              { 
                title: "Cyclone Relief", 
                desc: "Distributed food and aid to people affected by the Titli cyclone in Srikakulam.",
                icon: <Wind className="text-luxury-gold" size={32} />
              },
              { 
                title: "Flood Support", 
                desc: "Donated ₹5 lakhs to the Telangana government during severe Hyderabad floods.",
                icon: <Droplets className="text-luxury-gold" size={32} />
              },
              { 
                title: "Social Activism", 
                desc: "Voice for millions in the fight for Special Category status for Andhra Pradesh.",
                icon: <Heart className="text-luxury-gold" size={32} />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-10 rounded-sm border-[var(--border-color)] hover:border-luxury-gold/30 transition-all duration-500 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h4 className="text-xl font-serif text-luxury-gold mb-4">{item.title}</h4>
                <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const GalleryPage = () => {
  const images = [
    { url: localImages.galleryA, cat: "Layout" },
    { url: localImages.galleryB, cat: "Master Plan" },
    { url: localImages.galleryC, cat: "Layout" },
    { url: localImages.galleryD, cat: "Master Plan" },
    { url: localImages.galleryE, cat: "Layout" },
    { url: localImages.galleryF, cat: "Master Plan" },
    { url: localImages.galleryG, cat: "Development" },
    { url: localImages.galleryH, cat: "Lifestyle" },
    { url: localImages.galleryI, cat: "Development" },
    { url: localImages.galleryJ, cat: "Lifestyle" },
    { url: localImages.galleryK, cat: "Master Plan" },
    { url: localImages.galleryL, cat: "Layout" },
    { url: localImages.galleryM, cat: "Development" },
    { url: localImages.galleryN, cat: "Lifestyle" },
    { url: localImages.galleryO, cat: "Master Plan" },
  ];

  return (
    <main className="pt-32 md:pt-48 pb-24 md:pb-32 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <SectionHeading title="Visual Journey" subtitle="Gallery" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
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
              <div className="absolute inset-0 bg-[var(--bg-primary)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-[2px]">
                <div className="text-center transform scale-50 group-hover:scale-100 transition-transform duration-700">
                  <span className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-3 block">{img.cat}</span>
                  <h4 className="text-2xl font-serif text-[var(--text-primary)] tracking-tight">View Detail</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      title: "The Future of Sustainable Living in Hyderabad",
      excerpt: "Discover how Ramky's Brindavanam is setting new standards for eco-friendly infrastructure and green living spaces.",
      date: "March 28, 2026",
      image: localImages.galleryD,
      category: "Sustainability"
    },
    {
      id: 2,
      title: "Investment Opportunities in the Future City",
      excerpt: "Why the upcoming Future City corridor is the most promising real estate investment in Southern India today.",
      date: "April 02, 2026",
      image: localImages.aerial,
      category: "Investment"
    },
    {
      id: 3,
      title: "Modern Amenities: Redefining Luxury",
      excerpt: "A deep dive into the world-class amenities at Brindavanam, from the infinity pool to the organic community gardens.",
      date: "April 05, 2026",
      image: localImages.amenityA,
      category: "Lifestyle"
    }
  ];

  return (
    <main className="pt-32 md:pt-48 bg-[var(--bg-primary)]">
      <section className="container mx-auto px-6 mb-24 md:mb-32">
        <SectionHeading title="Insights & Updates" subtitle="Our Blog" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-sm mb-6 relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-luxury-gold text-[var(--bg-primary)] px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                  {blog.category}
                </div>
              </div>
              <p className="text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-bold mb-3">{blog.date}</p>
              <h3 className="text-2xl font-serif mb-4 group-hover:text-luxury-gold transition-colors leading-tight">{blog.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed mb-6 line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex items-center text-luxury-gold text-[10px] uppercase tracking-widest font-bold group/link">
                Read More 
                <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 md:py-32 bg-luxury-gold/5 border-y border-luxury-gold/10">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h3 className="text-3xl md:text-5xl font-serif mb-6 tracking-tight">Stay Informed</h3>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light mb-12">
              Subscribe to our newsletter to receive the latest updates on project progress, market insights, and exclusive offers.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] px-6 py-4 rounded-sm text-sm focus:border-luxury-gold outline-none transition-colors"
              />
              <button className="px-8 py-4 bg-luxury-gold text-[var(--bg-primary)] text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--text-primary)] transition-all">
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;

    if (!name || !phone || !email || !message) {
      alert('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `*New Inquiry - Ramky Brindavanam*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
💬 *Message:* ${message}

🏢 *Project:* Ramky Brindavanam
📍 *Location:* Jubilee Hills, Hyderabad

*Sent via Website Contact Form*`;

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/919966858799?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Also send email as backup
    const emailSubject = `New Inquiry - Ramky Brindavanam from ${name}`;
    const emailBody = `New inquiry received:

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}

Project: Ramky Brindavanam
Location: Jubilee Hills, Hyderabad

Sent via website contact form on ${new Date().toLocaleString()}`;

    const emailUrl = `mailto:ramkyinfra3999@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client as backup
    setTimeout(() => {
      window.open(emailUrl, '_blank');
    }, 1000);

    // Reset form
    if (nameRef.current) nameRef.current.value = '';
    if (phoneRef.current) phoneRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (messageRef.current) messageRef.current.value = '';

    setIsSubmitting(false);

    // Show success message
    alert('Thank you! Your inquiry has been sent via WhatsApp and email. We will get back to you soon!');
  };

  return (
    <main className="pt-32 md:pt-48 pb-24 md:pb-32 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <SectionHeading title="Book Your Site Visit" subtitle="Get in Touch" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          <Reveal>
            <h3 className="text-3xl md:text-5xl font-serif mb-8 text-luxury-gold tracking-tight">Let's Discuss Your Future Address</h3>
            <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed font-light">
              Our investment consultants are ready to guide you through the most promising real estate opportunity in the Future City.
            </p>
            <div className="space-y-8 mb-10">
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif mb-1 tracking-tight text-[var(--text-primary)]">Corporate Office</h4>
                  <p className="text-[var(--text-secondary)] text-base font-light">KVR Holdings, Plot # 715, Road #36, Opp. TATA Croma,<br />Jubilee Hills, Hyderabad, Telangana - 500033</p>
                  <a href={socialLinks.officeMap} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-luxury-gold text-sm hover:underline">
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif mb-1 tracking-tight text-[var(--text-primary)]">Direct Line</h4>
                  <p className="text-[var(--text-secondary)] text-base font-light">+91 9966858799</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold shrink-0 group-hover:bg-luxury-gold group-hover:text-[var(--bg-primary)] transition-all duration-700">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif mb-1 tracking-tight text-[var(--text-primary)]">Email Us</h4>
                  <p className="text-[var(--text-secondary)] text-base font-light">ramkyinfra3999@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="h-80 w-full rounded-sm overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 shadow-2xl border border-[var(--border-color)]">
              <iframe 
                src="https://www.google.com/maps?q=KVR%20Holdings%2C%20Plot%20715%2C%20Road%2036%2C%20Opp%20TATA%20Croma%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-10 md:p-16 rounded-sm shadow-2xl border border-[var(--border-color)]"
          >
            <h4 className="text-2xl md:text-3xl font-serif mb-10 tracking-tight text-[var(--text-primary)]">Inquiry Form</h4>
            <form className="space-y-8" onSubmit={handleInquirySubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Full Name</label>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-[var(--border-color)] py-3 focus:border-luxury-gold outline-none transition-colors text-[var(--text-primary)] text-base font-light"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Phone Number</label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b border-[var(--border-color)] py-3 focus:border-luxury-gold outline-none transition-colors text-[var(--text-primary)] text-base font-light"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Email Address</label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-3 focus:border-luxury-gold outline-none transition-colors text-[var(--text-primary)] text-base font-light"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Message</label>
                <textarea
                  ref={messageRef}
                  rows={3}
                  placeholder="I'm interested in..."
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-3 focus:border-luxury-gold outline-none transition-colors text-[var(--text-primary)] resize-none text-base font-light"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-luxury-gold text-luxury-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-700 rounded-sm shadow-xl shadow-luxury-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Book Site Visit Now'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-[var(--bg-primary)] pt-24 pb-12 border-t border-[var(--border-color)] relative overflow-hidden">
      {/* Advanced City Skyline Silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-0">
        <div className="relative w-full h-full overflow-hidden">
          {/* Layer 1: Background (Slowest) */}
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 flex items-end opacity-5 dark:opacity-10"
          >
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="w-32 bg-luxury-gold shrink-0 rounded-t-lg mx-1"
                style={{ height: `${Math.random() * 100 + 100}px` }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div 
                key={i + 20} 
                className="w-32 bg-luxury-gold shrink-0 rounded-t-lg mx-1"
                style={{ height: `${Math.random() * 100 + 100}px` }}
              />
            ))}
          </motion.div>

          {/* Layer 2: Mid (Medium) */}
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 flex items-end opacity-10 dark:opacity-20"
          >
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="w-20 bg-luxury-gold shrink-0 rounded-t-md mx-2 relative"
                style={{ height: `${Math.random() * 150 + 50}px` }}
              >
                {theme === 'dark' && (
                  <div className="grid grid-cols-2 gap-1 p-1 mt-2">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="w-1 h-1 bg-luxury-gold/30 rounded-full animate-pulse" style={{ animationDelay: `${Math.random() * 2}s` }}></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {[...Array(30)].map((_, i) => (
              <div 
                key={i + 30} 
                className="w-20 bg-luxury-gold shrink-0 rounded-t-md mx-2 relative"
                style={{ height: `${Math.random() * 150 + 50}px` }}
              >
                {theme === 'dark' && (
                  <div className="grid grid-cols-2 gap-1 p-1 mt-2">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="w-1 h-1 bg-luxury-gold/30 rounded-full animate-pulse" style={{ animationDelay: `${Math.random() * 2}s` }}></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Layer 3: Front (Fastest) */}
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 flex items-end opacity-20 dark:opacity-30"
          >
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="w-12 bg-luxury-gold shrink-0 rounded-t-sm mx-1 relative"
                style={{ height: `${Math.random() * 80 + 20}px` }}
              >
                {theme === 'dark' && (
                  <div className="grid grid-cols-1 gap-1 p-1 mt-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-1 h-1 bg-luxury-gold/50 rounded-full animate-pulse" style={{ animationDelay: `${Math.random() * 1.5}s` }}></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {[...Array(40)].map((_, i) => (
              <div 
                key={i + 40} 
                className="w-12 bg-luxury-gold shrink-0 rounded-t-sm mx-1 relative"
                style={{ height: `${Math.random() * 80 + 20}px` }}
              >
                {theme === 'dark' && (
                  <div className="grid grid-cols-1 gap-1 p-1 mt-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-1 h-1 bg-luxury-gold/50 rounded-full animate-pulse" style={{ animationDelay: `${Math.random() * 1.5}s` }}></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <img
                src={localImages.logo}
                alt="Ramky logo"
                className="w-16 h-16 rounded-sm object-contain"
              />
              <span className="text-2xl font-serif font-bold tracking-tighter text-[var(--text-primary)]">RAMKY</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light mb-8">
              Crafting premium living experiences in the heart of Hyderabad's Future City.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
                { Icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
                { Icon: Facebook, href: socialLinks.facebook, label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-[var(--bg-primary)] transition-all duration-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-8 tracking-tight text-[var(--text-primary)]">Quick Links</h4>
            <ul className="space-y-3">
              {['home', 'project', 'about', 'gallery', 'partners', 'blogs', 'contact'].map((page) => (
                <li key={page}>
                  <button 
                    onClick={() => setActivePage(page as Page)}
                    className="text-[var(--text-secondary)] hover:text-luxury-gold transition-colors text-sm font-light capitalize"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-8 tracking-tight text-[var(--text-primary)]">Project Status</h4>
            <ul className="space-y-3 text-[var(--text-secondary)] text-sm font-light">
              <li className="flex items-center space-x-3">
                <CheckCircle2 size={14} className="text-luxury-gold" />
                <span>DTCP Approved</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 size={14} className="text-luxury-gold" />
                <span>RERA Registered</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 size={14} className="text-luxury-gold" />
                <span>Underground Cabling Complete</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 size={14} className="text-luxury-gold" />
                <span>Clubhouse Construction Started</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-8 tracking-tight text-[var(--text-primary)]">Contact</h4>
            <ul className="space-y-4 text-[var(--text-secondary)] text-sm font-light">
              <li className="flex items-start space-x-4">
                <MapPin size={18} className="text-luxury-gold shrink-0 mt-1" />
                <span>KVR Holdings, Plot # 715, Road #36, Opp. TATA Croma,<br />Jubilee Hills, Hyderabad, Telangana - 500033</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={18} className="text-luxury-gold shrink-0" />
                <span>+91 9966858799</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={18} className="text-luxury-gold shrink-0" />
                <span>ramkyinfra3999@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-[var(--text-secondary)] text-[10px] font-light opacity-50">
            © 2026 Ramky Infra & Developers Pvt Ltd. All Rights Reserved.
          </p>
          <div className="flex space-x-8 text-[var(--text-secondary)] text-[10px] font-light opacity-50">
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

// --- Chat Assistant Component ---
interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  showActions?: boolean;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi, this is Ramky Infra. How can I help you?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = { 
        id: Date.now() + 1, 
        text: "Please ping me on WhatsApp, call us directly, or check our location below.", 
        sender: 'bot',
        showActions: true
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-luxury-gold text-[var(--bg-primary)] flex items-center justify-center shadow-2xl relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse Effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-20 pointer-events-none" />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <div className="glass-card px-4 py-2 rounded-lg text-xs font-medium text-luxury-gold border-luxury-gold/20">
              How can I help you?
            </div>
          </div>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] max-h-[600px] glass-card rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-luxury-gold/10"
          >
            {/* Header */}
            <div className="p-6 bg-luxury-gold/10 border-b border-luxury-gold/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center text-[var(--bg-primary)]">
                <Building2 size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-serif text-[var(--text-primary)]">Ramky Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px] max-h-[400px] scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed text-left ${
                    msg.sender === 'user' 
                      ? 'bg-luxury-gold text-[var(--bg-primary)] rounded-tr-none' 
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-none'
                  }`}>
                    {msg.text}
                    
                    {msg.showActions && (
                      <div className="mt-4 space-y-2">
                        <a 
                          href="https://wa.me/919876543210" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all group/btn"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                          </div>
                          <span className="text-xs font-medium text-[var(--text-primary)] group-hover/btn:text-luxury-gold transition-colors">WhatsApp</span>
                        </a>
                        <a 
                          href="tel:+919876543210" 
                          className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all group/btn"
                        >
                          <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center text-[var(--bg-primary)]">
                            <Phone size={14} />
                          </div>
                          <span className="text-xs font-medium text-[var(--text-primary)] group-hover/btn:text-luxury-gold transition-colors">Call Now</span>
                        </a>
                        <a 
                          href={socialLinks.officeMap}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all group/btn"
                        >
                          <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center text-[var(--bg-primary)]">
                            <MapPin size={14} />
                          </div>
                          <span className="text-xs font-medium text-[var(--text-primary)] group-hover/btn:text-luxury-gold transition-colors">View Location</span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-luxury-gold/5 border-t border-luxury-gold/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full px-6 py-3 text-sm focus:outline-none focus:border-luxury-gold/50 transition-all pr-12 text-[var(--text-primary)]"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-luxury-gold text-[var(--bg-primary)] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-luxury-gold selection:text-luxury-black transition-colors duration-500">
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>
        
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
            {activePage === 'partners' && <PartnersPage />}
            {activePage === 'blogs' && <BlogPage />}
            {activePage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>

        <ExitIntentPopup />

        <Footer setActivePage={setActivePage} />

        <ChatAssistant />
      </div>
    </ThemeProvider>
  );
}

