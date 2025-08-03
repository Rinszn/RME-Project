import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Signup from './Signup';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState('');
const [showSignupForm, setShowSignupForm] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();

    const NAV_HEIGHT = 70;
    const target = document.getElementById(id);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: y });

    setActiveSection(id); // Set the active section
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

 useEffect(() => {
  AOS.init({ once: true, duration: 800 });

  const handleLoad = () => {
    document.body.style.opacity = '1';

    const pl = document.getElementById('preloader');
    if (pl) {
      pl.classList.add('fade-out');
    }

    const fadeDuration = 500;
    setTimeout(() => setIsReady(true), fadeDuration);
  };

  // Listen for window load
  window.addEventListener('load', handleLoad);

  // ✅ Fallback: forcibly trigger if not loaded in 5 seconds
  const fallbackTimeout = setTimeout(() => {
    if (document.body.style.opacity !== '1') {
      console.warn('Fallback triggered: forcing preloader removal');
      document.body.style.opacity = '1';

      const pl = document.getElementById('preloader');
      if (pl) {
        pl.classList.add('fade-out');
      }

      setTimeout(() => setIsReady(true), 500);
    }
  }, 5000);

  // Cleanup
  return () => {
    window.removeEventListener('load', handleLoad);
    clearTimeout(fallbackTimeout);
  };



    window.addEventListener('load', handleLoad);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

useEffect(() => {
  const sectionIds = ['features', 'how-it-works', 'pricing', 'contact'];

  const handleScroll = () => {
    const NAV_HEIGHT = 70;
    const threshold = window.innerHeight * 0.3;

    let found = false;

    for (let i = 0; i < sectionIds.length; i++) {
      const id = sectionIds[i];
      const section = document.getElementById(id);

      if (section) {
        const rect = section.getBoundingClientRect();

        if (rect.top >= NAV_HEIGHT && rect.top <= threshold + NAV_HEIGHT) {
          setActiveSection(id);
          found = true;
          break;
        }
      }
    }

    // Footer check: if visible, set 'contact' as active section
    if (!found) {
      const footer = document.getElementById('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          setActiveSection('contact');
          found = true;
        }
      }
    }

    // If neither section nor footer is found, clear active
    if (!found) setActiveSection('');
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

useEffect(() => {
  if (showSignupForm) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  // Clean up when component unmounts
  return () => {
    document.body.style.overflow = '';
  };
}, [showSignupForm]);


  return (
    <>
      {/* 🔹 Preloader Skeleton Layout */}
      {!isReady && (
  <div
    id="preloader"
    className="position-fixed top-0 start-0 w-100 h-100 bg-white z-3 d-flex flex-column"
    style={{ zIndex: 9999 }}
  >
 {/* Fake Navbar Placeholder */}
<div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom shadow-sm bg-white">
  <div className="d-flex align-items-center gap-3">
    <div
      className="bg-secondary rounded-circle placeholder-glow"
      style={{ width: '48px', height: '48px' }}
    ></div>
    <div
      className="fw-bold placeholder-glow"
      style={{ fontSize: '1.25rem', width: '120px', height: '24px' }}
    >
      <span className="placeholder col-12"></span>
    </div>
  </div>
  <div className="d-flex align-items-center gap-3">
    <div className="placeholder-glow">
      <span className="placeholder col-4" style={{ height: '24px', display: 'inline-block' }}></span>
    </div>
    <div className="placeholder-glow">
      <span className="placeholder col-4" style={{ height: '24px', display: 'inline-block' }}></span>
    </div>
    <div className="placeholder-glow">
      <span className="placeholder btn btn-dark disabled px-4 py-2" style={{ borderRadius: '50px' }}></span>
    </div>
  </div>
</div>


    {/* Fake Hero Section */}
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3">
      <div className="placeholder-glow mb-3" style={{ width: '80%' }}>
        <span className="placeholder col-12 display-6"></span>
      </div>
      <div className="placeholder-glow mb-4" style={{ width: '60%' }}>
        <span className="placeholder col-12"></span>
      </div>
      <div
        className="placeholder btn btn-secondary disabled"
        style={{ width: '180px', height: '48px', borderRadius: '30px' }}
      ></div>
    </div>
  </div>
)}


      {/* 🔸 Main Content */}
      {isReady && (
        <>
          {/* --- Your entire main content starts here --- */}

          {/* Navbar */}
          <nav id="mainNav" className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
            <div className="container">
                        {/* RME SALON IMG */}
                    <a
            className="navbar-brand fw-bold d-flex align-items-center gap-2 text-white"
            href="/"
           // onClick={(e) => {
            //  e.preventDefault();
           //   window.scrollTo({ top: 0 }); // scroll to top instantly
          //    window.history.replaceState(null, '', window.location.pathname + window.location.search);
         //   }}
          >
            <img
              src="img/rme.jpg"
              alt="Logo"
              width="48"
              height="48"
              className="rounded-circle shadow-sm border border-2"
              style={{ objectFit: 'cover' }}
            />
            RME SALON
          </a>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="navCollapse" className="collapse navbar-collapse">
   <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
  {[
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Plans' },
    { id: 'contact', label: 'Contact' },
  ].map(({ id, label }) => (
    <li className="nav-item" key={id}>
      <a
        className={`nav-link ${activeSection === id ? 'active' : ''}`}
        href="#"
        onClick={(e) => scrollToSection(e, id)}
      >
        {label}
      </a>
    </li>
  ))}
</ul>
         {/* Join Now */}

<button
  className="btn btn-dark rounded-pill px-4"
  onClick={() => setShowSignupForm(true)}
>
  Join Now
</button>
          
          </div>
            </div>
          </nav>

         {/* Hero Section */}
  <header className="hero bg-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
    <div className="container text-center">
      <h1 className="display-4 fw-bold mb-4" data-aos="fade-up">
        Salon POS for Modern Salon
      </h1>
      <p className="lead mb-4" data-aos="fade-up" data-aos-delay="100">
        A centralized platform to manage sales, and clients — available for all your branches.
      </p>
      <a href="#" onClick={(e) => scrollToSection(e, 'features')}  className="btn btn-primary btn-lg rounded-pill" data-aos="fade-up" data-aos-delay="200">
        See Below
      </a>
    </div>
  </header>

  {/* Features */}
  <section id="features" className="py-5">
    <div className="container">
      <h2 className="text-center mb-5" data-aos="fade-up">Why Choose RME POS?</h2>
      <div className="row text-center gy-4">
        {[
          { icon: '🖥️', title: 'Easy to Use', desc: 'Simple UI designed for kiosk and desktop use.' },
          { icon: '🏢', title: 'Multi-Branch Support', desc: 'Track and manage multiple branches with ease.' },
          { icon: '📊', title: 'Real-Time Analytics', desc: 'Instant insights on bookings, inventory, and revenue.' },
          { icon: '🔒', title: 'Secure Access', desc: 'Role-based access ensures secure data control.' },
        ].map((f, i) => (
          <div className="col-md-3" data-aos="fade-up" data-aos-delay={i * 100} key={i}>
            <div className="p-4 border rounded-4 h-100">
              <div className="display-4 mb-3">{f.icon}</div>
              <h5>{f.title}</h5>
              <p className="text-muted small">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

    {/* How It Works */}
  <section id="how-it-works" className="bg-light py-5">
    <div className="container text-center">
      <h2 className="fw-bold mb-5" data-aos="fade-up">How It Works</h2>
      <div className="row justify-content-center">
        {[
          { step: "1. Sign Up", desc: "Create your account and add your first branch." },
          { step: "2. Configure Services", desc: "Input services, prices, and assign staff." },
          { step: "3. Start Selling", desc: "Use the POS system at each branch for seamless transactions." },
        ].map((item, i) => (
          <div className="col-md-4 mb-4" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="p-4 border rounded-4 h-100 bg-white shadow-sm">
              <h5 className="fw-bold mb-2">{item.step}</h5>
              <p className="text-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

      

  {/* Subscription Plans */}
  <section id="pricing" className="container py-5">
    <div className="text-center mb-5">
      <h2 className="fw-bold" data-aos="fade-up">Flexible Subscription Plans</h2>
      <p className="text-muted" data-aos="fade-up" data-aos-delay="100">
        Whether you're a single branch or a growing chain — we have a plan for you.
      </p>
    </div>
    <div className="row g-4 justify-content-center">
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
  <div className="card-plan">
    <h4 className="fw-bold">Starter</h4>
    <p className="text-muted">₱0,000 / month</p>
    <ul>
      <li><i className="bi bi-check-circle me-2 text-success"></i>1 Branch</li>
      <li><i className="bi bi-check-circle me-2 text-success"></i>10 Staff</li>
      <li><i className="bi bi-check-circle me-2 text-success"></i>Basic Reports</li>
      <li><i className="bi bi-check-circle me-2 text-success"></i>Email Support</li>
    </ul>
    <button className="btn btn-outline-light mt-4">Get Started</button>
  </div>
</div>

<div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
  <div className="card-plan pro">
    <h4 className="fw-bold">Professional</h4>
    <p className="text-light">₱0,000 / month</p>
    <ul>
      <li><i className="bi bi-check-circle-fill me-2 text-white"></i>Up to 5 Branches</li>
      <li><i className="bi bi-check-circle-fill me-2 text-white"></i>Unlimited Staff</li>
      <li><i className="bi bi-check-circle-fill me-2 text-white"></i>Advanced Reports</li>
      <li><i className="bi bi-check-circle-fill me-2 text-white"></i>Priority Support</li>
    </ul>
    <button className="btn btn-light mt-4">Choose Plan</button>
  </div>
</div>

    </div>
  </section>

  {/* Contact Section */}
  <section id="contact" className="py-5 bg-light">
    <div className="container">
      <h2 className="text-center mb-5" data-aos="fade-up">Get in Touch</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Your name" required />
            </div>
            <div className="mb-3" data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" placeholder="you@example.com" required />
            </div>
            <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" rows="5" className="form-control" placeholder="How can we help you?" required></textarea>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <button type="submit" className="btn btn-primary px-4 rounded-pill">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

          {/* Footer */}
<footer id="footer" className="bg-dark text-light py-5 mt-5">
  <div className="container">
    <div className="row">
      {/* Brand & Tagline */}
      <div className="col-md-4 mb-4">
        <div className="d-flex align-items-center mb-2">
          <img src="img/rme.jpg" alt="RME Salon Logo" width="40" height="40" className="me-2" />
          <h5 className="mb-0 fw-bold">RME SALON</h5>
        </div>
        <p className="small text-muted">Beauty that begins the moment you decide to be yourself.</p>
      </div>

      {/* Quick Links */}
      <div className="col-md-4 mb-4">
        <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
        <ul className="list-unstyled small">
          <li><a href="#" className="text-light text-decoration-none">Home</a></li>
          <li><a href="#" className="text-light text-decoration-none">Features</a></li>
          <li><a href="#" className="text-light text-decoration-none">How It Works</a></li>
          <li><a href="#" className="text-light text-decoration-none">Plans</a></li>
          <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-md-4 mb-4">
        <h6 className="text-uppercase fw-semibold mb-3">Get in Touch</h6>
        <p className="small mb-1">rmesalon@gmail.com</p>
        <p className="small mb-1">123 Salon Street, Cavite, PH</p>
        <div className="d-flex gap-3 mt-2">
          <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
          <a href="#" className="text-light"><i className="bi bi-twitter-x"></i></a>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="text-center mt-4 small text-muted">
      &copy; 2025 RME Salon. All rights reserved.
    </div>
  </div>
</footer>




          {/* --- End of main content --- */}
        </>
      )}

{showSignupForm && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
    style={{ zIndex: 1050 }}
  >
<div
  className="bg-white p-4 rounded-4 shadow position-relative"
  style={{ width: '100%', maxWidth: '800px' }}
>
      <button
        className="btn-close position-absolute top-0 end-0 m-3"
        onClick={() => setShowSignupForm(false)}
      ></button>
      <Signup onClose={() => setShowSignupForm(false)} />
    </div>
  </div>
)}



    </>
  );
}

export default App;
