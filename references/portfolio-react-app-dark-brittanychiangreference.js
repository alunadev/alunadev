import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const customStyles = {
  scrollbar: `
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0a192f;
    }
    ::-webkit-scrollbar-thumb {
      background: #475569;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #64748b;
    }
  `,
  fadeInUp: `
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0a192f]/90 backdrop-blur-md shadow-sm transition-all duration-300 border-b border-transparent dark:border-slate-800/50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <div className="group cursor-pointer">
          <div className="w-10 h-10 border-2 border-blue-500 rounded text-blue-500 flex items-center justify-center font-bold text-lg hover:bg-blue-500/10 transition-colors">
            V
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-mono text-[13px]">
          <a href="#about" className="group flex items-center gap-1 hover:text-blue-500 transition-colors">
            <span className="text-blue-500">01.</span>
            <span className="dark:text-slate-200 group-hover:text-blue-500 transition-colors">About</span>
          </a>
          <a href="#experience" className="group flex items-center gap-1 hover:text-blue-500 transition-colors">
            <span className="text-blue-500">02.</span>
            <span className="dark:text-slate-200 group-hover:text-blue-500 transition-colors">Experience</span>
          </a>
          <a href="#work" className="group flex items-center gap-1 hover:text-blue-500 transition-colors">
            <span className="text-blue-500">03.</span>
            <span className="dark:text-slate-200 group-hover:text-blue-500 transition-colors">Work</span>
          </a>
          <a href="#contact" className="group flex items-center gap-1 hover:text-blue-500 transition-colors">
            <span className="text-blue-500">04.</span>
            <span className="dark:text-slate-200 group-hover:text-blue-500 transition-colors">Contact</span>
          </a>
          <a href="#" className="px-5 py-2.5 border border-blue-500 text-blue-500 rounded text-[13px] hover:bg-blue-500/10 transition-colors ml-4">
            Resume
          </a>
        </nav>

        <button 
          className="md:hidden text-blue-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu_open</span>
        </button>
      </div>
    </div>
  );
};

const FeaturedProject = ({ title, description, tags, imageUrl, reverse, featured = "Featured Project" }) => {
  return (
    <div className={`relative group grid grid-cols-1 lg:grid-cols-12 gap-0 items-center ${reverse ? '' : ''}`}>
      <div className={`lg:col-span-7 ${reverse ? 'lg:col-start-6 order-1 lg:order-2' : 'order-1'} overflow-hidden rounded-xl shadow-2xl relative z-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-blue-500/20`}>
        <a href="#" className="block w-full h-full relative cursor-pointer">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-900/40 hover:bg-transparent transition-all duration-300 z-20 hidden lg:block rounded-xl mix-blend-multiply"></div>
          <div className="aspect-video bg-[#0d1b2a] border border-slate-700/50 flex items-center justify-center relative rounded-xl overflow-hidden">
            <img 
              alt={title} 
              className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0" 
              src={imageUrl}
            />
          </div>
        </a>
      </div>

      <div className={`lg:col-span-5 ${reverse ? 'lg:col-start-1 lg:-mr-12 order-2 lg:order-1 text-left' : 'lg:-ml-12 order-2 text-left lg:text-right'} relative z-20 mt-8 lg:mt-0 pointer-events-none`}>
        <div className="pointer-events-auto">
          <p className="font-mono text-xs text-blue-500 mb-2 font-bold tracking-widest uppercase">{featured}</p>
          <h3 className="text-3xl font-bold mb-4 dark:text-white hover:text-blue-500 transition-colors">
            <a href="#">{title}</a>
          </h3>
          
          <div className={`bg-white dark:bg-[#112240] p-6 rounded-lg shadow-xl mb-6 ${reverse ? 'text-left' : 'lg:text-left'} text-sm md:text-base hover:shadow-2xl transition-shadow duration-300`}>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}>
            </p>
          </div>

          <div className={`flex flex-wrap ${reverse ? 'justify-start' : 'lg:justify-end'} gap-x-5 gap-y-2 font-mono text-xs text-slate-500 dark:text-slate-400 mb-8 font-medium`}>
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>

          <div className={`flex ${reverse ? 'justify-start' : 'lg:justify-end'} gap-5 text-slate-400 items-center`}>
            <a className="hover:text-blue-500 dark:hover:text-blue-500 transition-colors transform hover:-translate-y-1" href="#" aria-label="Github">
              <span className="material-symbols-outlined text-[22px]">code</span>
            </a>
            <a className="hover:text-blue-500 dark:hover:text-blue-500 transition-colors transform hover:-translate-y-1" href="#" aria-label="External Link">
              <span className="material-symbols-outlined text-[22px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tags, hasGithub = false, hasExternal = true }) => {
  return (
    <div className="bg-white dark:bg-[#112240] p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group cursor-pointer">
      <div className="flex justify-between items-center mb-8">
        <span className="material-symbols-outlined text-4xl text-blue-500">folder_open</span>
        <div className="flex gap-4">
          {hasGithub && (
            <span className="material-symbols-outlined text-xl text-slate-400 hover:text-blue-500">code</span>
          )}
          {hasExternal && (
            <span className="material-symbols-outlined text-xl text-slate-400 hover:text-blue-500">open_in_new</span>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold dark:text-slate-200 mb-2 group-hover:text-blue-500 transition-colors">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6 flex-1">
        {description}
      </p>
      <div className="flex gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

const SocialSidebar = () => {
  return (
    <div className="hidden md:block fixed left-6 lg:left-12 bottom-0 w-10 z-10">
      <div className="flex flex-col items-center gap-6 text-slate-400 after:content-[''] after:w-[1px] after:h-24 after:bg-slate-400 after:mt-6">
        <a href="#" className="hover:text-blue-500 hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
        </a>
        <a href="#" className="hover:text-blue-500 hover:-translate-y-1 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a href="#" className="hover:text-blue-500 hover:-translate-y-1 transition-all">
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
      <div className="flex flex-col items-center gap-6 text-slate-400 after:content-[''] after:w-[1px] after:h-24 after:bg-slate-400 after:mt-6">
        <a 
          href="mailto:variant@example.com" 
          className="font-mono text-xs tracking-widest hover:text-blue-500 hover:-translate-y-1 transition-all" 
          style={{ writingMode: 'vertical-rl' }}
        >
          variant@example.com
        </a>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="text-center py-6 text-slate-500 dark:text-slate-400 text-[13px] font-mono hover:text-blue-500 transition-colors cursor-pointer bg-white dark:bg-[#0a192f] relative z-20">
      <p className="mb-2">Designed & Built by Variant</p>
      <div className="flex justify-center gap-4 md:hidden mb-4">
        <span className="material-symbols-outlined">code</span>
        <span className="material-symbols-outlined">alternate_email</span>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const featuredProjects = [
    {
      title: "Punto de Oro",
      description: 'A marketplace for professionals in <span class="text-blue-500">padel</span>. We connect amateur padel players with professional players and coaches to bridge the gap in high-performance training. Includes real-time booking, payment processing, and profile management.',
      tags: ["Webflow", "Airtable", "Jira", "Stripe"],
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      reverse: false
    },
    {
      title: "Halcyon Theme",
      description: 'A minimal, dark blue theme for <span class="text-blue-500">VS Code</span>, Sublime Text, and more. Endorsed by the exorbitant amount of hours I spend coding at night. Over 200k+ installs and maintaining a 5-star rating.',
      tags: ["VS Code", "Sublime Text", "JSON", "tmTheme"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      reverse: true
    },
    {
      title: "Spotify Profile",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information of each track. Create and save new playlists of recommended tracks based on your existing data.",
      tags: ["React", "Express", "Spotify API", "Heroku"],
      imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2074&auto=format&fit=crop",
      reverse: false
    }
  ];

  const otherProjects = [
    {
      title: "Time to Have More Fun",
      description: "A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS.",
      tags: ["Next.js", "Firebase", "Tailwind"],
      hasExternal: true,
      hasGithub: false
    },
    {
      title: "Integrating Algolia Search",
      description: "Building a custom documentation site with Algolia search integration for a fast, reliable search experience.",
      tags: ["Algolia", "WordPress", "PHP"],
      hasExternal: false,
      hasGithub: true
    },
    {
      title: "Google Keep Clone",
      description: "A simple Google Keep clone built with Vue3 and Firebase to practice state management.",
      tags: ["Vue 3", "Firebase", "Pinia"],
      hasExternal: true,
      hasGithub: false
    },
    {
      title: "Apple Music Embed",
      description: "A widget to embed Apple Music playlists directly into your React application with a custom skin.",
      tags: ["React", "MusicKit JS"],
      hasExternal: true,
      hasGithub: false
    },
    {
      title: "Hyperion Tech",
      description: "Marketing site for a high-tech manufacturing firm, focusing on 3D visualizations and performance.",
      tags: ["Gatsby", "Three.js", "Emotion"],
      hasExternal: false,
      hasGithub: true
    },
    {
      title: "Personal API",
      description: "A centralized API to manage my personal data across different platforms and portfolio projects.",
      tags: ["Node.js", "Express", "MongoDB"],
      hasExternal: true,
      hasGithub: false
    }
  ];

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24">
        <section id="about" className="min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto animate-fade-in-up">
          <p className="font-mono text-blue-500 mb-5 ml-1">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-slate-200 mb-4 tracking-tight">Variant Designer.</h1>
          <h2 className="text-4xl md:text-7xl font-bold text-slate-500 dark:text-slate-400 mb-8 tracking-tight">I build things for the web.</h2>
          <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
            I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at <span className="text-blue-500 cursor-pointer hover:underline">Tech Corp</span>.
          </p>
          <div>
            <a href="#experience" className="inline-block border border-blue-500 text-blue-500 px-8 py-4 rounded hover:bg-blue-500/10 transition-colors font-mono text-sm">Check out my work!</a>
          </div>
        </section>

        <div id="experience" className="max-w-6xl mx-auto space-y-24 mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold dark:text-white flex items-center">
              <span className="font-mono text-blue-500 text-xl md:text-2xl mr-3 font-normal">02.</span>
              Experience
            </h2>
            <div className="h-px flex-1 ml-8 bg-slate-200 dark:bg-slate-700/50 hidden md:block"></div>
          </div>

          {featuredProjects.map((project, index) => (
            <FeaturedProject key={index} {...project} />
          ))}
        </div>

        <section id="work" className="max-w-6xl mx-auto py-32">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-bold dark:text-white mb-4">Other Noteworthy Projects</h2>
            <a href="#" className="font-mono text-blue-500 text-sm hover:underline">view the archive</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="#" className="inline-block border border-blue-500 text-blue-500 px-8 py-4 rounded hover:bg-blue-500/10 transition-colors font-mono text-sm font-semibold">
              Show More
            </a>
          </div>
        </section>

        <section id="contact" className="max-w-2xl mx-auto text-center py-24 mb-16">
          <p className="font-mono text-blue-500 mb-5">04. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-slate-200 mb-6">Get In Touch</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12">
            Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:hello@example.com" className="inline-block border border-blue-500 text-blue-500 px-8 py-4 rounded hover:bg-blue-500/10 transition-colors font-mono text-sm font-semibold">
            Say Hello
          </a>
        </section>
      </main>

      <SocialSidebar />
      <EmailSidebar />
      <Footer />
    </>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      ${customStyles.scrollbar}
      ${customStyles.fadeInUp}
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      .font-serif {
        font-family: 'Playfair Display', serif;
      }
      .font-mono {
        font-family: 'Fira Code', monospace;
      }
    `;
    document.head.appendChild(style);

    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&family=Fira+Code:wght@400;500;600&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);

    const link4 = document.createElement('link');
    link4.rel = 'stylesheet';
    link4.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
    document.head.appendChild(link4);

    document.documentElement.classList.add('dark');
    document.documentElement.classList.add('scroll-smooth');

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
      document.head.removeChild(link4);
    };
  }, []);

  return (
    <Router basename="/">
      <div className="bg-slate-50 text-slate-900 dark:bg-[#0a192f] dark:text-slate-400 min-h-screen selection:bg-blue-500 selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;