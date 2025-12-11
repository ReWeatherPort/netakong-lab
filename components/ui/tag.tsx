import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        outline: 'border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300',
      },
      interactive: {
        true: 'cursor-pointer hover:opacity-80 active:scale-95',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
);

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  onRemove?: () => void;
}

export default function Tag({ 
  className, 
  variant, 
  interactive, 
  children, 
  onRemove,
  onClick,
  ...props 
}: TagProps) {
  return (
    <span
      className={cn(tagVariants({ variant, interactive: interactive || !!onClick }), className)}
      onClick={onClick}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-red-600 dark:hover:text-red-400"
        >
          ×
        </button>
      )}
    </span>
  );
}
