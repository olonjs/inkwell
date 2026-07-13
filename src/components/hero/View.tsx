// Layout: Hero=D (EDITORIAL), Features=A (BENTO) on home + C (TIMELINE) on posts index
import React from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { HeroData, HeroSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const Hero: React.FC<{ data: HeroData; settings: HeroSettings }> = ({ data, settings }) => {
  const paddingTop = PADDING_TOP[settings?.paddingTop ?? 'md'];
  const paddingBottom = PADDING_BOTTOM[settings?.paddingBottom ?? 'md'];
  const containerClass = settings?.container === 'fluid' ? 'w-full px-8' : 'max-w-[1200px] mx-auto px-8';

  const sectionTheme = settings?.theme ?? 'dark';
  const SECTION_THEME_VARS: Record<string, { bg: string; text: string; muted: string; surface: string; border: string }> = {
    dark: {
      // Mode-aware default: follows the site-wide toggle via the semantic
      // bridge ([data-theme="light"] override in index.css).
      bg: 'var(--background)',
      text: 'var(--foreground)',
      muted: 'var(--muted-foreground)',
      surface: 'var(--card)',
      border: 'var(--border)',
    },
    light: {
      bg: 'var(--background)',
      text: 'var(--foreground)',
      muted: 'var(--muted-foreground)',
      surface: 'var(--card)',
      border: 'var(--border)',
    },
    accent: {
      bg: 'var(--accent)',
      text: 'var(--accent-foreground)',
      muted: 'var(--accent-foreground)',
      surface: 'var(--accent)',
      border: 'var(--border)',
    },
  };
  const t = SECTION_THEME_VARS[sectionTheme] ?? SECTION_THEME_VARS.dark;

  return (
    <section
      style={{
        '--local-bg': t.bg,
        '--local-text': t.text,
        '--local-text-muted': t.muted,
        '--local-primary': 'var(--primary)',
        '--local-primary-foreground': 'var(--primary-foreground)',
        '--local-accent': 'var(--accent)',
        '--local-border': t.border,
        '--local-surface': t.surface,
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className={`relative z-0 ${paddingTop} ${paddingBottom} bg-[var(--local-bg)]`}
    >
      <div className={containerClass}>
        {data.label && (
          <div
            className="jp-animate-in inline-flex items-center gap-2 bg-[var(--pill-surface)] border border-[var(--pill-border)] px-4 py-1.5 rounded-full text-[0.70rem] font-mono font-semibold text-[var(--pill-text)] tracking-widest uppercase"
            data-jp-field="label"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--local-primary)] jp-pulse-dot" />
            {data.label}
          </div>
        )}
        <h1
          className="jp-animate-in jp-d1 mt-8 max-w-[16ch] font-display font-black text-[clamp(3rem,6vw,5.5rem)] leading-[1.0] tracking-tight text-[var(--local-text)]"
          data-jp-field="title"
        >
          {data.title}{' '}
          {data.titleHighlight && (
            <em className="not-italic text-[var(--local-primary)]" data-jp-field="titleHighlight">
              {data.titleHighlight}
            </em>
          )}
        </h1>
        <p className="jp-animate-in jp-d2 mt-8 max-w-[52ch] text-lg leading-relaxed text-[var(--local-text-muted)]" data-jp-field="subtitle">
          {data.subtitle}
        </p>
        <div className="jp-animate-in jp-d3 mt-10 flex flex-wrap items-center gap-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="rounded-[var(--local-radius-md)] bg-[var(--local-primary)] text-[var(--local-primary-foreground)] hover:opacity-90"
          >
            <a href={data.primaryCta.href} data-jp-field="primaryCta">{data.primaryCta.label}</a>
          </Button>
          {data.secondaryCta && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-[var(--local-radius-md)] border-[var(--local-border)] bg-transparent text-[var(--local-text)] hover:border-[var(--local-accent)]"
            >
              <a href={data.secondaryCta.href} data-jp-field="secondaryCta">{data.secondaryCta.label}</a>
            </Button>
          )}
        </div>
      </div>
      {data.image?.url && (
        <div className="jp-animate-in jp-d4 relative left-1/2 mt-16 w-screen -translate-x-1/2" data-jp-field="image">
          <AspectRatio ratio={21 / 9}>
            <img src={data.image.url} alt={data.image.alt || ''} className="h-full w-full object-cover" />
          </AspectRatio>
        </div>
      )}
    </section>
  );
};
