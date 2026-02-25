'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { uploadEventImage, uploadTestimonialImage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [eventImageFile, setEventImageFile] = useState<File | null>(null);
  const [testimonialImageFile, setTestimonialImageFile] = useState<File | null>(null);
  const eventFileInputRef = useRef<HTMLInputElement>(null);
  const testimonialFileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

      if (profile.role !== 'admin') {
        router.push('/');
        return;
      }

      setUser(profile);
      setLoading(false);
    };

    const fetchUsers = async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (!error) {
        setUsers(data || []);
      }
    };

    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (!error) {
        setEvents(data || []);
      }
    };

    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error) {
        setTestimonials(data || []);
      }
    };

    getUser();
    fetchUsers();
    fetchEvents();
    fetchTestimonials();
  }, [router]);

  const updateUserRole = async (userId: string, newRole: string) => {
    setUpdating(userId);
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
    setUpdating(null);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let imageUrl = editingEvent?.image_url || null;
    
    if (eventImageFile) {
      const uploadedUrl = await uploadEventImage(eventImageFile, editingEvent?.id || 'new');
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }
    
    const eventData: any = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      created_by: user.id
    };
    
    if (imageUrl) {
      eventData.image_url = imageUrl;
    }

    if (editingEvent) {
      const { error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', editingEvent.id);
      
      if (!error) {
        setEvents(events.map(e => e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e));
        setEditingEvent(null);
        setShowEventForm(false);
        setEventImageFile(null);
      }
    } else {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();
      
      if (!error) {
        setEvents([data, ...events]);
        setShowEventForm(false);
        setEventImageFile(null);
      }
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let imageUrl = editingTestimonial?.image_url || null;
    
    if (testimonialImageFile) {
      const uploadedUrl = await uploadTestimonialImage(testimonialImageFile, editingTestimonial?.id || 'new');
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }
    
    const testimonialData: any = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      content: formData.get('content') as string,
      rating: parseInt(formData.get('rating') as string),
      featured: formData.get('featured') === 'true',
      created_by: user.id
    };
    
    if (imageUrl) {
      testimonialData.image_url = imageUrl;
    }

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', editingTestimonial.id);
      
      if (!error) {
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...testimonialData, id: editingTestimonial.id } : t));
        setEditingTestimonial(null);
        setShowTestimonialForm(false);
        setTestimonialImageFile(null);
      }
    } else {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonialData)
        .select()
        .single();
      
      if (!error) {
        setTestimonials([data, ...testimonials]);
        setShowTestimonialForm(false);
        setTestimonialImageFile(null);
      }
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="InFound Community"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-semibold text-lg">InFound Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Admin: {user?.full_name}</span>
            <Button
              variant="outline"
              onClick={() => supabase.auth.signOut().then(() => router.push('/auth'))}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-foreground/60">Manage users, content, and platform settings</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <p className="text-foreground/60 mb-4">Manage user accounts and roles</p>
            <Button variant="outline" onClick={() => document.getElementById('user-management')?.scrollIntoView({ behavior: 'smooth' })}>
              Manage Users
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Event Management</h3>
            <p className="text-foreground/60 mb-4">Manage upcoming events</p>
            <Button variant="outline" onClick={() => document.getElementById('event-management')?.scrollIntoView({ behavior: 'smooth' })}>
              Manage Events
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Testimonial Management</h3>
            <p className="text-foreground/60 mb-4">Manage user testimonials</p>
            <Button variant="outline" onClick={() => document.getElementById('testimonial-management')?.scrollIntoView({ behavior: 'smooth' })}>
              Manage Testimonials
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-foreground/60 mb-4">View platform analytics and reports</p>
            <Button variant="outline">View Analytics</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <p className="text-foreground/60 mb-4">Configure platform settings</p>
            <Button variant="outline">Platform Settings</Button>
          </Card>
        </div>

        {/* User Management Section */}
        <Card className="p-6 mb-8" id="user-management">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Created At</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50">
                    <td className="p-4">{u.full_name || 'N/A'}</td>
                    <td className="p-4">{u.email || 'N/A'}</td>
                    <td className="p-4">
                      <Select
                        value={u.role}
                        onValueChange={(value) => updateUserRole(u.id, value)}
                        disabled={updating === u.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      {updating === u.id && <span className="text-sm text-accent">Updating...</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Event Management Section */}
        <Card className="p-6 mb-8" id="event-management">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Event Management</h2>
            <Button onClick={() => setShowEventForm(true)}>
              Add Event
            </Button>
          </div>
          
          {showEventForm && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </h3>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="event-title">Title</Label>
                  <Input
                    id="event-title"
                    name="title"
                    defaultValue={editingEvent?.title || ''}
                    placeholder="Event title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea
                    id="event-description"
                    name="description"
                    defaultValue={editingEvent?.description || ''}
                    placeholder="Event description"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    name="date"
                    type="date"
                    defaultValue={editingEvent?.date || ''}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="event-location">Location</Label>
                  <Input
                    id="event-location"
                    name="location"
                    defaultValue={editingEvent?.location || ''}
                    placeholder="Event location"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="event-image">Event Image</Label>
                  <Input
                    id="event-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventImageFile(e.target.files?.[0] || null)}
                    ref={eventFileInputRef}
                  />
                  {editingEvent?.image_url && (
                    <div className="mt-2">
                      <p className="text-sm text-foreground/60 mb-1">Current image:</p>
                      <img src={editingEvent.image_url} alt="Current event" className="w-32 h-20 object-cover rounded" />
                    </div>
                  )}
                  {eventImageFile && (
                    <div className="mt-2">
                      <p className="text-sm text-foreground/60 mb-1">New image selected:</p>
                      <p className="text-sm">{eventImageFile.name}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="p-6">
                {event.image_url && (
                  <div className="mb-4">
                    <img src={event.image_url} alt={event.title} className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowEventForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-foreground/60 mb-2">{event.description}</p>
                <div className="space-y-2 text-sm text-foreground/60">
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Testimonial Management Section */}
        <Card className="p-6 mb-8" id="testimonial-management">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Testimonial Management</h2>
            <Button onClick={() => setShowTestimonialForm(true)}>
              Add Testimonial
            </Button>
          </div>
          
          {showTestimonialForm && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="testimonial-name">Name</Label>
                  <Input
                    id="testimonial-name"
                    name="name"
                    defaultValue={editingTestimonial?.name || ''}
                    placeholder="Person name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="testimonial-role">Role</Label>
                  <Input
                    id="testimonial-role"
                    name="role"
                    defaultValue={editingTestimonial?.role || ''}
                    placeholder="Role (e.g., Founder, Investor)"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="testimonial-content">Content</Label>
                  <Textarea
                    id="testimonial-content"
                    name="content"
                    defaultValue={editingTestimonial?.content || ''}
                    placeholder="Testimonial content"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="testimonial-rating">Rating (1-5)</Label>
                  <Select name="rating" defaultValue={editingTestimonial?.rating?.toString() || '3'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Poor</SelectItem>
                      <SelectItem value="2">2 - Fair</SelectItem>
                      <SelectItem value="3">3 - Good</SelectItem>
                      <SelectItem value="4">4 - Very Good</SelectItem>
                      <SelectItem value="5">5 - Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testimonial-featured">Featured</Label>
                  <Select name="featured" defaultValue={editingTestimonial?.featured?.toString() || 'false'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testimonial-image">Profile Image</Label>
                  <Input
                    id="testimonial-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTestimonialImageFile(e.target.files?.[0] || null)}
                    ref={testimonialFileInputRef}
                  />
                  {editingTestimonial?.image_url && (
                    <div className="mt-2">
                      <p className="text-sm text-foreground/60 mb-1">Current image:</p>
                      <img src={editingTestimonial.image_url} alt="Current testimonial" className="w-20 h-20 object-cover rounded-full" />
                    </div>
                  )}
                  {testimonialImageFile && (
                    <div className="mt-2">
                      <p className="text-sm text-foreground/60 mb-1">New image selected:</p>
                      <p className="text-sm">{testimonialImageFile.name}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowTestimonialForm(false);
                    setEditingTestimonial(null);
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {testimonial.image_url ? (
                      <img src={testimonial.image_url} alt={testimonial.name} className="w-12 h-12 object-cover rounded-full" />
                    ) : (
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                        {testimonial.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingTestimonial(testimonial);
                        setShowTestimonialForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-foreground/60 mb-2">{testimonial.role}</p>
                <p className="text-foreground/60 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                  <div className="flex items-center">
                    <span className="text-yellow-500">{'★'.repeat(testimonial.rating)}</span>
                    <span className="ml-2">({testimonial.rating}/5)</span>
                  </div>
                  {testimonial.featured && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">Featured</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
