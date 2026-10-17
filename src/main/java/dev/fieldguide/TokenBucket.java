package dev.fieldguide;

import java.util.function.LongSupplier;

/** Thread-safe local token bucket; NOT a distributed/global rate limiter. */
public final class TokenBucket {
    private final double capacity;
    private final double refillPerSecond;
    private final LongSupplier monotonicNanos;
    private double tokens;
    private long lastNanos;

    public TokenBucket(double capacity, double refillPerSecond) {
        this(capacity, refillPerSecond, System::nanoTime);
    }

    public TokenBucket(double capacity, double refillPerSecond, LongSupplier clock) {
        if (!(capacity > 0) || !(refillPerSecond > 0)
                || !Double.isFinite(capacity) || !Double.isFinite(refillPerSecond)) {
            throw new IllegalArgumentException("Capacity and refill must be finite positive numbers");
        }
        this.capacity = capacity;
        this.refillPerSecond = refillPerSecond;
        this.monotonicNanos = java.util.Objects.requireNonNull(clock);
        this.tokens = capacity;
        this.lastNanos = clock.getAsLong();
    }

    public synchronized boolean allow() {
        long now = monotonicNanos.getAsLong();
        long elapsed = Math.max(0L, now - lastNanos);
        if (now >= lastNanos) lastNanos = now;
        tokens = Math.min(capacity, tokens + elapsed / 1_000_000_000.0 * refillPerSecond);
        if (tokens < 1.0) return false;
        tokens -= 1.0;
        return true;
    }
}
