import { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Heart,
  MessageSquare,
  Share2,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Search,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CommunityProps {
  user: User;
}

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  images: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
}

// Dummy data for demonstration
const dummyUsers = [
  { id: '1', name: 'Emma Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
  { id: '2', name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james' },
  { id: '3', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { id: '4', name: 'Michael Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
  { id: '5', name: 'Lisa Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa' },
];

const dummyPosts: Post[] = [
  {
    id: '1',
    author: dummyUsers[0],
    title: 'Breakthrough in Solar Energy Storage',
    content: 'Our research team has developed a new type of battery that can store solar energy more efficiently than ever before. This could revolutionize renewable energy adoption worldwide.',
    images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format'],
    timestamp: new Date('2024-03-15T10:00:00'),
    likes: 245,
    comments: 42,
    shares: 89,
    tags: ['solar', 'energy', 'innovation'],
  },
  {
    id: '2',
    author: dummyUsers[1],
    title: 'Ocean Cleanup Technology Success',
    content: 'Latest results from our ocean cleanup initiative show a 75% reduction in microplastics in test areas. Full methodology and data available in the attached report.',
    images: ['https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&auto=format'],
    timestamp: new Date('2024-03-14T15:30:00'),
    likes: 189,
    comments: 35,
    shares: 67,
    tags: ['ocean', 'pollution', 'cleanup'],
  },
  {
    id: '3',
    author: dummyUsers[2],
    title: 'Urban Forest Impact Study',
    content: 'New data reveals that urban forests can reduce city temperatures by up to 8°C. Our 5-year study across 12 major cities shows promising results for climate adaptation.',
    images: ['https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format'],
    timestamp: new Date('2024-03-13T09:15:00'),
    likes: 312,
    comments: 58,
    shares: 123,
    tags: ['urban', 'forestry', 'climate'],
  },
  {
    id: '4',
    author: dummyUsers[3],
    title: 'Sustainable Agriculture Techniques',
    content: 'Our experiments with vertical farming have yielded 300% more produce per square meter while using 95% less water. Full research paper coming soon.',
    images: ['https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format'],
    timestamp: new Date('2024-03-12T14:45:00'),
    likes: 276,
    comments: 45,
    shares: 92,
    tags: ['agriculture', 'sustainability', 'innovation'],
  },
  {
    id: '5',
    author: dummyUsers[4],
    title: 'Renewable Energy Grid Integration',
    content: 'Breaking: Our smart grid system has successfully integrated 80% renewable energy sources without stability issues. This proves the feasibility of 100% renewable energy goals.',
    images: ['https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format'],
    timestamp: new Date('2024-03-11T11:20:00'),
    likes: 423,
    comments: 87,
    shares: 156,
    tags: ['energy', 'grid', 'renewable'],
  },
];

export function Community({ user }: CommunityProps) {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', images: [] as string[] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          // In a real app, you would upload to storage
          const imageUrl = URL.createObjectURL(file);
          setNewPost(prev => ({
            ...prev,
            images: [...prev.images, imageUrl],
          }));
        }
      }
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          id: user.uid,
          name: user.displayName || 'Anonymous',
          avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        },
        title: newPost.title,
        content: newPost.content,
        images: newPost.images,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        tags: [],
      };

      setPosts(prev => [post, ...prev]);
      setNewPost({ title: '', content: '', images: [] });
      setIsPostDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full">
      <Card className="flex h-[calc(100vh-13rem)] flex-col overflow-hidden">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 px-4">
              <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search research posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button className="ml-4">Share Research</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Research</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Research Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    disabled={isLoading}
                  />
                  <Textarea
                    ref={textareaRef}
                    placeholder="Share your findings... (Paste images directly)"
                    className="min-h-[200px] resize-none"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    onPaste={handlePaste}
                    disabled={isLoading}
                  />
                  {newPost.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {newPost.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                          className="h-32 w-full rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsPostDialogOpen(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreatePost}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        'Publish'
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{post.author.name}</h4>
                      <p className="text-sm text-gray-500">
                        {post.timestamp.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{post.content}</p>
                  {post.images.length > 0 && (
                    <div className="mt-4">
                      <img
                        src={post.images[0]}
                        alt="Research"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-6 border-t pt-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                      <MessageSquare className="h-5 w-5" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500">
                      <Share2 className="h-5 w-5" />
                      {post.shares}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}