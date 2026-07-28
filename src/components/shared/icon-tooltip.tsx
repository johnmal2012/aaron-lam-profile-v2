import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Side = 'top' | 'right' | 'bottom' | 'left';

interface IconTooltipProps {
  tooltip: string;
  side?: Side;
  children: React.ReactNode;
}

export function IconTooltip({
  tooltip,
  side = 'top',
  children,
}: IconTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>

      <TooltipContent side={side}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}