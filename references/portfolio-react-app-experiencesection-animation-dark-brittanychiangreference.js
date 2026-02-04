import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const customStyles = {
  body: {
    backgroundColor: '#0a192f',
    color: '#8892b0',
  }
};

const ProjectCard = ({ project, isReversed }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
      <div 
        className={`lg:col-span-7 overflow-hidden rounded-xl shadow-2xl relative z-10 transition-transform duration-500 group-hover:-translate-y-2 bg-navy-800 ${isReversed ? 'order-1 lg:order-2' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a 
          href="#" 
          className="block w-full h-full relative after:content-[''] after:absolute after:inset-0 after:bg-blue-900/40 after:hover:bg-transparent after:transition-all after:duration-300 cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          <div className="aspect-video bg-[#0d1b2a] flex items-center justify-center overflow-hidden">
            <img 
              alt={`${project.title} Screenshot`}
              className={`w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-300 ${isHovered ? 'opacity-100 filter-none' : 'opacity-90 filter grayscale'}`}
              src={project.image}
            />
          </div>
        </a>
      </div>

      <div className={`lg:col-span-5 ${isReversed ? 'lg:-mr-12 order-2 lg:order-1' : 'lg:-ml-12'} relative z-20 mt-8 lg:mt-0 text-left ${isReversed ? 'lg:text-left' : 'lg:text-right'} pointer-events-none`}>
        <div className="pointer-events-auto">
          <p className="mono-font text-xs text-blue-400 mb-2 font-bold tracking-widest uppercase">Featured Project</p>
          <h3 className="text-3xl font-bold mb-4 text-slate-100 hover:text-blue-400 transition-colors">
            <a href="#" onClick={(e) => e.preventDefault()}>{project.title}</a>
          </h3>
          
          <div className={`bg-navy-800 p-6 rounded-lg shadow-xl mb-6 ${isReversed ? 'text-left' : 'lg:text-left'} hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-500/30`}>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              {project.description}
            </p>
          </div>

          <div className={`flex flex-wrap ${isReversed ? 'lg:justify-start' : 'lg:justify-end'} gap-x-5 gap-y-2 mono-font text-xs text-slate-400 mb-6`}>
            {project.technologies.map((tech, index) => (
              <span key={index}>{tech}</span>
            ))}
          </div>

          <div className={`flex ${isReversed ? 'lg:justify-start' : 'lg:justify-end'} gap-5 text-slate-300`}>
            <a 
              className="hover:text-blue-400 transition-all hover:-translate-y-1" 
              href="#" 
              aria-label="GitHub Repo"
              onClick={(e) => e.preventDefault()}
            >
              <span className="material-symbols-outlined text-[22px]">code</span>
            </a>
            <a 
              className="hover:text-blue-400 transition-all hover:-translate-y-1" 
              href="#" 
              aria-label="External Link"
              onClick={(e) => e.preventDefault()}
            >
              <span className="material-symbols-outlined text-[22px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperiencePage = () => {
  const projects = [
    {
      title: 'Punto de Oro',
      description: 'A marketplace for professionals in padel. We connect amateur padel players with professional players and coaches to bridge the gap in high-performance training. Built a custom booking engine and integrated real-time court availability.',
      technologies: ['Webflow', 'Airtable', 'Jira', 'Stripe Connect'],
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop',
      isReversed: false
    },
    {
      title: 'Halcyon Theme',
      description: 'A minimal, dark blue theme for VS Code, Sublime Text, and Atom. Designed to be easy on the eyes for long coding sessions while maintaining high contrast for syntax highlighting. Includes support for popular frameworks and file icons.',
      technologies: ['VS Code', 'Sublime Text', 'Atom', 'JSON', 'Design'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      isReversed: true
    },
    {
      title: 'Spotify Profile',
      description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis of each track. Create and save new playlists of recommended tracks based on your existing taste.',
      technologies: ['React', 'Express', 'Spotify API', 'Styled Components'],
      image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1974&auto=format&fit=crop',
      isReversed: false
    },
    {
      title: 'Netflux',
      description: 'A content streaming platform clone with a focus on high-performance video delivery and a responsive user interface. Features include user authentication, my list functionality, and genre-based categorization with smooth infinite scrolling.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop',
      isReversed: true
    }
  ];

  return (
    <main className="w-full px-6 py-20 md:px-12 lg:px-24 max-w-[1400px] mx-auto animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="mono-font text-blue-400 text-2xl font-bold">02.</span>
            <h2 className="serif-font text-4xl font-bold text-slate-100">Experience</h2>
          </div>
          <div className="h-px flex-1 mx-8 bg-slate-700 hidden md:block opacity-40"></div>
        </div>

        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} isReversed={project.isReversed} />
        ))}
      </div>

      <div className="mt-40 text-center text-slate-500 mono-font text-sm">
        <p className="mb-2 hover:text-blue-400 cursor-pointer transition-colors">Designed &amp; Built by Variant</p>
        <p>© 2024</p>
      </div>
    </main>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .serif-font { font-family: 'Playfair Display', serif; }
      .mono-font { font-family: 'Fira Code', monospace; }
      
      body {
        background-color: #0a192f;
        color: #8892b0;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }

      .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }
    `;
    document.head.appendChild(style);

    const fontLink1 = document.createElement('link');
    fontLink1.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@700&family=Fira+Code:wght@400;600&display=swap';
    fontLink1.rel = 'stylesheet';
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement('link');
    fontLink2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
    fontLink2.rel = 'stylesheet';
    document.head.appendChild(fontLink2);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontLink1);
      document.head.removeChild(fontLink2);
    };
  }, []);

  return (
    <Router basename="/">
      <div className="w-full min-h-screen selection:bg-blue-300 selection:text-blue-900 overflow-x-hidden antialiased" style={customStyles.body}>
        <Routes>
          <Route path="/" element={<ExperiencePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;