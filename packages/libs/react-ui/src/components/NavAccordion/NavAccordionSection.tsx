'use client';

import {
  navAccordionButtonClass,
  navAccordionContentClass,
  navAccordionContentListClass,
  navAccordionSectionWrapperClass,
  navAccordionToggleIconClass,
} from './NavAccordion.css';
import type { INavAccordionGroupProps } from './NavAccordionGroup';
import type { INavAccordionLinkProps } from './NavAccordionLink';

import { SystemIcon } from '@components/Icon';
import classNames from 'classnames';
import type { FC, FunctionComponentElement } from 'react';
import React from 'react';

export interface INavAccordionSectionProps {
  children?: FunctionComponentElement<
    INavAccordionGroupProps | INavAccordionLinkProps
  >[];
  index?: number;
  isOpen?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  title: string;
}

export const NavAccordionSection: FC<INavAccordionSectionProps> = ({
  children,
  isOpen,
  onClick,
  onClose,
  onOpen,
  title,
}) => {
  const handleClick = (): void => {
    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
    onClick?.();
  };
  return (
    <section
      className={navAccordionSectionWrapperClass}
      data-testid="kda-nav-accordion-section"
    >
      <button className={navAccordionButtonClass} onClick={handleClick}>
        {title}
        <SystemIcon.Close
          className={classNames(navAccordionToggleIconClass, {
            isOpen,
          })}
          size="xs"
        />
      </button>

      {isOpen && children && (
        <ul
          className={classNames([
            navAccordionContentClass,
            navAccordionContentListClass,
          ])}
        >
          {children}
        </ul>
      )}
    </section>
  );
};