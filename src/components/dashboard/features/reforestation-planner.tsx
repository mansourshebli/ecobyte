import { User } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, TreePine, Plus } from 'lucide-react';

interface ReforestationPlannerProps {
  user: User;
}

export function ReforestationPlanner({ user }: ReforestationPlannerProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Active Projects</h3>
        <div className="mt-4 space-y-4">
          {[
            {
              name: 'Amazon Restoration',
              location: 'Brazil',
              trees: 5000,
              progress: 65,
            },
            {
              name: 'Highland Recovery',
              location: 'Scotland',
              trees: 2500,
              progress: 40,
            },
          ].map((project) => (
            <div
              key={project.name}
              className="rounded-lg border p-4 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{project.name}</h4>
                <span className="text-sm text-gray-500">{project.progress}%</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {project.location}
                <TreePine className="ml-2 h-4 w-4" />
                {project.trees.toLocaleString()} trees
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Recommended Planting Areas</h3>
        <div className="mt-4 aspect-square rounded-lg border bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-full items-center justify-center text-gray-500">
            Interactive Map Coming Soon
          </div>
        </div>
      </Card>
    </div>
  );
}