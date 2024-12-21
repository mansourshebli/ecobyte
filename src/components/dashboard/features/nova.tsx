import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import {Search, Trash2, ChevronDown, ChevronUp, Leaf, Droplets, Zap, Wind, Sun, TreeDeciduous, Recycle, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

interface NovaProps {
  user: User;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: Date;
  userId: string;
}

const tagColors = {
  sustainability: { icon: Leaf, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' },
  water: { icon: Droplets, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
  energy: { icon: Zap, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
  climate: { icon: Wind, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' },
  solar: { icon: Sun, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
  forestry: { icon: TreeDeciduous, color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
  recycling: { icon: Recycle, color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300' },
  industrial: { icon: Factory, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300' },
};

export function Nova({ user }: NovaProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags] = useState<string[]>([]);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[],
  });

  useEffect(() => {
    const q = query(
      collection(db, 'notes'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        })) as Note[];

      setNotes(notesData.filter(note => note.userId === user.uid));
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.content) return;
    
    try {
      await addDoc(collection(db, 'notes'), {
        ...newNote,
        userId: user.uid,
        timestamp: new Date(),
      });
      setNewNote({ title: '', content: '', tags: [] });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const toggleTag = (tag: string) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => note.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="grid h-[calc(100vh-13rem)] gap-6 lg:grid-cols-[600px_1fr]">
      <Card className="flex flex-col overflow-hidden">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
          <p className="text-sm text-gray-500">Track your environmental insights</p>
        </div>

        <div className="border-b p-4">
          <div className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              className="dark:bg-gray-800"
            />
            <Textarea
              placeholder="Take notes while chatting with Nova..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[100px] resize-none dark:bg-gray-800"
            />
            <div className="flex flex-wrap gap-2">
              {Object.entries(tagColors).map(([tag, { icon: Icon, color }]) => (
                <Badge
                  key={tag}
                  variant={newNote.tags.includes(tag) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer capitalize',
                    newNote.tags.includes(tag) && color
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  <Icon className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            <Button 
              onClick={handleCreateNote}
              disabled={!newNote.title || !newNote.content}
              className="w-full"
            >
              Create Note
            </Button>
          </div>
        </div>

        <div className="border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 dark:bg-gray-800"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{note.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {note.tags.map((tag) => {
                          const TagIcon = tagColors[tag as keyof typeof tagColors]?.icon;
                          return (
                            <Badge
                              key={tag}
                              className={cn(
                                'capitalize',
                                tagColors[tag as keyof typeof tagColors]?.color
                              )}
                            >
                              {TagIcon && <TagIcon className="mr-1 h-3 w-3" />}
                              {tag}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteNote(note.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setExpandedNoteId(expandedNoteId === note.id ? null : note.id)}
                        className="h-8 w-8"
                      >
                        {expandedNoteId === note.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {expandedNoteId === note.id && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                      <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                        {note.content}
                      </p>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    {note.timestamp?.toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex flex-col overflow-hidden">
        <iframe
          id="audio_iframe"
          src="https://widget.synthflow.ai/widget/v2/1732355757189x964081562672625500/1732355757082x249353215320778700"
          allow="microphone"
          className="h-full w-full border-0 bg-transparent"
        />
      </Card>
    </div>
  );
}