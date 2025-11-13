// ---------------------------------------------
// Simple In-Memory Cache Class with Metrics
// ---------------------------------------------

class Cache {
  constructor() {
    this.store = new Map();

    // Metrics
    this.hits = 0;
    this.misses = 0;
    this.expired = 0;
  }

  set(key, value) {
    this.store.set(key, value);
  }

  get(key) {
    if (this.store.has(key)) {
      this.hits++;
      return this.store.get(key);
    }
    this.misses++;
    return undefined;
  }

  delete(key) {
    return this.store.delete(key);
  }

  // Metrics accessor
  getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      items: this.store.size,
      expired: this.expired,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = Cache;
