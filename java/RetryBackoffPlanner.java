package com.acme.messaging.retry;

import java.util.Random;

public class RetryBackoffPlanner {

    private static final long BASE_DELAY_MS = 200L;
    private static final long MAX_DELAY_MS = 30000L;

    private final Random random = new Random();

    public long nextDelay(int attempt) {
        long exponential = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * (1L << Math.min(attempt, 10)));
        long jitter = (long) (random.nextDouble() * exponential * 0.25);
        return exponential - jitter;
    }
}
