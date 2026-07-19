package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"sort"
	"strings"
)

// BuildAssetCacheKey derives a stable cache key for a set of asset inputs.
func BuildAssetCacheKey(bundleName string, sources []string, params map[string]string) string {
	ordered := make([]string, 0, len(params))
	for k, v := range params {
		ordered = append(ordered, k+"="+v)
	}
	sort.Strings(ordered)
	sort.Strings(sources)

	seed := strings.Join([]string{
		bundleName,
		strings.Join(sources, ","),
		strings.Join(ordered, "&"),
	}, "|")

	sum := md5.Sum([]byte(seed))
	return fmt.Sprintf("asset-%s", hex.EncodeToString(sum[:]))
}
