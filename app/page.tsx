'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, Network, TrendingUp, Users, Briefcase, CheckCircle2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (!error && data) {
        setEvents(data);
      }
    };

    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setTestimonials(data);
      }
    };

    fetchEvents();
    fetchTestimonials();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <main className="w-full">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#070046] border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="InFound Community" 
              width={40} 
              height={40}
              className="w-10 h-10"
            />
            <span className="font-semibold text-lg hidden sm:inline text-accent">InFound</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-accent hover:text-accent/80 transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-accent hover:text-accent/80 transition">
              How it Works
            </Link>
            <Link href="#community" className="text-sm text-accent hover:text-accent/80 transition">
              Community
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-accent/10 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-accent" />
                )}
              </button>
            )}
            <Button className="rounded-full bg-accent text-primary hover:bg-accent/90">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent mb-8">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  The Future of Founder Investing
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
                Bridge the Gap <span className="text-accent">Between Founders</span> and Investors
              </h1>
              <p className="text-lg md:text-xl text-foreground/60 mb-8 leading-relaxed">
                InFound community—the founder-led platform designed to connect early-stage startups with seasoned investors. Build relationships, raise capital, and grow together.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold">
                  Start Investing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold">
                  List Your Startup
                </Button>
              </div>
              <div className="flex gap-8 mt-12 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-accent">10K+</p>
                  <p className="text-sm text-foreground/60">Active Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">$2.5B</p>
                  <p className="text-sm text-foreground/60">Capital Connected</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">450+</p>
                  <p className="text-sm text-foreground/60">Successful Exits</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 aspect-square flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center">
                  <Users className="w-24 h-24 text-accent/40 mx-auto mb-4" />
                  <p className="text-accent/60 text-lg">Investor-Founder Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-4 md:px-6 bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-foreground/60 mb-6">Join us at our next gathering.</p>
            <Link href="/events" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition font-semibold">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-accent">
                  {event.image_url && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-accent font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                        <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-foreground/60 mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-foreground/50 mb-6">
                      <Briefcase className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <Button className="w-full rounded-lg">Register Now</Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-foreground/60">No upcoming events. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Simple, transparent process to connect founders with the right investors
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 -z-10"></div>
            
            <Card className="p-8 hover:shadow-lg transition-shadow hover:border-accent relative">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-lg">
                01
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-foreground/60 leading-relaxed">
                Set up your investor or founder profile with verified credentials. Share your expertise, track record, and investment thesis.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow hover:border-accent relative">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-lg">
                02
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Network className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Network</h3>
              <p className="text-foreground/60 leading-relaxed">
                Browse opportunities or explore investors. Connect with pre-vetted members who align with your goals.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow hover:border-accent relative">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-lg">
                03
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Grow Together</h3>
              <p className="text-foreground/60 leading-relaxed">
                Collaborate on deals, share insights, and build long-term relationships. Track progress and celebrate wins.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Founders & Investors</h2>
            <p className="text-lg text-foreground/60">See what members are saying about InFound</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-8 border-l-4 border-accent">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-foreground/60 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.image_url ? (
                      <img 
                        src={testimonial.image_url} 
                        alt={testimonial.name} 
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                        {testimonial.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-foreground/50">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <>
                <Card className="p-8 border-l-4 border-accent">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-foreground/60 mb-6 leading-relaxed">
                    "InFound connected me with the perfect investor for our Series A. The platform made the entire process seamless and efficient."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                      SM
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Sarah Martinez</p>
                      <p className="text-xs text-foreground/50">Founder, TechVenture</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-8 border-l-4 border-accent">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-foreground/60 mb-6 leading-relaxed">
                    "As an investor, InFound gives me access to high-quality deal flow with thorough vetting. Highly recommend to any investor."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                      JK
                    </div>
                    <div>
                      <p className="font-semibold text-sm">James Kelly</p>
                      <p className="text-xs text-foreground/50">Angel Investor</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-8 border-l-4 border-accent">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-foreground/60 mb-6 leading-relaxed">
                    "The community events alone are worth the membership. Great way to build relationships and stay updated on the ecosystem."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                      ER
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Emily Rodriguez</p>
                      <p className="text-xs text-foreground/50">Founder, DataFlow</p>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 md:px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything you need to succeed in founder-led investing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Network</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Every founder and investor is vetted and verified for authenticity and credibility.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                <p className="text-foreground/60 leading-relaxed">
                  AI-powered algorithms connect you with ideal partners based on your goals and preferences.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deal Management</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Streamlined pipeline from pitch to close with built-in collaboration tools.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Portfolio Insights</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Real-time analytics and reporting on your investments and portfolio performance.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community Events</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Exclusive pitch events, workshops, and networking sessions for members only.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Due Diligence Tools</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Access to comprehensive data, documents, and background checks for informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Join Our Growing Community</h2>
              <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
                Be part of a thriving ecosystem where founders and investors collaborate to build the next generation of breakthrough companies. Access exclusive opportunities, build meaningful relationships, and accelerate your success.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">✓</span>
                  </div>
                  <span className="text-foreground">Access to curated investment opportunities</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">✓</span>
                  </div>
                  <span className="text-foreground">Direct access to experienced founders and mentors</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">✓</span>
                  </div>
                  <span className="text-foreground">Exclusive educational resources and workshops</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">✓</span>
                  </div>
                  <span className="text-foreground">Monthly networking events and pitch sessions</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">✓</span>
                  </div>
                  <span className="text-foreground">Comprehensive deal flow and due diligence support</span>
                </li>
              </ul>
              <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold">
                Join InFound Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-3xl p-12 min-h-96 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
              </div>
              <div className="relative z-10 text-center">
                <Network className="w-20 h-20 text-accent/60 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-accent mb-3">A Network Built on Trust</h3>
                <p className="text-accent/70">Connecting visionary founders with strategic investors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Ready to Transform Your Investing?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of founders and investors already collaborating on InFound. Start building meaningful relationships today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full px-10 h-13 text-base font-semibold">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-13 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base font-semibold">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 px-4 md:px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="InFound Community" 
                  width={32} 
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-bold text-lg">InFound</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Connecting founders and investors to build the next generation of companies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Features</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Pricing</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Security</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Blog</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Guides</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Support</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">About</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Careers</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Press</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Privacy</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Terms</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">Cookies</Link></li>
                <li><Link href="#" className="text-foreground/60 hover:text-accent transition">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
            <p className="text-foreground/60">&copy; 2026 InFound Community. All rights reserved.</p>
            <p className="text-foreground/60">Design and developed by DRUPTO</p>
            <div className="flex gap-8">
              <Link href="#" className="text-foreground/60 hover:text-accent transition font-semibold">Twitter</Link>
              <Link href="#" className="text-foreground/60 hover:text-accent transition font-semibold">LinkedIn</Link>
              <Link href="#" className="text-foreground/60 hover:text-accent transition font-semibold">Discord</Link>
              <Link href="#" className="text-foreground/60 hover:text-accent transition font-semibold">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
