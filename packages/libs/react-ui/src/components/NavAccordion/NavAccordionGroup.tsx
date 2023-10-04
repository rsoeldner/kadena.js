'use client';

import {
  navAccordionArrowButtonClass,
  navAccordionButtonClass,
  navAccordionGroupClass,
  navAccordionGroupIconClass,
  navAccordionGroupListClass,
  navAccordionGroupTitleClass,
} from './NavAccordion.css';
import type { INavAccordionLinkProps } from './NavAccordionLink';

import { SystemIcon } from '@components/Icon';
import classNames from 'classnames';
import type { FC, FunctionComponentElement } from 'react';
import React, { useState } from 'react';

export interface INavAccordionGroupProps {
  children: FunctionComponentElement<INavAccordionLinkProps>[];
  index?: number;
  onClose?: () => void;
  onOpen?: () => void;
  title: string;
}

export const NavAccordionGroup: FC<INavAccordionGroupProps> = ({
  children,
  onClose,
  onOpen,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (): void => {
    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className={classNames([navAccordionGroupClass])}>
      <button
        className={classNames([
          navAccordionButtonClass,
          navAccordionArrowButtonClass,
        ])}
        onClick={handleClick}
      >
        <SystemIcon.ChevronDown
          className={classNames(navAccordionGroupIconClass, {
            isOpen,
          })}
          size="sm"
        />
        <span className={navAccordionGroupTitleClass}>{title}</span>
      </button>
      {isOpen && children && (
        <ul className={navAccordionGroupListClass}>
          {React.Children.map(children, (section) =>
            React.cloneElement(
              section as React.ReactElement<
                INavAccordionLinkProps,
                React.JSXElementConstructor<INavAccordionLinkProps>
              >,
              {
                deepLink: true,
                active: section.props.active,
              },
            ),
          )}
        </ul>
      )}
    </div>
  );
};