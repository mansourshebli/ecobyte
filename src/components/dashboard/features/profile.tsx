import { User, updateProfile } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Mail, User as UserIcon, MapPin, Link, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ProfileProps {
  user: User;
  onClose?: () => void;
}

export function Profile({ user, onClose }: ProfileProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    location: '',
    website: '',
    github: '',
    twitter: '',
    linkedin: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      const photoURL = URL.createObjectURL(file);
      
      await updateProfile(user, { photoURL });
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(user, {
        displayName: formData.displayName,
      });
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      onClose?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full">
              <img
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                alt={user.displayName || 'Profile'}
                className="h-full w-full object-cover"
              />
            </div>
            <label htmlFor="avatar-upload">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="displayName">Full Name</Label>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-gray-500" />
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <Input id="email" value={user.email || ''} disabled />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Input
                id="location"
                placeholder="Add your location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4 text-gray-500" />
              <Input
                id="website"
                placeholder="Add your website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Social Links</h3>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="github">GitHub</Label>
            <div className="flex items-center space-x-2">
              <Github className="h-4 w-4 text-gray-500" />
              <Input
                id="github"
                placeholder="Your GitHub profile"
                value={formData.github}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="twitter">Twitter</Label>
            <div className="flex items-center space-x-2">
              <Twitter className="h-4 w-4 text-gray-500" />
              <Input
                id="twitter"
                placeholder="Your Twitter profile"
                value={formData.twitter}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4 text-gray-500" />
              <Input
                id="linkedin"
                placeholder="Your LinkedIn profile"
                value={formData.linkedin}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}