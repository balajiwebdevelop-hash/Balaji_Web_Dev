'use client';

import React from 'react';
import { Project, PortfolioAnimationSettings } from '@/types';
import { DesktopScrollPortfolio } from './DesktopScrollPortfolio';
import { MobileScrollPortfolio } from './MobileScrollPortfolio';

interface ScrollPortfolioProps {
  projects: Project[];
  settings?: PortfolioAnimationSettings;
}

export function ScrollPortfolio({ projects, settings }: ScrollPortfolioProps) {
  return (
    <>
      <div className="block md:hidden">
        <MobileScrollPortfolio projects={projects} settings={settings} />
      </div>
      <div className="hidden md:block">
        <DesktopScrollPortfolio projects={projects} settings={settings} />
      </div>
    </>
  );
}

export default ScrollPortfolio;
export { DesktopScrollPortfolio, MobileScrollPortfolio };
