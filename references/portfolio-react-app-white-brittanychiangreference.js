import React, { useState, useEffect } from 'react';

const customStyles = {
  scrollbar: `
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f8fafc;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `,
  fonts: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&family=Fira+Code:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
    
    .serif-font {
      font-family: 'Playfair Display', serif;
    }
    .mono-font {
      font-family: 'Fira Code', monospace;
    }
    
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `
};

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 border-b border-slate-100 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <div className="group cursor-pointer">
          <div className="w-10 h-10 border-2 border-primary rounded text-primary flex items-center justify-center font-bold text-lg hover:bg-primary/5 transition-colors">
            V
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 mono-font text-[13px]">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="group flex items-center gap-1 hover:text-primary transition-colors">
            <span className="text-primary">01.</span>
            <span className="text-slate-600 group-hover:text-primary transition-colors">About</span>
          </a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="group flex items-center gap-1 hover:text-primary transition-colors">
            <span className="text-primary">02.</span>
            <span className="text-slate-600 group-hover:text-primary transition-colors">Experience</span>
          </a>
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="group flex items-center gap-1 hover:text-primary transition-colors">
            <span className="text-primary">03.</span>
            <span className="text-slate-600 group-hover:text-primary transition-colors">Work</span>
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="group flex items-center gap-1 hover:text-primary transition-colors">
            <span className="text-primary">04.</span>
            <span className="text-slate-600 group-hover:text-primary transition-colors">Contact</span>
          </a>
          <a href="#" className="px-5 py-2.5 border border-primary text-primary rounded text-[13px] hover:bg-primary/5 transition-colors ml-4 font-medium">
            Resume
          </a>
        </nav>

        <button 
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu_open</span>
        </button>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto animate-fade-in-up">
      <p className="mono-font text-primary mb-5 ml-1 font-medium">Hi, my name is</p>
      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tight">Variant Designer.</h1>
      <h2 className="text-4xl md:text-7xl font-bold text-slate-400 mb-8 tracking-tight">I build things for the web.</h2>
      <p className="max-w-xl text-lg text-slate-600 leading-relaxed mb-12">
        I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at <span className="text-primary cursor-pointer hover:underline">Tech Corp</span>.
      </p>
      <div>
        <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="inline-block border border-primary text-primary px-8 py-4 rounded hover:bg-primary/5 transition-colors mono-font text-sm font-semibold">Check out my work!</a>
      </div>
    </section>
  );
};

const FeaturedProject = ({ title, description, technologies, imageUrl, github, external, featured, alignment = 'left' }) => {
  const isLeft = alignment === 'left';
  
  return (
    <div className={`relative group grid grid-cols-1 lg:grid-cols-12 gap-0 items-center`}>
      <div className={`lg:col-span-7 ${!isLeft ? 'lg:col-start-6 order-1 lg:order-2' : ''} overflow-hidden rounded-xl shadow-xl relative z-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-primary/10`}>
        <a href={external || '#'} className="block w-full h-full relative cursor-pointer">
          <div className="absolute inset-0 bg-primary/10 hover:bg-transparent transition-all duration-300 z-20 hidden lg:block rounded-xl mix-blend-multiply"></div>
          <div className="aspect-video bg-slate-100 border border-slate-200 flex items-center justify-center relative rounded-xl overflow-hidden">
            <img 
              alt={title} 
              className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0" 
              src={imageUrl}
            />
          </div>
        </a>
      </div>

      <div className={`lg:col-span-5 ${!isLeft ? 'lg:col-start-1 lg:-mr-12 order-2 lg:order-1' : 'lg:-ml-12'} relative z-20 mt-8 lg:mt-0 ${isLeft ? 'text-left lg:text-right' : 'text-left'} pointer-events-none`}>
        <div className="pointer-events-auto">
          <p className="mono-font text-xs text-primary mb-2 font-bold tracking-widest uppercase">{featured || 'Featured Project'}</p>
          <h3 className="text-3xl font-bold mb-4 text-slate-900 hover:text-primary transition-colors">
            <a href={external || '#'}>{title}</a>
          </h3>
          <div className={`bg-white p-6 rounded-lg shadow-lg border border-slate-100 mb-6 ${isLeft ? 'lg:text-left' : 'text-left'} text-sm md:text-base hover:shadow-xl transition-shadow duration-300`}>
            <p className="text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>
          <div className={`flex flex-wrap ${isLeft ? 'lg:justify-end' : 'justify-start'} gap-x-5 gap-y-2 mono-font text-xs text-slate-500 mb-8 font-medium`}>
            {technologies.map((tech, index) => (
              <span key={index}>{tech}</span>
            ))}
          </div>
          <div className={`flex ${isLeft ? 'lg:justify-end' : 'justify-start'} gap-5 text-slate-400 items-center`}>
            {github && (
              <a className="hover:text-primary transition-colors transform hover:-translate-y-1" href={github} aria-label="Github">
                <span className="material-symbols-outlined text-[22px]">code</span>
              </a>
            )}
            {external && (
              <a className="hover:text-primary transition-colors transform hover:-translate-y-1" href={external} aria-label="External Link">
                <span className="material-symbols-outlined text-[22px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, technologies, github, external }) => {
  return (
    <div className="bg-slate-50 p-8 rounded-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group cursor-pointer">
      <div className="flex justify-between items-center mb-8">
        <span className="material-symbols-outlined text-4xl text-primary">folder_open</span>
        <div className="flex gap-4">
          {github && (
            <a href={github} className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl text-slate-400 hover:text-primary">code</span>
            </a>
          )}
          {external && (
            <a href={external} className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl text-slate-400 hover:text-primary">open_in_new</span>
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-1">{description}</p>
      <div className="flex gap-3 text-xs mono-font text-slate-400 font-medium">
        {technologies.map((tech, index) => (
          <span key={index}>{tech}</span>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const featuredProjects = [
    {
      title: 'Punto de Oro',
      description: (
        <>
          A marketplace for professionals in <span className="text-primary">padel</span>. We connect amateur padel players with professional players and coaches to bridge the gap in high-performance training. Includes real-time booking, payment processing, and profile management.
        </>
      ),
      technologies: ['Webflow', 'Airtable', 'Jira', 'Stripe'],
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      github: '#',
      external: '#',
      alignment: 'left'
    },
    {
      title: 'Halcyon Theme',
      description: (
        <>
          A minimal, dark blue theme for <span className="text-primary">VS Code</span>, Sublime Text, and more. Endorsed by the exorbitant amount of hours I spend coding at night. Over 200k+ installs and maintaining a 5-star rating.
        </>
      ),
      technologies: ['VS Code', 'Sublime Text', 'JSON', 'tmTheme'],
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      github: '#',
      external: '#',
      alignment: 'right'
    },
    {
      title: 'Spotify Profile',
      description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information of each track. Create and save new playlists of recommended tracks based on your existing data.',
      technologies: ['React', 'Express', 'Spotify API', 'Heroku'],
      imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2074&auto=format&fit=crop',
      github: '#',
      external: '#',
      alignment: 'left'
    }
  ];

  return (
    <div id="experience" className="max-w-6xl mx-auto space-y-24 mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="serif-font text-3xl md:text-4xl font-bold text-slate-900 flex items-center">
          <span className="mono-font text-primary text-xl md:text-2xl mr-3 font-normal">02.</span>
          Experience
        </h2>
        <div className="h-px flex-1 ml-8 bg-slate-200 hidden md:block"></div>
      </div>

      {featuredProjects.map((project, index) => (
        <FeaturedProject key={index} {...project} />
      ))}
    </div>
  );
};

const WorkSection = () => {
  const [showMore, setShowMore] = useState(false);

  const projects = [
    {
      title: 'Time to Have More Fun',
      description: 'A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS.',
      technologies: ['Next.js', 'Firebase', 'Tailwind'],
      external: '#'
    },
    {
      title: 'Integrating Algolia Search',
      description: 'Building a custom documentation site with Algolia search integration for a fast, reliable search experience.',
      technologies: ['Algolia', 'WordPress', 'PHP'],
      github: '#'
    },
    {
      title: 'Google Keep Clone',
      description: 'A simple Google Keep clone built with Vue3 and Firebase to practice state management.',
      technologies: ['Vue 3', 'Firebase', 'Pinia'],
      external: '#'
    }
  ];

  return (
    <section id="work" className="max-w-6xl mx-auto py-32">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Other Noteworthy Projects</h2>
        <a href="#" className="mono-font text-primary text-sm hover:underline font-medium">view the archive</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <button 
          onClick={() => setShowMore(!showMore)}
          className="inline-block border border-primary text-primary px-8 py-4 rounded hover:bg-primary/5 transition-colors mono-font text-sm font-semibold"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="max-w-2xl mx-auto text-center py-24 mb-16">
      <p className="mono-font text-primary mb-5 font-medium">04. What's Next?</p>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Get In Touch</h2>
      <p className="text-slate-600 text-lg leading-relaxed mb-12">
        Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
      <a href="mailto:hello@example.com" className="inline-block border border-primary text-primary px-8 py-4 rounded hover:bg-primary/5 transition-colors mono-font text-sm font-semibold">
        Say Hello
      </a>
    </section>
  );
};

const SocialSidebar = () => {
  return (
    <div className="hidden md:block fixed left-6 lg:left-12 bottom-0 w-10 z-10">
      <div className="flex flex-col items-center gap-6 text-slate-400 after:content-[''] after:w-[1px] after:h-24 after:bg-slate-300 after:mt-6">
        <a href="#" className="hover:text-primary hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
        </a>
        <a href="#" className="hover:text-primary hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a href="#" className="hover:text-primary hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

const EmailSidebar = () => {
  return (
    <div className="hidden md:block fixed right-6 lg:right-12 bottom-0 w-10 z-10">
      <div className="flex flex-col items-center gap-6 text-slate-400 after:content-[''] after:w-[1px] after:h-24 after:bg-slate-300 after:mt-6">
        <a href="mailto:variant@example.com" className="mono-font text-xs tracking-widest hover:text-primary hover:-translate-y-1 transition-all" style={{ writingMode: 'vertical-rl' }}>
          variant@example.com
        </a>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="text-center py-6 text-slate-400 text-[13px] mono-font hover:text-primary transition-colors cursor-pointer bg-white relative z-20">
      <p className="mb-2">Designed & Built by Variant</p>
      <div className="flex justify-center gap-4 md:hidden mb-4">
        <span className="material-symbols-outlined">code</span>
        <span className="material-symbols-outlined">alternate_email</span>
      </div>
    </footer>
  );
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles.scrollbar + customStyles.fonts;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="bg-white text-slate-700 min-h-screen selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24">
        <HeroSection />
        <ExperienceSection />
        <WorkSection />
        <ContactSection />
      </main>

      <SocialSidebar />
      <EmailSidebar />
      <Footer />
    </div>
  );
};

export default App;