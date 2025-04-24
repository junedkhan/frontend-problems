interface ICache {
    feature_flags: Record<string, boolean>;
    timestamp: number;
    isFetching: boolean;
    queue: Array<any>;
}

const SAMPLE_FEATURES: Record<string, boolean> = {
    show_dialogue_box: true,
    enable_new_pricing: false,
  };
  
  const CACHE: ICache = {
    feature_flags: {},
    timestamp: 0,
    isFetching: false, // Flag to track if an API call is in progress
    queue: [], // Queue to hold requests while the data is being fetched
  };
  
  const TTL = 5000; // Time-to-live for cache (in milliseconds)
  
  function fetchFeatureFlagsFromAPI(): Promise<Record<string, boolean>> {
    // Simulating an API call to fetch feature flags
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Uncomment to simulate an error
        // reject('Error fetching feature flags');
        resolve(SAMPLE_FEATURES); // Simulate a successful response
      }, 1000); // Mocking network delay
    });
  }
  
  function getFeatureFlag(name: string, defaultValue: boolean) {
    return new Promise((resolve, reject) => {
      // Check if feature flags are cached and still fresh
      const isCachePresent = Object.keys(CACHE.feature_flags).length > 0;
      const isCacheFresh = Date.now() - CACHE.timestamp < TTL;
  
      // If cache is fresh, return the value from cache
      if (isCachePresent && isCacheFresh) {
        console.log('Returning from cache...');
        return resolve(CACHE.feature_flags[name] !== undefined ? CACHE.feature_flags[name] : defaultValue);
      }
  
      // If an API call is already in progress, queue the request
      if (CACHE.isFetching) {
        console.log('API call in progress, queuing request...');
        CACHE.queue.push({ name, resolve, reject, defaultValue });
        return; // Don't resolve immediately, wait for API result
      }
  
      // If cache is expired or no data in cache, make the API call
      console.log('Fetching feature flags from API...');
      CACHE.isFetching = true; // Mark API call as in progress
  
      // Fetch feature flags from the API
      fetchFeatureFlagsFromAPI()
        .then((featureFlags) => {
          // Update cache with the fetched data
          CACHE.feature_flags = featureFlags;
          CACHE.timestamp = Date.now(); // Update the timestamp
          CACHE.isFetching = false; // Reset the fetching flag
  
          // Resolve all queued requests with the fetched data or default value
          CACHE.queue.forEach((queuedRequest) => {
            queuedRequest.resolve(featureFlags[queuedRequest.name] !== undefined ? featureFlags[queuedRequest.name] : queuedRequest.defaultValue);
          });
  
          // Clear the queue after resolving all requests
          CACHE.queue = [];
  
          // Resolve the current request with the fetched data or default value
          resolve(featureFlags[name] !== undefined ? featureFlags[name] : defaultValue);
        })
        .catch((error) => {
          CACHE.isFetching = false; // Reset fetching flag on error
          console.error('Error fetching feature flags:', error);
  
          // Reject all queued requests in case of an error
          CACHE.queue.forEach((queuedRequest) => 
            queuedRequest.resolve(queuedRequest.defaultValue)
          );
          CACHE.queue = [];
  
          // Resolve the current request with the default value in case of error
          resolve(defaultValue);
        });
    });
  }
  
  // Example Usage:
  getFeatureFlag('show_dialogue_box', false).then((value) => {
    console.log('Feature show_dialogue_box:', value);
  });
  
  getFeatureFlag('enable_new_pricing', false).then((value) => {
    console.log('Feature enable_new_pricing:', value);
  });
  
  // Simulate multiple components requesting the same feature flag while the API is being fetched
  setTimeout(() => {
    getFeatureFlag('show_dialogue_box', false).then((value) => {
      console.log('Feature show_dialogue_box (after 2s):', value);
    });
  }, 2000);
  