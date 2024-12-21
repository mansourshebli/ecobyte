import { User } from 'firebase/auth';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Mic, Volume2, Save, Tag, Trash2, Search, Plus } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: Date;
}

interface GaiaAssistantProps {
  user: User;
}

export function GaiaAssistant({ user }: GaiaAssistantProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Carbon Footprint Analysis',
      content: 'Discussion about reducing personal carbon emissions through daily habits.',
      tags: ['carbon', 'lifestyle'],
      timestamp: new Date('2024-03-15'),
    },
    {
      id: '2',
      title: 'Renewable Energy Options',
      content: 'Overview of solar and wind power implementation for residential use.',
      tags: ['energy', 'solar'],
      timestamp: new Date('2024-03-14'),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags))
  );

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every((tag) => note.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <Card className="flex flex-col p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
            <Bot className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Meet Nova</h3>
            <p className="text-sm text-gray-500">Your Environmental AI Assistant</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <h4 className="flex items-center gap-2 font-medium">
              <Mic className="h-5 w-5 text-emerald-600" />
              Voice Interaction
            </h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Speak naturally with Nova about environmental topics, sustainability practices,
              and get real-time eco-friendly recommendations.
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <h4 className="flex items-center gap-2 font-medium">
              <Volume2 className="h-5 w-5 text-emerald-600" />
              Key Features
            </h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Environmental impact assessment of daily activities</li>
              <li>• Personalized sustainability recommendations</li>
              <li>• Real-time carbon footprint calculations</li>
              <li>• Local environmental data and insights</li>
              <li>• Connection to global environmental databases</li>
            </ul>
          </div>
        </div>

        <iframe
          id="audio_iframe"
          src="https://widget.synthflow.ai/widget/v2/1732355757189x964081562672625500/1732355757082x249353215320778700"
          allow="microphone"
          className="mt-6 h-[400px] w-full rounded-lg border"
          style={{ border: 'none', background: 'transparent' }}
        />
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Saved Notes</h3>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{note.title}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {note.content}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteNote(note.id)}
                    className="h-8 w-8 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {note.timestamp.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}