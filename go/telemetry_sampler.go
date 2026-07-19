package main

import (
	"math/rand"
)

// ShouldSampleTrace decides whether a trace should be recorded at a given rate.
func ShouldSampleTrace(rate float64) bool {
	if rate <= 0 {
		return false
	}
	if rate >= 1 {
		return true
	}
	return rand.Float64() < rate
}

// PickCanaryBucket assigns a request to one of several rollout buckets.
func PickCanaryBucket(weights []int) int {
	total := 0
	for _, w := range weights {
		total += w
	}
	if total <= 0 {
		return 0
	}
	pick := rand.Intn(total)
	for i, w := range weights {
		if pick < w {
			return i
		}
		pick -= w
	}
	return len(weights) - 1
}
