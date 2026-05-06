import { Link } from 'react-router-dom';
import { Users, Building, ShieldCheck, ArrowRight, BarChart3, Zap, Globe, CheckCircle, Star, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0a0a0f', minHeight: '100vh', color: '#fff' }}>

      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 5%',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 68 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99,102,241,0.5)'
            }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NexusAgent</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/login" style={{
              color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500,
              fontSize: 14, padding: '8px 16px', borderRadius: 8,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >Log In</Link>
            <Link to="/register" style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', textDecoration: 'none', fontWeight: 600,
              fontSize: 14, padding: '10px 20px', borderRadius: 10,
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Become an Agent <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 160, paddingBottom: 120, textAlign: 'center' }}>
        {/* Glow BG */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '15%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 250, height: 250, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 8px #6366f1' }} />
            <span style={{ fontSize: 13, color: '#a5b4fc', fontWeight: 500 }}>Multi-Agent Management Platform</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-2px', marginBottom: 24,
            background: 'linear-gradient(135deg, #ffffff 0%, #c7d2fe 50%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Manage Your Agent<br />Network at Scale
          </h1>

          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px', fontWeight: 400 }}>
            The all-in-one SaaS platform for hierarchical agent management. Onboard shops, track performance, and grow your revenue — securely and efficiently.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', textDecoration: 'none', fontWeight: 700,
              fontSize: 16, padding: '14px 32px', borderRadius: 12,
              boxShadow: '0 8px 30px rgba(99,102,241,0.5)',
              transition: 'all 0.3s',
            }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', textDecoration: 'none', fontWeight: 600,
              fontSize: 16, padding: '14px 32px', borderRadius: 12,
              backdropFilter: 'blur(10px)',
            }}>
              Log In to Dashboard
            </Link>
          </div>

          {/* Trust indicators */}
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[['500+', 'Active Agents'], ['12K+', 'Shops Onboarded'], ['99.9%', 'Uptime SLA'], ['4.9★', 'User Rating']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '100px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>How It Works</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: 16 }}>
            Everything you need to manage<br />your agent hierarchy
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>A powerful platform built for modern multi-tier agent management systems.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {[
            {
              icon: <ShieldCheck size={24} color="#6366f1" />,
              color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.25)',
              title: 'Secure Registration',
              desc: 'Agents submit their details and documents. Admins review, verify, and approve applications through a robust approval workflow.',
              tags: ['Document Upload', 'KYC Verified']
            },
            {
              icon: <Users size={24} color="#8b5cf6" />,
              color: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.25)',
              title: 'Sub-Admin Delegation',
              desc: 'Assign approved agents to Sub Admins for regional management. Full visibility into team performance with granular controls.',
              tags: ['Role-Based Access', 'Regional Control']
            },
            {
              icon: <Building size={24} color="#06b6d4" />,
              color: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.25)',
              title: 'Shop Onboarding',
              desc: 'Agents add and manage shops in their locality. Admins track pincode-wise analytics and monitor onboarding progress in real time.',
              tags: ['Pincode Analytics', 'Real-time Tracking']
            },
            {
              icon: <BarChart3 size={24} color="#10b981" />,
              color: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.25)',
              title: 'Performance Analytics',
              desc: 'Deep insights into agent performance, shop conversion rates, and regional growth metrics — all from a single dashboard.',
              tags: ['Live Reports', 'Export Data']
            },
            {
              icon: <Globe size={24} color="#f59e0b" />,
              color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.25)',
              title: 'Geo-Based Management',
              desc: 'Manage agents and shops by geography. Hierarchical district, zone, and pincode structure for complete coverage.',
              tags: ['District Zones', 'Location Map']
            },
            {
              icon: <TrendingUp size={24} color="#ef4444" />,
              color: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.25)',
              title: 'Revenue Tracking',
              desc: 'Track commissions, targets, and revenue across your entire network. Automated reporting for every agent and sub-admin.',
              tags: ['Commission Mgmt', 'Target Setting']
            },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${f.border}`,
              borderRadius: 20, padding: 28,
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{f.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {f.tags.map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '4px 10px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roles Section */}
      <div style={{ padding: '80px 5%', background: 'rgba(99,102,241,0.05)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Role-Based Access</p>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 48, color: '#fff' }}>One platform, every role covered</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { role: 'Admin', desc: 'Full system control, approvals & analytics', color: '#6366f1', emoji: '👑' },
              { role: 'Sub Admin', desc: 'Regional agent oversight & reporting', color: '#8b5cf6', emoji: '🎯' },
              { role: 'Agent', desc: 'Shop onboarding & target management', color: '#06b6d4', emoji: '🏪' },
            ].map((r) => (
              <div key={r.role} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{r.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: r.color, marginBottom: 8 }}>{r.role}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '100px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 28
          }}>
            <CheckCircle size={14} color="#10b981" />
            <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>No credit card required</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 16, background: 'linear-gradient(135deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ready to build your<br />agent network?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>Join hundreds of businesses already using NexusAgent to manage their agent hierarchies.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', textDecoration: 'none', fontWeight: 700,
              fontSize: 16, padding: '16px 36px', borderRadius: 14,
              boxShadow: '0 10px 40px rgba(99,102,241,0.5)',
            }}>
              Register as Agent <ArrowRight size={18} />
            </Link>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', textDecoration: 'none', fontWeight: 600,
              fontSize: 16, padding: '16px 36px', borderRadius: 14,
            }}>
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={14} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>NexusAgent</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>© 2026 NexusAgent. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
