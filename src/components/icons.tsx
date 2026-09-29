export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.97 0-.88.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.83a7.5 7.5 0 0 1 4 0c1.53-1.05 2.2-.83 2.2-.83.44 1.11.16 1.93.08 2.13.52.56.83 1.27.83 2.15 0 3.09-1.87 3.76-3.66 3.96.29.25.54.73.54 1.48l-.01 2.2c0 .21.14.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

export function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 4H4.5A1.5 1.5 0 0 0 3 5.5v6A1.5 1.5 0 0 0 4.5 13h6a1.5 1.5 0 0 0 1.5-1.5V10M9 3h4v4M13 3 7 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.5 5.5A1.5 1.5 0 1 0 3.5 2.5a1.5 1.5 0 0 0 0 3ZM2.2 6.7h2.6V13.5H2.2Zm4.3 0h2.5v.93h.03c.35-.62 1.2-1.28 2.47-1.28 2.64 0 3.13 1.65 3.13 3.79v3.36h-2.6v-2.98c0-.71-.01-1.62-1-1.62-1 0-1.15.76-1.15 1.57v3.03h-2.6Z" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className={className} aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className={className} aria-hidden="true">
      <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 1.3l1.9 4.2 4.5.5-3.4 3.1.9 4.5L8 11.4l-4 2.2.9-4.5-3.4-3.1 4.5-.5Z" />
    </svg>
  );
}

export function ForkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className={className} aria-hidden="true">
      <circle cx="4" cy="3.2" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="3.2" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="12.8" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 4.5v1.8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4.5M8 8.3v3.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
