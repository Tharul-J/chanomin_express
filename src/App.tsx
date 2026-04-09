import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, Mail, Clock, Star, ChefHat, 
  UtensilsCrossed, Menu as MenuIcon, X, ChevronRight,
  Facebook, MessageCircle, Flame, ExternalLink
} from 'lucide-react';
import { signatureDishes, menuCategories, reviews, features, galleryImages, videoReviews, storyImages } from './data';
import { Logo } from './components/Logo';

const heroImages = galleryImages.map(img => img.src);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStorySlide, setCurrentStorySlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    const storySlideTimer = setInterval(() => {
      setCurrentStorySlide((prev) => (prev + 1) % storyImages.length);
    }, 4000);
    
    const reviewTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);

    const gallerySlideTimer = setInterval(() => {
      setCurrentGallerySlide((prev) => (prev + 1) % galleryImages.length);
    }, 4500);

    return () => {
      clearInterval(slideTimer);
      clearInterval(storySlideTimer);
      clearInterval(reviewTimer);
      clearInterval(gallerySlideTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-red-600 selection:text-white relative">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=80" 
          alt="Dark Restaurant Background" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Floating Social Button */}
      <a 
        href="https://facebook.com/ChanominExpress" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#1877F2]/80 backdrop-blur-md text-white p-3 rounded-l-2xl shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:bg-[#1877F2] hover:pr-6 transition-all duration-300 flex items-center gap-3 group border border-r-0 border-white/20"
      >
        <Facebook className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-500 font-bold">
          Join our FB!
        </span>
      </a>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <Logo className="w-12 h-12" />
              <span className="text-2xl font-bold text-white tracking-tight">CHANOMIN <span className="text-red-600">EXPRESS</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Our Story', 'Signature Dishes', 'Menu', 'Gallery', 'Reviews'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-zinc-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105"
              >
                Order Now
              </button>
            </div>

            <button 
              className="md:hidden text-zinc-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
              className="md:hidden bg-black/60 backdrop-blur-md border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {['Our Story', 'Signature Dishes', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="block w-full text-left text-zinc-300 hover:text-white font-medium text-lg"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-zinc-950">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              src={heroImages[currentSlide]}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center mt-12 lg:mt-0">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-red-500 font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5" /> Best Chinese Restaurant in Gampaha
              </h2>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">
                CHANOMIN<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">EXPRESS.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl font-light">
                Experience the authentic taste of Sri Lankan-Chinese & Mongolian BBQ. 
                Famous for our Hot Butter Cuttlefish.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2"
                >
                  Explore Menu <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2"
                >
                  Order Delivery <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Auto-sliding Gallery Marquee at the bottom of Hero */}
        <div className="relative z-10 w-full overflow-hidden pb-8 pt-12 mt-auto">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />
          
          <motion.div 
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {[...galleryImages, ...galleryImages].map((img, idx) => (
              <div key={idx} className="w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Storefront Banner */}
      <section className="pt-16 pb-4 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-64 md:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group"
          >
            {/* Storefront Image */}
            <img 
              src="/images/store.png" 
              alt="Chanomin Express Storefront" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Welcome to <span className="text-red-500">Chanomin Express</span></h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story & Features */}
      <section id="our-story" className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white tracking-tight">From a Humble Stall to a <span className="text-red-500">Culinary Landmark</span></h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Chanomin Express began its journey approximately two decades ago under the name "Sensuchi Express" — a humble roadside food operation in the heart of Gampaha town.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                By 2014, we formally rebranded as Chanomin Express. Today, we stand as a modern multi-story restaurant with an open kitchen concept, built on a story of consistent quality, community trust, and culinary ambition.
              </p>
              
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-red-500/20 p-1 rounded-full border border-red-500/30">
                      <Star className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    <span className="text-zinc-200 font-medium">{feature.split('—')[0]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentStorySlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    src={storyImages[currentStorySlide]} 
                    alt="Chanomin Express Restaurant" 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-black/60 backdrop-blur-md border border-white/10 text-white p-8 rounded-3xl shadow-xl max-w-xs">
                <ChefHat className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Open Kitchen Concept</h3>
                <p className="text-zinc-400 text-sm">Watch your meal being prepared live with complete transparency.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section id="signature-dishes" className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Signature <span className="text-red-500">Dishes</span></h2>
            <p className="text-lg text-zinc-400">The undisputed champions of our menu, praised by thousands of loyal patrons across the Western Province.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-white/20 transition-all group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm">
                    {dish.name.includes('Cuttlefish') ? '⭐ Flagship' : 'Popular'}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{dish.name}</h3>
                  <p className="text-zinc-400 mb-6 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500 font-bold">{dish.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu */}
      <section id="menu" className="py-24 bg-transparent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Explore Our <span className="text-red-500">Menu</span></h2>
            <p className="text-lg text-zinc-400">Authentic Sri Lankan-Chinese recipes crafted with local spice intelligence.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Category Tabs */}
            <div className="lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 hide-scrollbar">
              {menuCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMenuTab(idx)}
                  className={`whitespace-nowrap text-left px-6 py-4 rounded-2xl font-medium transition-all border ${
                    activeMenuTab === idx 
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' 
                      : 'bg-black/40 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white hover:border-white/10'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMenuTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col xl:flex-row gap-8 shadow-2xl"
                >
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-8 text-white border-b border-white/10 pb-4">
                      {menuCategories[activeMenuTab].category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {menuCategories[activeMenuTab].items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-baseline border-b border-white/10 pb-4 border-dashed group">
                          <span className="text-lg font-medium text-zinc-200 pr-4 group-hover:text-red-400 transition-colors">{item.name}</span>
                          <span className="text-red-500 font-bold whitespace-nowrap">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden xl:block w-1/3 relative rounded-2xl overflow-hidden group">
                    <img 
                      src={menuCategories[activeMenuTab].image} 
                      alt={menuCategories[activeMenuTab].category}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent opacity-80"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Featured
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
            >
              Visual <span className="text-red-500">Feast</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-400"
            >
              A glimpse into our kitchen, our signature dishes, and the Chanomin experience.
            </motion.p>
          </div>

          {/* Dynamic Changing Image Card */}
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl group">
              <AnimatePresence>
                <motion.img
                  key={currentGallerySlide}
                  src={galleryImages[currentGallerySlide].src}
                  alt={galleryImages[currentGallerySlide].alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Overlay & Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${currentGallerySlide}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="w-12 h-1 bg-red-500 mb-4 rounded-full"></div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg tracking-tight">
                      {galleryImages[currentGallerySlide].alt}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 flex flex-wrap justify-end gap-2 z-20 max-w-[50%]">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentGallerySlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentGallerySlide ? 'w-8 bg-red-500' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Delivery */}
      <section id="reviews" className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Delivery Info */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-white mb-6">At Your Doorstep</h2>
              <p className="text-zinc-400 text-lg mb-10 max-w-md">
                Craving the heat but want to stay in? We partner with the best to bring the fire to you.
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <a href="https://www.ubereats.com/lk/store/chanomin-express/..." target="_blank" rel="noreferrer" className="text-white font-bold hover:text-red-500 transition-colors">Uber Eats</a>
                <a href="https://pickme.lk/food/..." target="_blank" rel="noreferrer" className="text-white font-bold hover:text-red-500 transition-colors">PickMe Food</a>
                <a href="https://wa.me/94717025978" target="_blank" rel="noreferrer" className="text-white font-bold hover:text-red-500 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Review Slider */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -top-6 -left-6 bg-orange-500 text-black p-4 rounded-xl z-10 shadow-lg">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="bg-black/60 backdrop-blur-md p-10 rounded-3xl border border-white/10 relative overflow-hidden min-h-[320px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-xl text-zinc-300 italic font-serif mb-8 leading-relaxed">
                      "{reviews[currentReview].text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center text-zinc-500 font-bold text-xl">
                        {reviews[currentReview].author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{reviews[currentReview].author}</p>
                        <p className="text-sm text-zinc-500">Google Local Guide • Verified Review</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Customer <span className="text-red-500">Spotlight</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">Watch real reactions and reviews from our amazing customers</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoReviews.map((video, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 aspect-[9/16] relative group"
              >
                <iframe 
                  src={video.url} 
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="bg-black/60 backdrop-blur-lg text-white pt-24 pb-12 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-8">Visit or <span className="text-red-500">Order Now</span></h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-full text-red-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Location</h4>
                    <p className="text-zinc-400 leading-relaxed">
                      No. 52, Bauddhaloka Mawatha,<br />
                      Gampaha, Sri Lanka<br />
                      <span className="text-sm text-zinc-500 mt-1 block">Next to Cargills Food City. Roadside parking available.</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-full text-red-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Hours</h4>
                    <p className="text-zinc-400">Lunch & Dinner — Open Daily</p>
                    <p className="text-green-400 font-medium text-sm mt-1">Always Open</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-full text-red-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Contact & Delivery</h4>
                    <p className="text-zinc-400 mb-1">Primary: <a href="tel:0332228123" className="hover:text-white transition-colors">033 222 8123</a></p>
                    <p className="text-zinc-400 mb-4">WhatsApp: <a href="https://wa.me/94717025978" className="hover:text-white transition-colors">071 702 5978</a></p>
                    
                    <div className="flex flex-wrap gap-3">
                      <a href="https://www.ubereats.com/lk/store/chanomin-express/..." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#06C167]/20 border border-[#06C167]/50 text-[#06C167] hover:bg-[#06C167] hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all">
                        Uber Eats
                      </a>
                      <a href="https://pickme.lk/food/..." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#E31E24]/20 border border-[#E31E24]/50 text-[#E31E24] hover:bg-[#E31E24] hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all">
                        PickMe Food
                      </a>
                      <a href="https://wa.me/94717025978" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-2 overflow-hidden h-[400px] lg:h-auto relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7918.583214808621!2d79.99927589416895!3d7.092157721643809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fbbe8ae0094d%3A0x234affd4ae54e16e!2sChanomin%20Express!5e0!3m2!1sen!2slk!4v1775491748548!5m2!1sen!2slk" 
                className="w-full h-full rounded-2xl" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <Logo className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight">CHANOMIN <span className="text-red-500">EXPRESS</span></span>
              </div>
              <p className="text-zinc-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Chanomin Express. All rights reserved.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-zinc-300 text-sm font-medium">Operating Hours: <span className="text-green-400">Open Daily (24/7)</span></span>
              </div>
              <div className="flex gap-4">
                <a href="https://facebook.com/ChanominExpress" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="mailto:chanomindin@gmail.com" className="text-zinc-500 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
