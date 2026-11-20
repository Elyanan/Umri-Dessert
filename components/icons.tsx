import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function Sparkle(props: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0c.9 7.5 4.5 11.1 12 12-7.5.9-11.1 4.5-12 12C11.1 16.5 7.5 12.9 0 12 7.5 11.1 11.1 7.5 12 0Z" /></svg>;
}

export function Chevron(props: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}><path d="M6 9l6 6 6-6" /></svg>;
}

export function Pin(props: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
}
