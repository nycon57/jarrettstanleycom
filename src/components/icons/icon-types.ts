import type * as React from 'react';

export type AppIconProps = React.SVGProps<SVGSVGElement> & { size?: number | string };
export type AppIconComponent = React.ComponentType<AppIconProps>;
