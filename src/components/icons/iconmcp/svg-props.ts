import type { SVGProps } from 'react';
import type { AppIconProps } from '../icon-types';

/**
 * The props API matches the lucide-react icons it replaces: `size` (default 24) sets width and height,
 * `className` (e.g. `size-4`) overrides it, `color` tints through currentColor, and every other prop
 * (aria-*, ref, onClick, style...) lands on the <svg>. Decorative by default: aria-hidden unless the
 * caller labels the icon.
 */
export function iconSvgProps({ size = 24, ...rest }: AppIconProps, viewBox: string): SVGProps<SVGSVGElement> {
  const labelled = rest['aria-label'] != null || rest['aria-labelledby'] != null;
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox,
    'aria-hidden': labelled ? undefined : true,
    ...rest,
  };
}

/**
 * IconMCP line icons on their 16-unit grid. `strokeWidth` is in grid units: 1 is the regular weight
 * (owner ruling 2026-11-06), which reads like lucide's default 2 on its 24-unit grid, so halve a lucide
 * strokeWidth when swapping (lucide 3 -> 1.5).
 */
export function lineIconProps(props: AppIconProps): SVGProps<SVGSVGElement> {
  return iconSvgProps(
    { fill: 'none', stroke: 'currentColor', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    '0 0 16 16',
  );
}

export const strokeOf = (props: AppIconProps) => Number(props.strokeWidth ?? 1);
