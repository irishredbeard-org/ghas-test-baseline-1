package com.acme.observability.sampling;

import java.util.Random;

public class TelemetrySamplingFilter {

    private final Random random = new Random();
    private final double sampleRate;

    public TelemetrySamplingFilter(double sampleRate) {
        this.sampleRate = sampleRate;
    }

    public boolean shouldRecord() {
        return random.nextDouble() < sampleRate;
    }

    public String tempSpanSuffix() {
        return Integer.toHexString(random.nextInt(0x1000000));
    }
}
