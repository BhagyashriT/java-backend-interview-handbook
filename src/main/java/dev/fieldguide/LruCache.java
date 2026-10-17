package dev.fieldguide;

import java.util.LinkedHashMap;
import java.util.Map;

/** Simple O(1)-expected LRU operations; intentionally NOT thread-safe. */
public final class LruCache<K,V> extends LinkedHashMap<K,V> {
    private final int capacity;

    public LruCache(int capacity) {
        super(16, 0.75f, true);
        if (capacity < 1) throw new IllegalArgumentException("capacity must be positive");
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
        return size() > capacity;
    }
}
