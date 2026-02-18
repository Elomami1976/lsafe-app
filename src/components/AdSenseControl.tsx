import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * Helper to safely set pauseAdRequests on the global adsbygoogle object.
 * Always writes to window.adsbygoogle directly so AdSense sees the change.
 */
function setAdPause(paused: boolean) {
  try {
    // Ensure the global array exists
    if (!window.adsbygoogle) {
      window.adsbygoogle = [] as any;
    }
    (window.adsbygoogle as any).pauseAdRequests = paused ? 1 : 0;
  } catch (_) {
    // AdSense script not loaded yet — safe to ignore
  }
}

/**
 * Pauses / resumes Google AdSense auto-ads based on whether
 * the current page has enough publisher content.
 *
 * Drop this component into any page/state that is content-thin
 * (loading spinners, error screens, empty states) with enabled={false}
 * to prevent ads from appearing on screens without publisher content.
 *
 * Use enabled={true} (or omit) on content-rich pages to allow ads.
 *
 * IMPORTANT: The cleanup function pauses ads (not resumes).  This means
 * during route transitions ads stay paused until the next page explicitly
 * renders <AdSenseControl enabled={true} />.  This eliminates the gap
 * where ads could appear on a blank / transitioning screen.
 */
const AdSenseControl: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (enabled) {
      // Small delay ensures the DOM content has actually painted before
      // we allow AdSense to inject ads.
      const timer = setTimeout(() => {
        if (enabledRef.current) {
          setAdPause(false);
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        // When leaving a content-rich page, PAUSE ads so they don't
        // render during the blank transition between routes.
        setAdPause(true);
      };
    } else {
      // Immediately pause on content-thin screens
      setAdPause(true);
      return () => {
        // Keep ads paused on cleanup — the next page will resume
        // them explicitly if it has content.
        setAdPause(true);
      };
    }
  }, [enabled]);

  return null;
};

export default AdSenseControl;
