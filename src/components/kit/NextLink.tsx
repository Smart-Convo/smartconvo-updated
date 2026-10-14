import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Link({ href, children, ...rest }: { href: string; children?: React.ReactNode; [k: string]: any }) {
  return <RouterLink to={href} {...rest}>{children}</RouterLink>;
}
