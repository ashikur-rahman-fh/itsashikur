'use client';

import { useState } from 'react';

import { Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../config/site-links';
import { featuredRecommendations, moreRecommendations } from '../data/recommendations';
import { sectionCopy } from '../data/portfolio';
import { RecommendationCard } from './RecommendationCard';

const linkedInCtaLabel = 'View full recommendations on LinkedIn';
const linkedInCtaAriaLabel = 'View Ashikur Rahman’s full LinkedIn recommendations';

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 opacity-70"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function RecommendationsSection() {
  const [showMore, setShowMore] = useState(false);
  const morePanelId = 'recommendations-more-panel';

  return (
    <Section
      id="recommendations"
      heading={{
        eyebrow: 'Peer feedback',
        title: sectionCopy.recommendations.title,
        description: sectionCopy.recommendations.description,
      }}
    >
      <div className="layout-card-grid lg:grid-cols-3">
        {featuredRecommendations.map((item, index) => (
          <Reveal key={item.id} delay={index * 60} fill>
            <RecommendationCard
              name={item.name}
              role={item.role}
              relationship={item.relationship}
              date={item.date}
              quote={item.quote}
              fullQuote={item.fullQuote}
            />
          </Reveal>
        ))}
      </div>

      {moreRecommendations.length > 0 ? (
        <div className="mt-10 space-y-6 sm:mt-12">
          <div className="flex justify-center">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center px-2 text-ui font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              aria-expanded={showMore}
              aria-controls={morePanelId}
              onClick={() => setShowMore((value) => !value)}
            >
              {showMore
                ? 'Show fewer recommendations'
                : `Show ${moreRecommendations.length} more recommendations`}
            </button>
          </div>
          {showMore ? (
            <div
              id={morePanelId}
              className="layout-card-grid md:grid-cols-2"
              role="region"
              aria-label="Additional recommendations"
            >
              {moreRecommendations.map((item, index) => (
                <Reveal key={item.id} delay={index * 60} fill>
                  <RecommendationCard
                    name={item.name}
                    role={item.role}
                    relationship={item.relationship}
                    date={item.date}
                    quote={item.quote}
                    fullQuote={item.fullQuote}
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-10 flex justify-center sm:mt-12">
        <a
          href={siteLinks.linkedinRecommendationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={linkedInCtaAriaLabel}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 px-2 text-body-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {linkedInCtaLabel}
          <ExternalLinkIcon />
        </a>
      </div>
    </Section>
  );
}
