// Global mock for matchMedia
globalThis.matchMedia = globalThis.matchMedia || ((query) => ({
  matches: (globalThis)._mediaMatch ?? false,
  media: query,
  onchange: null,
  addEventListener: (type: string, listener: EventListener) => {
    if (type === "change") {
      (globalThis)._mediaQueryChangeListener = listener;
    }
  },
  removeEventListener: (type: string, listener: EventListener) => {
    if (type === "change" && (globalThis)._mediaQueryChangeListener === listener) {
      delete (globalThis)._mediaQueryChangeListener;
    }
  },
  dispatchEvent: (event: Event) => {
    if ((globalThis)._mediaQueryChangeListener) {
      (globalThis)._mediaQueryChangeListener(event);
    }
    return true;
  },
}));

// Helper to update matchMedia
globalThis.setMatchMedia = (matches: boolean) => {
  (globalThis)._mediaMatch = matches;
  if ((globalThis)._mediaQueryChangeListener) {
    const event = new Event("change");
    (globalThis)._mediaQueryChangeListener(event);
  }
};