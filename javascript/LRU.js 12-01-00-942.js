var LRUCache = /** @class */ (function () {
    function LRUCache(capacity) {
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error("Capacity must ne positive number");
        }
        this.capacity = capacity;
        this.cache = new Map();
    }
    LRUCache.prototype.get = function (key) {
        if (!this.cache.has(key))
            return -1;
        var value = this.cache.get(key);
        //Move to most recently used
        this.cache.delete(key);
        this.cache.set(key, value);
        console.log("this.cache", this.cache);
        return value;
    };
    LRUCache.prototype.put = function (key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            var lru = this.cache.keys().next().value;
            this.cache.delete(lru);
        }
        console.log("this.cache", this.cache);
    };
    LRUCache.prototype.keys = function () {
        return Array.from(this.cache.keys());
    };
    LRUCache.prototype.size = function () {
        return this.cache.size;
    };
    return LRUCache;
}());
var lruCache = new LRUCache(2);
lruCache.put("hello1", "hello1");
lruCache.put("hello2", "hello2");
lruCache.put("hello3", "hello3");
console.log(lruCache.get("hello1"));
