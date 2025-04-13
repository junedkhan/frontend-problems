class LRUCache<K, V> {
    private capacity: number;
    private cache: Map<K, V>;
    constructor(capacity: number) {
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error("Capacity must ne positive number");
        }

        this.capacity = capacity;
        this.cache = new Map<K, V>();
    }

    get(key: K): V | -1 {
        if(!this.cache.has(key)) return -1;

        const value = this.cache.get(key)!;

        //Move to most recently used
        this.cache.delete(key);
        this.cache.set(key, value);

        console.log("this.cache",this.cache);

        return value;
    }

    put(key: K, value: V) {
        if(this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);

        if(this.cache.size > this.capacity) {
            const lru = this.cache.keys().next().value as K;
            this.cache.delete(lru);
        }

        console.log("this.cache",this.cache);
    }

    keys() {
        return Array.from(this.cache.keys());
    }

    size() {
        return this.cache.size;
    }
}

const lruCache = new LRUCache(2);

lruCache.put("hello1", "hello1")
lruCache.put("hello2", "hello2")
lruCache.put("hello3", "hello3")
console.log(lruCache.get("hello1"))