type Props = { name: 'pulse' | 'shield' | 'spark' | 'graph' | 'bell' | 'cube'; className?: string };

export function Icon({ name, className = 'w-5 h-5' }: Props) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
  };

  switch (name) {
    case 'pulse':
      return (
        <svg {...common}>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2" />
        </svg>
      );
    case 'graph':
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M6 16l4-6 4 3 4-8" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 1 1 12 0v4l2 3H4l2-3V8z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case 'cube':
      return (
        <svg {...common}>
          <path d="M12 3l8 4v10l-8 4-8-4V7l8-4z" />
          <path d="M4 7l8 4 8-4M12 11v10" />
        </svg>
      );
  }
}
