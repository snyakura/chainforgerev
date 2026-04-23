"use client";

import { useEffect, useRef, memo } from 'react';

function EconomicCalendarWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    
    // Prevent duplicate script injection
    if (container.current.querySelector('script[data-type="calendar-widget"]')) {
      return;
    }

    // Initialize the widget container
    container.current.innerHTML = '<div id="economicCalendarWidget"></div>';

    const script = document.createElement('script');
    script.src = 'https://www.tradays.com/c/js/widgets/calendar/widget.js?v=15';
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.type = 'calendar-widget';
    script.innerHTML = `{"width":"100%","height":"600","mode":"2","fw":"react","lang":"en","theme":1}`;
      
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-[600px] overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md flex flex-col shadow-2xl transition-all duration-500">
      <div 
        ref={container} 
        className="w-full flex-1 overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-gutter:stable]"
        style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        <div id="economicCalendarWidget"></div>
      </div>
      <div className="ecw-copyright p-4 text-center text-[10px] text-muted-foreground opacity-50">
        <a href="https://www.mql5.com/?utm_source=calendar.widget&utm_medium=link&utm_term=economic.calendar&utm_content=visit.mql5.calendar&utm_campaign=202.calendar.widget" rel="noopener nofollow" target="_blank" className="hover:underline">MQL5 Algo Trading Community</a>
      </div>
    </div>
  );
}

export default memo(EconomicCalendarWidget);