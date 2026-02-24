'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, Network, TrendingUp, Users, Briefcase, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IF</span>
            </div>
            <span className="font-semibold text-lg">InFound</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-foreground/70 hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-foreground/70 hover:text-foreground transition">
              How it Works
            </Link>
            <Link href="#community" className="text-sm text-foreground/70 hover:text-foreground transition">
              Community
            </Link>
          </div>
          <Button className="rounded-full">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent mb-6">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              The Future of Founder Investing
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Bridge the Gap Between Founders and Investors
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 text-balance mb-8 max-w-2xl mx-auto">
            InFound community—the founder-led platform designed to connect early-stage startups with seasoned investors. Build relationships, raise capital, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-12">
              Start Investing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12">
              List Your Startup
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
            <p className="text-sm text-foreground/60">Active Founders</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.5B+</div>
            <p className="text-sm text-foreground/60">Capital Deployed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">450+</div>
            <p className="text-sm text-foreground/60">Successful Exits</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-foreground/60">Success Rate</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Simple, transparent process to connect founders with the right investors
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
              <p className="text-foreground/60">
                Set up your investor or founder profile with verified credentials. Share your expertise, track record, and investment thesis.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Network className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect & Network</h3>
              <p className="text-foreground/60">
                Browse opportunities or explore investors. Connect with pre-vetted members who align with your goals.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Grow Together</h3>
              <p className="text-foreground/60">
                Collaborate on deals, share insights, and build long-term relationships. Track progress and celebrate wins.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything you need to succeed in founder-led investing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Network</h3>
                <p className="text-foreground/60">
                  Every founder and investor is vetted and verified for authenticity and credibility.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                <p className="text-foreground/60">
                  AI-powered algorithms connect you with ideal partners based on your goals and preferences.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deal Management</h3>
                <p className="text-foreground/60">
                  Streamlined pipeline from pitch to close with built-in collaboration tools.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Portfolio Insights</h3>
                <p className="text-foreground/60">
                  Real-time analytics and reporting on your investments and portfolio performance.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community Events</h3>
                <p className="text-foreground/60">
                  Exclusive pitch events, workshops, and networking sessions for members only.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Due Diligence Tools</h3>
                <p className="text-foreground/60">
                  Access to comprehensive data, documents, and background checks for informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg text-foreground/60 mb-6">
                Be part of a growing ecosystem where founders and investors collaborate to build the next generation of companies.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">✓</span>
                  </div>
                  <span>Access to curated investment opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">✓</span>
                  </div>
                  <span>Direct access to experienced founders</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">✓</span>
                  </div>
                  <span>Exclusive educational resources and mentorship</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">✓</span>
                  </div>
                  <span>Monthly networking events and pitch sessions</span>
                </li>
              </ul>
              <Button size="lg" className="rounded-full px-8 h-12">
                Join InFound Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 min-h-96 flex items-center justify-center border border-primary/20">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                <p className="text-foreground/40">Community visual representation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Investing?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of founders and investors already collaborating on InFound
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-12">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 md:px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">IF</span>
                </div>
                <span className="font-semibold">InFound</span>
              </div>
              <p className="text-sm text-foreground/60">
                Connecting founders and investors to build the future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="#" className="hover:text-foreground transition">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="#" className="hover:text-foreground transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Guides</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="#" className="hover:text-foreground transition">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-foreground/60">
            <p>&copy; 2026 InFound Community. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground transition">Twitter</Link>
              <Link href="#" className="hover:text-foreground transition">LinkedIn</Link>
              <Link href="#" className="hover:text-foreground transition">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
