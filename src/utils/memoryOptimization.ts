/**
 * Memory Optimization Utilities for MSS Frontend
 * เครื่องมือสำหรับ optimize memory usage
 */

import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook สำหรับ cleanup event listeners และ prevent memory leaks
 */
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: EventTarget
) {
  const savedHandler = useRef<(event: Event) => void>(null!);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;
    
    const targetElement = element || window;
    const isSupported = targetElement && targetElement.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current?.(event);
    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

/**
 * Hook สำหรับ debounce functions เพื่อลด memory usage
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook สำหรับ throttle functions
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(Date.now());

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
}

/**
 * Hook สำหรับ cleanup timers และ intervals
 */
export function useTimer() {
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());

  const addTimer = useCallback((timer: NodeJS.Timeout) => {
    timersRef.current.add(timer);
  }, []);

  const clearTimer = useCallback((timer: NodeJS.Timeout) => {
    clearTimeout(timer);
    timersRef.current.delete(timer);
  }, []);

  const setTimeout = useCallback((callback: () => void, delay: number) => {
    const timer = global.setTimeout(() => {
      callback();
      timersRef.current.delete(timer);
    }, delay);
    
    addTimer(timer);
    return timer;
  }, [addTimer]);

  const setInterval = useCallback((callback: () => void, delay: number) => {
    const timer = global.setInterval(callback, delay);
    addTimer(timer);
    return timer;
  }, [addTimer]);

  useEffect(() => {
    return () => {
      // Cleanup all timers when component unmounts
      timersRef.current.forEach(timer => {
        clearTimeout(timer);
      });
      timersRef.current.clear();
    };
  }, []);

  return { setTimeout, setInterval, clearTimer };
}

/**
 * Hook สำหรับ intersection observer ที่ memory-safe
 */
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => callbackRef.current(entries),
      options
    );

    observerRef.current.observe(element);
  }, [options]);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { observe, disconnect };
}

/**
 * Hook สำหรับ prevent memory leaks ใน async operations
 */
export function useAsyncEffect(
  effect: (signal: AbortSignal) => Promise<void> | void,
  deps: React.DependencyList
) {
  useEffect(() => {
    const abortController = new AbortController();
    
    const runEffect = async () => {
      try {
        await effect(abortController.signal);
      } catch (error) {
        // Ignore AbortError
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Async effect error:', error);
        }
      }
    };

    runEffect();

    return () => {
      abortController.abort();
    };
  }, deps);
}

/**
 * Memory-optimized image loading hook
 */
export function useImagePreloader(imageSources: string[]) {
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((src: string): Promise<void> => {
    if (preloadedImages.current.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      const cleanup = () => {
        img.onload = null;
        img.onerror = null;
      };

      img.onload = () => {
        preloadedImages.current.add(src);
        cleanup();
        resolve();
      };

      img.onerror = () => {
        cleanup();
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (sources: string[]) => {
    const promises = sources.map(src => preloadImage(src));
    
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  useEffect(() => {
    if (imageSources.length > 0) {
      preloadImages(imageSources);
    }
  }, [imageSources, preloadImages]);

  return { preloadImage, preloadImages };
}

/**
 * Memory usage monitor (development only)
 */
export function useMemoryMonitor(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const logMemory = () => {
        if ((performance as any).memory) {
          console.log(`[${componentName}] Memory:`, {
            used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024) + 'MB',
            limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
          });
        }
      };

      console.log(`[${componentName}] Component mounted`);
      logMemory();

      return () => {
        console.log(`[${componentName}] Component unmounted`);
        logMemory();
      };
    }
  }, [componentName]);
}
