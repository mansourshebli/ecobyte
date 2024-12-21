import { useState } from 'react';
import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Shapes,
  Building2,
  Box,
  Palette,
  Sparkles,
  Plus,
  Search,
  ArrowRight,
  Loader2,
} from 'lucide-react';

interface ReGenAIProps {
  user: User;
}

interface Design {
  id: string;
  title: string;
  type: 'product' | 'building' | 'urban';
  description: string;
  sustainability: {
    score: number;
    metrics: {
      energy: number;
      water: number;
      materials: number;
      waste: number;
    };
  };
  status: 'draft' | 'generating' | 'completed';
  preview: string;
}

const designs: Design[] = [
  {
    id: '1',
    title: 'Eco-Friendly Product Packaging',
    type: 'product',
    description: 'Biodegradable packaging design for consumer electronics',
    sustainability: {
      score: 92,
      metrics: {
        energy: 95,
        water: 90,
        materials: 93,
        waste: 90,
      },
    },
    status: 'completed',
    preview: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format',
  },
  {
    id: '2',
    title: 'Green Office Building',
    type: 'building',
    description: 'Net-zero energy office complex with integrated gardens',
    sustainability: {
      score: 88,
      metrics: {
        energy: 90,
        water: 85,
        materials: 87,
        waste: 90,
      },
    },
    status: 'completed',
    preview: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format',
  },
  {
    id: '3',
    title: 'Urban Park Integration',
    type: 'urban',
    description: 'Smart city park design with renewable energy features',
    sustainability: {
      score: 95,
      metrics: {
        energy: 96,
        water: 94,
        materials: 95,
        waste: 95,
      },
    },
    status: 'generating',
    preview: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format',
  },
];

export function ReGenAI({ user }: ReGenAIProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getTypeIcon = (type: Design['type']) => {
    switch (type) {
      case 'product':
        return Box;
      case 'building':
        return Building2;
      case 'urban':
        return Shapes;
      default:
        return Shapes;
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Sustainable Designs</h3>
            <p className="text-sm text-gray-500">
              Generate and optimize eco-friendly designs
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Design
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search designs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {designs.map((design) => (
            <div
              key={design.id}
              className="overflow-hidden rounded-lg border transition-all hover:shadow-lg"
              onClick={() => setSelectedDesign(design)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={design.preview}
                  alt={design.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {getTypeIcon(design.type)({
                      className: 'mr-2 h-4 w-4 inline',
                    })}
                    {design.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span>{design.sustainability.score}</span>
                  </div>
                </div>
                <h4 className="mt-2 font-medium">{design.title}</h4>
                <p className="mt-1 text-sm text-gray-500">
                  {design.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        {selectedDesign ? (
          <Card className="p-6">
            <h3 className="text-lg font-semibold">{selectedDesign.title}</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Sustainability Score</label>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${selectedDesign.sustainability.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {selectedDesign.sustainability.score}%
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                {Object.entries(selectedDesign.sustainability.metrics).map(
                  ([key, value]) => (
                    <div key={key}>
                      <label className="text-sm font-medium capitalize">
                        {key} Efficiency
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{value}%</span>
                      </div>
                    </div>
                  )
                )}
              </div>

              <Button
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Variations
                  </>
                )}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="flex aspect-square items-center justify-center p-6">
            <div className="text-center text-gray-500">
              <Shapes className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2">Select a design to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}