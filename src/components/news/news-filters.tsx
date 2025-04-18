'use client';

import { NewsCategory } from '@/types/news';
import { Badge } from '@/components/ui/badge';

interface NewsFiltersProps {
  selectedCategories: NewsCategory[];
  onCategoryToggle: (category: NewsCategory) => void;
}

const categoryColors = {
  geopolitique: 'bg-red-500',
  economie: 'bg-green-500',
  technologie: 'bg-blue-500',
  science: 'bg-purple-500',
  environnement: 'bg-emerald-500',
} as const;

const categoryLabels: Record<NewsCategory, string> = {
  geopolitique: 'Géopolitique',
  economie: 'Économie',
  technologie: 'Technologie',
  science: 'Science',
  environnement: 'Environnement',
};

export function NewsFilters({ selectedCategories, onCategoryToggle }: NewsFiltersProps) {
  const categories = Object.keys(categoryLabels) as NewsCategory[];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <button
            key={category}
            onClick={() => onCategoryToggle(category)}
            className="focus:outline-none"
          >
            <Badge
              variant={isSelected ? "secondary" : "outline"}
              className={`${
                isSelected ? categoryColors[category] : ''
              } cursor-pointer transition-colors hover:opacity-80`}
            >
              {categoryLabels[category]}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
