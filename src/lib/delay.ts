export function delay(_ms: number): Promise<void> {
  return Promise.resolve();
}

export function randomDelay(_min: number, _max: number): Promise<void> {
  return Promise.resolve();
}

// Simulates initial page load
export const pageLoadDelay = () => Promise.resolve();

// Simulates action response (add to cart, etc.)
export const actionDelay = () => Promise.resolve();

// Simulates lazy-loaded secondary sections
export const lazyLoadDelay = () => Promise.resolve();

// Simulates occasional slow response for graceful degradation
export const slowResponseDelay = () => Promise.resolve();
