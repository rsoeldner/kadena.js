import type { IHeadingProps } from '@kadena/react-ui';
import { Heading as UIHeading } from '@kadena/react-ui';
import type { FC } from 'react';
import { headingClass } from './style.css';

export const Heading: FC<IHeadingProps> = ({ children, ...props }) => {
  return (
    <UIHeading {...props} className={headingClass}>
      {children}
    </UIHeading>
  );
};
