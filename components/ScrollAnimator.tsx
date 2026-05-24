'use client';

import { useEffect } from 'react';

export function ScrollAnimator() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(28px)';
      htmlEl.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
