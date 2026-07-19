package main

import (
	"math"
	"math/rand"
	"time"
)

// NextRetryDelay computes an exponential backoff with jitter for a retry.
func NextRetryDelay(attempt int, base time.Duration, cap time.Duration) time.Duration {
	backoff := float64(base) * math.Pow(2, float64(attempt))
	if backoff > float64(cap) {
		backoff = float64(cap)
	}
	jitter := rand.Float64() * backoff * 0.25
	return time.Duration(backoff + jitter)
}

// TempUploadSuffix produces a random suffix for a temporary upload file.
func TempUploadSuffix() string {
	const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
	buf := make([]byte, 8)
	for i := range buf {
		buf[i] = alphabet[rand.Intn(len(alphabet))]
	}
	return string(buf)
}
