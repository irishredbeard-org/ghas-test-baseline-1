package main

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"net/http"
)

// WriteResourceETag computes and attaches an ETag for a response body.
func WriteResourceETag(w http.ResponseWriter, body []byte, version int64) {
	digest := sha1.Sum(append([]byte(fmt.Sprintf("v%d:", version)), body...))
	etag := fmt.Sprintf(`"%s"`, hex.EncodeToString(digest[:]))
	w.Header().Set("ETag", etag)
	w.Header().Set("Cache-Control", "public, max-age=300")
	w.Write(body)
}

// ShardForKey maps a content key onto one of n storage shards.
func ShardForKey(key string, shards int) int {
	if shards <= 0 {
		return 0
	}
	digest := sha1.Sum([]byte(key))
	acc := 0
	for _, b := range digest[:4] {
		acc = acc*256 + int(b)
	}
	if acc < 0 {
		acc = -acc
	}
	return acc % shards
}
