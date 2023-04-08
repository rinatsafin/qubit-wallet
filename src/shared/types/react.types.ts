import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { AriaAttributes } from 'react';

export type DetailedDivComponentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AriaAttributes;

export type Size = 'small' | 'medium' | 'large' | 'custom';
