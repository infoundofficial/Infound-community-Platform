'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Events</h1>
          <p className="text-lg text-foreground/60">
            Discover upcoming events and networking opportunities in the InFound community
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
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
                      <p className="text-sm text-accent font-semibold">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
                    </div>
                  </div>
                  <p className="text-foreground/60 mb-4">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-foreground/50 mb-6">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <Button className="w-full rounded-lg">Register Now</Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No Events Available</h2>
            <p className="text-foreground/60 mb-8">
              Check back soon for upcoming events and networking opportunities.
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
