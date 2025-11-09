import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const BerryClubWebsite = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const formRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Une plateforme e-commerce complète développée pour connecter les artisans locaux avec leurs clients.",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/berryclub/ecommerce",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
      color: "#4FD1C5"
    },
    {
      id: 2,
      title: "AI Healthcare Assistant",
      category: "Artificial Intelligence",
      description: "Assistant virtuel basé sur l'IA pour aider les patients à gérer leurs rendez-vous médicaux.",
      tech: ["Python", "TensorFlow", "Flask"],
      github: "https://github.com/berryclub/ai-healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      color: "#38B2AC"
    },
    {
      id: 3,
      title: "Smart City IoT",
      category: "Internet of Things",
      description: "Système IoT pour la gestion intelligente des ressources urbaines et l'optimisation énergétique.",
      tech: ["Arduino", "Raspberry Pi", "AWS IoT"],
      github: "https://github.com/berryclub/smart-city",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      color: "#2C7A7B"
    },
    {
      id: 4,
      title: "Mobile Learning App",
      category: "Mobile Development",
      description: "Application mobile pour l'apprentissage interactif avec des fonctionnalités de gamification.",
      tech: ["React Native", "Firebase", "Redux"],
      github: "https://github.com/berryclub/mobile-learning",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      color: "#319795"
    }
  ];

  const events = [
    {
      title: "Tech Innovation Summit",
      description: "Une conférence majeure réunissant les leaders de l'innovation technologique et les startups prometteuses.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop"
    },
    {
      title: "Startup Weekend",
      description: "Un week-end intensif pour transformer vos idées en projets concrets avec l'aide de mentors expérimentés.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop"
    },
    {
      title: "AI & Machine Learning Workshop",
      description: "Atelier pratique sur l'intelligence artificielle et l'apprentissage automatique avec des experts du domaine.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop"
    }
  ];

  const sponsors = [
    "Google", "Microsoft", "Meta", "Amazon", "Apple", "Intel", "Samsung", "IBM",
    "Oracle", "Cisco", "Adobe", "Salesforce", "SAP", "Tesla", "SpaceX"
  ];

  const nextEvent = () => setCurrentEvent((prev) => (prev + 1) % events.length);
  const prevEvent = () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'events', 'sponsors', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  // ... (après la fonction scrollToSection)

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setFormStatus('submitting');

    const formData = new FormData(e.target);
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfRc1Km0fiVgpBmZGPXMXuA7LWQJEt5tu3RqtqwZq9S_Us28A/formResponse";

    try {
      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      // Remarque : cette partie (try) peut ne pas être atteinte, 
      // la plupart du temps, le catch s'exécutera.
      
    } catch (error) {
      // Nous nous attendons à une erreur ici,
      // nous la consignons simplement au lieu de définir le statut d'erreur.
      console.log("Erreur 'no-cors' attendue :", error);
    } finally {
      // Ce bloc s'exécute TOUJOURS, que le 'try' ou le 'catch' ait fonctionné.
      // Puisque nous ne pouvons pas vraiment confirmer, nous supposons le succès.
      setFormStatus('success');
      formRef.current.reset(); 

      // Réinitialise le statut après 3 secondes
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };
  return (
    <div style={{ 
      fontFamily: '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a1628',
      color: '#fff',
      overflow: 'hidden'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .project-modal-content::-webkit-scrollbar { display: none; }
      `}</style>

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '15px 50px',
          background: '#0a1628',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(79, 209, 197, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="berryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4FD1C5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#38B2AC', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M100 20 L160 60 L160 140 L100 180 L40 140 L40 60 Z" fill="url(#berryGradient)" />
            <ellipse cx="85" cy="35" rx="12" ry="18" fill="#38B2AC" transform="rotate(-20 85 35)" />
            <ellipse cx="115" cy="30" rx="18" ry="25" fill="#4FD1C5" transform="rotate(15 115 30)" />
            <text x="100" y="125" fontSize="80" fontWeight="900" fill="#0a1628" textAnchor="middle" fontFamily="Inter, sans-serif">B</text>
          </svg>
          <span style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Berry Club</span>
        </div>

        <div style={{ display: 'flex', gap: '40px' }} className="desktop-menu">
          {['home', 'about', 'projects', 'events', 'sponsors', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === section ? '#4FD1C5' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                textTransform: 'capitalize',
                position: 'relative',
                padding: '5px 0',
                transition: 'color 0.3s'
              }}
            >
              {section}
              {activeSection === section && (
                <motion.div
                  layoutId="activeSection"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #4FD1C5, #38B2AC)'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: '#0a1628',
            border: '2px solid rgba(79, 209, 197, 0.3)',
            borderRadius: '8px',
            color: '#4FD1C5',
            cursor: 'pointer',
            fontSize: '28px',
            padding: '8px 12px',
            zIndex: 1002,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)';
            e.currentTarget.style.color = '#0a1628';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 209, 197, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0a1628';
            e.currentTarget.style.color = '#4FD1C5';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 22, 40, 0.3)',
                backdropFilter: 'blur(12px)',
                zIndex: 998
              }}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                top: '80px',
                right: '20px',
                width: '280px',
                maxWidth: '80vw',
                maxHeight: 'calc(100vh - 120px)',
                background: '#0a1628',
                border: '2px solid rgba(79, 209, 197, 0.3)',
                borderRadius: '20px',
                padding: '30px 25px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 1001,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {['home', 'about', 'projects', 'events', 'sponsors', 'contact'].map((section, idx) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ 
                      x: 8,
                      backgroundColor: 'rgba(79, 209, 197, 0.2)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToSection(section);
                      setMenuOpen(false);
                    }}
                    style={{
                      background: activeSection === section ? 'rgba(79, 209, 197, 0.15)' : 'transparent',
                      border: 'none',
                      color: activeSection === section ? '#4FD1C5' : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      textAlign: 'left',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      transition: 'all 0.3s',
                      borderLeft: activeSection === section ? '3px solid #4FD1C5' : '3px solid transparent'
                    }}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(79, 209, 197, 0.2)',
                paddingTop: '25px'
              }}>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#64748b', 
                  marginBottom: '15px',
                  fontWeight: '600',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase'
                }}>
                  Suivez-nous
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { Icon: Linkedin, href: 'https://linkedin.com' },
                    { Icon: Instagram, href: 'https://instagram.com' },
                    { Icon: () => (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    ), href: 'https://discord.com' }
                  ].map(({ Icon, href }, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.15, y: -3, backgroundColor: 'rgba(79, 209, 197, 0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '10px',
                        background: 'rgba(79, 209, 197, 0.1)',
                        border: '1px solid rgba(79, 209, 197, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#4FD1C5',
                        transition: 'all 0.3s'
                      }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section id="home" style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(79, 209, 197, 0.1) 0%, transparent 50%)'
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ 
            textAlign: 'center',
            padding: '0 20px',
            maxWidth: '1200px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.h1 
            style={{ 
              fontSize: 'clamp(48px, 8vw, 120px)',
              fontWeight: '900',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 50%, #2C7A7B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-2px',
              lineHeight: '1.1'
            }}
          >
            WE ACT FOR<br />IMPACT.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ 
              fontSize: 'clamp(18px, 2vw, 24px)',
              maxWidth: '800px',
              margin: '0 auto 40px',
              color: '#cbd5e1',
              lineHeight: '1.8'
            }}
          >
            Berry Club est le premier club étudiant dédié à l'entrepreneuriat,<br />
            l'innovation et aux nouvelles technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: '14px',
              color: '#4FD1C5',
              letterSpacing: '3px',
              marginBottom: '50px'
            }}
          >
            SINCE 2009
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
            style={{
              padding: '18px 40px',
              fontSize: '16px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
              border: 'none',
              borderRadius: '50px',
              color: '#0a1628',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(79, 209, 197, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            Découvrir
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <ChevronDown size={32} color="#4FD1C5" />
        </motion.div>
      </section>

      <section id="about" style={{ 
        padding: '120px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <AboutBlock 
          idx={0} 
          title="Découvrez avec nous"
          text="ETIC est une organisation estudiantine à but non lucratif ayant vu le jour en 2009 à l'École nationale supérieure d'informatique (ex: INI). Sa mission première consiste à rapprocher les étudiants du monde professionnel et de l'entreprenariat à travers divers évènements et activités."
          imageId="1522071820677-9e97e4d07a84"
          isReversed={false}
        />
        <AboutBlock 
          idx={1} 
          title="Notre Mission"
          text="ETIC est une organisation estudiantine à but non lucratif ayant vu le jour en 2009 à l'École nationale supérieure d'informatique (ex: INI). Sa mission première consiste à rapprocher les étudiants du monde professionnel et de l'entreprenariat à travers divers évènements et activités."
          imageId="1542744095-291d1f67b221"
          isReversed={true}
        />
        <AboutBlock 
          idx={2} 
          title="Notre Vision"
          text="ETIC est une organisation estudiantine à but non lucratif ayant vu le jour en 2009 à l'École nationale supérieure d'informatique (ex: INI). Sa mission première consiste à rapprocher les étudiants du monde professionnel et de l'entreprenariat à travers divers évènements et activités."
          imageId="1517245386807-bb43f82c33c4"
          isReversed={false}
        />
      </section>

      <section id="projects" style={{ 
        padding: '120px 50px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(79, 209, 197, 0.03) 50%, transparent 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(79, 209, 197, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            textAlign: 'center',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}>
            Nos Projets Innovants
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '18px', 
            color: '#cbd5e1',
            maxWidth: '800px',
            margin: '0 auto 80px'
          }}>
            Découvrez les projets créatifs et technologiques développés par les membres de Berry Club
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {projects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                idx={idx}
                setActiveProject={setActiveProject}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 22, 40, 0.95)',
                backdropFilter: 'blur(10px)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '700px',
                  width: '90%',
                  maxHeight: '90vh',
                  background: 'linear-gradient(135deg, rgba(15, 30, 50, 0.95) 0%, rgba(10, 22, 40, 0.95) 100%)',
                  borderRadius: '24px',
                  border: `2px solid ${activeProject.color}`,
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px ${activeProject.color}33`,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveProject(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(10, 22, 40, 0.9)',
                    border: `2px solid ${activeProject.color}`,
                    color: activeProject.color,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  ✕
                </motion.button>

                <div style={{
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                className="project-modal-content"
                >
                  <div style={{
                    height: '300px',
                    background: `linear-gradient(180deg, transparent 0%, rgba(10, 22, 40, 0.7) 100%), url(${activeProject.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '30px'
                  }}>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        padding: '10px 20px',
                        background: `${activeProject.color}33`,
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${activeProject.color}`,
                        borderRadius: '50px',
                        fontSize: '14px',
                        color: activeProject.color,
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {activeProject.category}
                    </motion.div>
                  </div>

                  <div style={{ padding: '40px 30px' }}>
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{ 
                        fontSize: 'clamp(28px, 5vw, 40px)', 
                        marginBottom: '20px',
                        background: `linear-gradient(135deg, ${activeProject.color} 0%, #4FD1C5 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '800',
                        lineHeight: '1.2'
                      }}
                    >
                      {activeProject.title}
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      style={{ 
                        fontSize: '17px', 
                        lineHeight: '1.8',
                        color: '#cbd5e1',
                        marginBottom: '30px'
                      }}
                    >
                      {activeProject.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{ marginBottom: '30px' }}
                    >
                      <h4 style={{ 
                        fontSize: '14px', 
                        color: '#94a3b8', 
                        marginBottom: '15px', 
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        Technologies
                      </h4>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {activeProject.tech.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                            style={{
                              padding: '10px 18px',
                              background: `${activeProject.color}11`,
                              border: `1px solid ${activeProject.color}44`,
                              borderRadius: '10px',
                              fontSize: '14px',
                              color: activeProject.color,
                              fontWeight: '600'
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.a
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${activeProject.color}44` }}
                      whileTap={{ scale: 0.98 }}
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 32px',
                        background: `linear-gradient(135deg, ${activeProject.color} 0%, #4FD1C5 100%)`,
                        color: '#0a1628',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        boxShadow: `0 4px 20px ${activeProject.color}33`
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Voir sur GitHub
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="events" style={{ 
        padding: '120px 50px',
        background: 'linear-gradient(180deg, rgba(79, 209, 197, 0.05) 0%, transparent 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '1400px', margin: '0 auto' }}
        >
          <h2 style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            textAlign: 'center',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}>
            Explorez nos événements
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '18px', 
            color: '#cbd5e1',
            maxWidth: '800px',
            margin: '0 auto 80px'
          }}>
            ETIC organise une variété d'événements tels que des conférences, des ateliers et des rencontres avec des professionnels de divers secteurs.
          </p>

          <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(79, 209, 197, 0.05)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(79, 209, 197, 0.2)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{
                  height: '400px',
                  background: `url(${events[currentEvent].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div style={{ padding: '40px' }}>
                  <h3 style={{ 
                    fontSize: '32px', 
                    marginBottom: '15px',
                    color: '#4FD1C5',
                    fontWeight: '600'
                  }}>
                    {events[currentEvent].title}
                  </h3>
                  <p style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.8',
                    color: '#cbd5e1'
                  }}>
                    {events[currentEvent].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevEvent}
              style={{
                position: 'absolute',
                left: '-70px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(79, 209, 197, 0.2)',
                border: '1px solid rgba(79, 209, 197, 0.5)',
                color: '#4FD1C5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextEvent}
              style={{
                position: 'absolute',
                right: '-70px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(79, 209, 197, 0.2)',
                border: '1px solid rgba(79, 209, 197, 0.5)',
                color: '#4FD1C5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            marginTop: '40px' 
          }}>
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentEvent(idx)}
                style={{
                  width: currentEvent === idx ? '40px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: currentEvent === idx ? 'linear-gradient(90deg, #4FD1C5, #38B2AC)' : 'rgba(79, 209, 197, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section id="sponsors" style={{ 
        padding: '120px 0',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px', padding: '0 50px' }}
        >
          <h2 style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}>
            Ils nous ont fait confiance
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            ETIC bénéficie du soutien de nombreux partenaires de renom...
          </p>
        </motion.div>

        {[0, 1, 2].map((rowIdx) => (
          <MarqueeRow key={rowIdx} sponsors={sponsors} direction={rowIdx === 1 ? 'left' : 'right'} />
        ))}
      </section>

      <section id="contact" style={{ 
        padding: '120px 20px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(79, 209, 197, 0.05) 100%)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              Contactez-nous
            </h2>
            
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <Mail size={24} color="#4FD1C5" />
                <span style={{ color: '#cbd5e1', fontSize: '16px' }}>contact@berryclub.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <Phone size={24} color="#4FD1C5" />
                <span style={{ color: '#cbd5e1', fontSize: '16px' }}>+213 555 123 456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <MapPin size={24} color="#4FD1C5" />
                <span style={{ color: '#cbd5e1', fontSize: '16px' }}>ESI, Algiers, Algeria</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1, y: -5 }}
                  href="#"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(79, 209, 197, 0.1)',
                    border: '1px solid rgba(79, 209, 197, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4FD1C5',
                    transition: 'all 0.3s'
                  }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

         <motion.form
          ref={formRef} // AJOUTEZ CECI
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          // SUPPRIMEZ action, method, et target
          onSubmit={handleSubmit} // AJOUTEZ CECI
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
            <input
              type="text"
              name="entry.272286886"
              placeholder="Nom"
              required
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(79, 209, 197, 0.3)',
                background: 'rgba(79, 209, 197, 0.05)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
            />
            <input
              type="email"
              name="entry.959287443"
              placeholder="Email"
              required
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(79, 209, 197, 0.3)',
                background: 'rgba(79, 209, 197, 0.05)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
            />
            <textarea
              name="entry.1231112507"
              placeholder="Message"
              rows={6}
              required
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(79, 209, 197, 0.3)',
                background: 'rgba(79, 209, 197, 0.05)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
<motion.button
            whileHover={{ scale: formStatus === 'submitting' ? 1 : 1.02 }}
            whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.98 }}
            type="submit"
            disabled={formStatus === 'submitting'} // AJOUTEZ CECI
            style={{
              padding: '18px',
              borderRadius: '12px',
              border: 'none',
              // Arrière-plan dynamique
              background: 
                formStatus === 'success' ? 'linear-gradient(135deg, #38B2AC 0%, #2C7A7B 100%)' : 
                formStatus === 'error' ? 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)' :
                'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
              color: '#0a1628',
              fontSize: '16px',
              fontWeight: '600',
              cursor: formStatus === 'submitting' ? 'wait' : 'pointer', // Curseur dynamique
              boxShadow: '0 10px 30px rgba(79, 209, 197, 0.3)',
              opacity: formStatus === 'submitting' ? 0.7 : 1, // Opacité dynamique
              transition: 'all 0.3s ease' // Ajout d'une transition
            }}
          >
            {/* Texte dynamique du bouton */}
            {formStatus === 'idle' && 'Envoyer'}
            {formStatus === 'submitting' && 'Envoi en cours...'}
            {formStatus === 'success' && 'Message envoyé !'}
            {formStatus === 'error' && 'Erreur. Réessayez.'}
          </motion.button>
        </motion.form>
        </div>
      </section>

      <footer style={{
        padding: '40px 50px',
        textAlign: 'center',
        borderTop: '1px solid rgba(79, 209, 197, 0.1)',
        color: '#64748b',
        fontSize: '14px'
      }}>
        <p>© 2025 Berry Club. Tous droits réservés.</p>
        <p style={{ marginTop: '10px' }}>Créé avec passion pour l'innovation et l'entrepreneuriat</p>
      </footer>
    </div>
  );
};

const MarqueeRow = ({ sponsors, direction }) => {
  return (
    <div style={{ 
      overflow: 'hidden', 
      marginBottom: '30px',
      padding: '20px 0'
    }}>
      <motion.div
        animate={{
          x: direction === 'right' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear"
          }
        }}
        style={{
          display: 'flex',
          gap: '60px',
          width: 'fit-content'
        }}
      >
        {[...sponsors, ...sponsors].map((sponsor, idx) => (
          <div
            key={idx}
            style={{
              padding: '20px 40px',
              background: 'rgba(79, 209, 197, 0.05)',
              border: '1px solid rgba(79, 209, 197, 0.2)',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '600',
              color: '#4FD1C5',
              whiteSpace: 'nowrap',
              minWidth: '150px',
              textAlign: 'center'
            }}
          >
            {sponsor}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AboutBlock = ({ idx, title, text, imageId, isReversed }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        marginBottom: '120px'
      }}
    >
      {isReversed ? (
        <>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(79, 209, 197, 0.2)',
              height: '400px',
              background: `url(https://images.unsplash.com/photo-${imageId}?w=600&h=400&fit=crop)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              {title}
            </h2>
            <p style={{ 
              fontSize: '18px', 
              lineHeight: '1.8', 
              color: '#cbd5e1' 
            }}>
              {text}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              {title}
            </h2>
            <p style={{ 
              fontSize: '18px', 
              lineHeight: '1.8', 
              color: '#cbd5e1' 
            }}>
              {text}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(79, 209, 197, 0.2)',
              height: '400px',
              background: `url(https://images.unsplash.com/photo-${imageId}?w=600&h=400&fit=crop)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </>
      )}
    </motion.div>
  );
};

const ProjectCard = ({ project, idx, setActiveProject }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={() => setActiveProject(project)}
      style={{
        background: 'linear-gradient(135deg, rgba(79, 209, 197, 0.05) 0%, rgba(56, 178, 172, 0.02) 100%)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(79, 209, 197, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative'
      }}
    >
      <div style={{
        height: '250px',
        background: `url(${project.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          padding: '8px 16px',
          background: `${project.color}22`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${project.color}66`,
          borderRadius: '20px',
          fontSize: '12px',
          color: project.color,
          fontWeight: '600'
        }}>
          {project.category}
        </div>
      </div>
      <div style={{ padding: '30px' }}>
        <h3 style={{ 
          fontSize: '24px', 
          marginBottom: '12px',
          color: project.color,
          fontWeight: '700'
        }}>
          {project.title}
        </h3>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.7',
          color: '#94a3b8',
          marginBottom: '20px'
        }}>
          {project.description}
        </p>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(79, 209, 197, 0.1)',
            border: '1px solid rgba(79, 209, 197, 0.3)',
            borderRadius: '8px',
            color: '#4FD1C5',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `${project.color}33`,
          border: `2px solid ${project.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: project.color,
          fontSize: '20px',
          fontWeight: 'bold'
        }}
        whileHover={{ scale: 1.1, rotate: 90 }}
      >
        →
      </motion.div>
    </motion.div>
  );
};

export default BerryClubWebsite;