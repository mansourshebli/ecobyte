import { cn } from '@/lib/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function Link({ href, className, children, ...props }: LinkProps) {
  // For external links
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={cn('transition-colors hover:text-emerald-600', className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // For internal navigation (simplified for now)
  return (
    <a href={href} className={cn('transition-colors hover:text-emerald-600', className)} {...props}>
      {children}
    </a>
  );
}