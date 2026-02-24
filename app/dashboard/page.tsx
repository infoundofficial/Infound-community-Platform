'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }

      const { data: profile } = await supabase.from('users').select('*').eq('id', session.user.id).single();

      if (profile.role !== 'user') {
        router.push('/admin');
        return;
      }

      setUser(profile);
      setLoading(false);
    };

    getUser();
  }, [router]);

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
            <span className="font-semibold text-lg">InFound</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.full_name}</span>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">My Profile</h3>
            <p className="text-foreground/60 mb-4">Manage your profile information</p>
            <Button variant="outline">Edit Profile</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Investments</h3>
            <p className="text-foreground/60 mb-4">View your investment opportunities</p>
            <Button variant="outline">Browse Deals</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Network</h3>
            <p className="text-foreground/60 mb-4">Connect with founders and investors</p>
            <Button variant="outline">Find Connections</Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
