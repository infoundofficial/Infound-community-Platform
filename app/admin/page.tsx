'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
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

    getUser();
    fetchUsers();
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
            <Button variant="outline">Manage Users</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Content Moderation</h3>
            <p className="text-foreground/60 mb-4">Review and moderate platform content</p>
            <Button variant="outline">Moderate Content</Button>
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
        <Card className="p-6">
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
      </main>
    </div>
  );
}
