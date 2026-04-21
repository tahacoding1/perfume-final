import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Leaf, Globe, Heart, Package } from 'lucide-react';
import './About.css';

export const About = () => {
  const values = [
    { icon: <Leaf size={28} />,    title: 'Sustainably Sourced',  desc: 'Every ingredient is ethically harvested from vetted farms and distillers across the Arabian Peninsula, South Asia, and the Mediterranean.' },
    { icon: <Award size={28} />,   title: 'Master Craftsmanship', desc: 'Our in-house perfumers hold over three decades of combined experience, trained in the ancient traditions of Arabian and French haute parfumerie.' },
    { icon: <Heart size={28} />,   title: 'Cruelty-Free',         desc: 'We are proud to be 100% cruelty-free. No animal testing, ever. Our musks are entirely synthetic or derived from ethical plant sources.' },
    { icon: <Globe size={28} />,   title: 'Global Ingredients',   desc: 'Cambodian oud, Taif rose, Indian sandalwood, Sicilian bergamot — we travel the world so your skin can tell the story.' },
    { icon: <Package size={28} />, title: 'Artisan Packaging',    desc: 'Every bottle is hand-filled, hand-labelled, and packed in biodegradable materials. The unboxing is as intentional as the fragrance itself.' },
    { icon: <Star size={28} />,    title: 'Transparent Pricing',  desc: 'No middlemen. We sell directly to you, which means you pay for quality — not for a marketing budget or a luxury retail lease.' },
  ];

  const timeline = [
    { year: '2010', title: 'The Beginning',     desc: 'Our founder, inspired by a childhood memory of his grandfather\'s oud, set out to create Pakistan\'s first truly artisanal perfume house in a small workshop in Lahore.' },
    { year: '2013', title: 'First Collection',  desc: 'The debut Oud Mystique and Sandalwood Rose attars launched at the Lahore Literary Festival, selling out within 48 hours and garnering critical acclaim.' },
    { year: '2016', title: 'Expanding Range',   desc: 'We introduced the Signature Collection — modern, wearable compositions inspired by international trends while rooted in Eastern sensibility.' },
    { year: '2019', title: 'Going Online',      desc: 'LUMIÈRE launched its e-commerce platform, bringing our fragrances to customers across all of Pakistan without compromising on the luxury experience.' },
    { year: '2022', title: 'Sustainability',    desc: 'We committed to 100% recycled packaging, partnered with sustainable oud farms in Cambodia, and began our journey toward carbon-neutral operations.' },
    { year: '2024', title: 'The Boutique',      desc: 'Our flagship boutique opened in Gulberg III, Lahore — a curated space designed for the full LUMIÈRE sensory experience.' },
  ];

  const ingredients = [
    { name: 'Cambodian Oud',        origin: 'Cambodia',    img: 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?w=300&h=200&fit=crop' },
    { name: 'Taif Rose',            origin: 'Saudi Arabia', img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=300&h=200&fit=crop' },
    { name: 'Indian Sandalwood',    origin: 'Mysore, India', img: 'https://images.unsplash.com/photo-1595532542520-21a473f32420?w=300&h=200&fit=crop' },
    { name: 'Sicilian Bergamot',    origin: 'Sicily, Italy', img: 'https://images.unsplash.com/photo-1605369680376-795a973a4b95?w=300&h=200&fit=crop' },
  ];

  return (
    <div className="about-page page-padding">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="about-hero animate-fade-up">
        <div className="container">
          <span className="section-label">Our Heritage</span>
          <h1 className="about-hero-title">The Story of <em>LUMIÈRE</em></h1>
          <p className="about-hero-sub">
            Founded on obsession. Crafted with patience. Worn by those who refuse to be forgotten.
          </p>
        </div>
        <div className="about-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1600"
            alt="LUMIÈRE Perfume House"
          />
          <div className="about-hero-overlay" />
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section className="section container">
        <div className="about-story-grid animate-fade-up">
          <div className="about-story-text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
              Not a brand. <em>A conviction.</em>
            </h2>
            <p>Founded in 2010 in Lahore, LUMIÈRE began with a singular, almost stubborn conviction: that Pakistan deserved a perfume house that could hold its own against the finest names in the world.</p>
            <p>Our founder grew up watching his grandfather — a retired spice merchant — apply a single drop of oud every morning before Fajr. That ritual, that quiet luxury, became the seed of everything we do.</p>
            <p>We are not a mass-market brand. We do not dilute our formulas to chase volume. Every composition in our lineup has been through dozens of iterations, tested across seasons and skin types, before it earns the LUMIÈRE name on its bottle.</p>
            <p>We believe a great fragrance is not just a product. It is a second skin — an invisible extension of who you are. It should make you feel powerful when you enter a room, and leave an impression long after you have left it.</p>
            <Link to="/store" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>
              Explore the Collection
            </Link>
          </div>
          <div className="about-story-imgs">
            <img
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=600"
              alt="Perfume ingredients"
              className="story-img-main"
            />
            <img
              src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400"
              alt="Gift packaging"
              className="story-img-sub"
            />
          </div>
        </div>
      </section>

      {/* ── NUMBERS ──────────────────────────────────────────── */}
      <section className="about-numbers-section">
        <div className="container about-numbers animate-fade-up">
          {[
            { num: '14+',   label: 'Years of Craft' },
            { num: '17',    label: 'Signature Fragrances' },
            { num: '12,000+', label: 'Happy Customers' },
            { num: '100%',  label: 'Cruelty-Free' },
          ].map(s => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-num">{s.num}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="section container animate-fade-up">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <span className="section-label">What We Stand For</span>
          <h2 className="section-title">Our <em>Values</em></h2>
        </div>
        <div className="values-grid">
          {values.map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INGREDIENTS ──────────────────────────────────────── */}
      <section className="section about-ingredients-section animate-fade-up">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-label">From Source to Skin</span>
            <h2 className="section-title">Rare <em>Ingredients</em></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '16px auto 0', lineHeight: '1.8' }}>
              We travel to the source — not to claim exoticism, but because quality cannot be faked.
              Every ingredient is hand-selected, tested for purity, and cold-stored until it reaches your bottle.
            </p>
          </div>
          <div className="ingredients-grid">
            {ingredients.map(ing => (
              <div key={ing.name} className="ingredient-card">
                <div className="ingredient-img">
                  <img src={ing.img} alt={ing.name} />
                </div>
                <div className="ingredient-info">
                  <h4>{ing.name}</h4>
                  <span>{ing.origin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="section container animate-fade-up">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <span className="section-label">Our Journey</span>
          <h2 className="section-title">14 Years of <em>Obsession</em></h2>
        </div>
        <div className="about-timeline">
          {timeline.map((item, i) => (
            <div key={item.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="timeline-line" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="about-cta animate-fade-up">
        <div className="container text-center">
          <h2 className="section-title">Ready to Find Your <em>Signature?</em></h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '16px' }}>
            Explore our full collection — from pure attars to signature extraits.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/store" className="btn btn-primary">Shop Now</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

// Keep old Contact export for backward compatibility
export const Contact = () => null;
