import { User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Lock, Shield } from 'lucide-react';

interface SettingsProps {
  user: User;
}

interface Settings {
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    projectPrivacy: 'public' | 'private' | 'friends';
    dataCollection: 'public' | 'private' | 'friends';
  };
}

export function Settings({ user }: SettingsProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    privacy: {
      profileVisibility: 'public',
      projectPrivacy: 'public',
      dataCollection: 'public',
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setSettings(prev => ({
          ...prev,
          privacy: data.privacy || prev.privacy,
        }));
      }
    };
    loadSettings();
  }, [user.uid]);

  const handlePrivacyChange = (key: keyof Settings['privacy'], value: string) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value as 'public' | 'private' | 'friends',
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        privacy: settings.privacy,
      });
      
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Lock className="h-5 w-5 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Privacy</h3>
            <p className="text-sm text-gray-500">Manage your privacy settings</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {[
            { key: 'profileVisibility' as const, label: 'Profile Visibility', description: 'Control who can see your profile' },
            { key: 'projectPrivacy' as const, label: 'Project Privacy', description: 'Set default privacy for new projects' },
            { key: 'dataCollection' as const, label: 'Data Collection', description: 'Choose what data we can collect' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <Label>{item.label}</Label>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <Select
                value={settings.privacy[item.key]}
                onValueChange={(value) => handlePrivacyChange(item.key, value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Shield className="h-5 w-5 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Security</h3>
            <p className="text-sm text-gray-500">Manage your security preferences</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Active Sessions</Label>
              <p className="text-sm text-gray-500">Manage your active sessions</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => {
            setSettings({
              privacy: {
                profileVisibility: 'public',
                projectPrivacy: 'public',
                dataCollection: 'public',
              },
            });
          }}
          disabled={isLoading}
        >
          Reset to Defaults
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
