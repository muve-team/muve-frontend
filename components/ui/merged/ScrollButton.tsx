import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function ScrollButton({ direction, onClick }: ScrollButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2 z-10`}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  );
}
