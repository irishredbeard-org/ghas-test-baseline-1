package main

import (
	"crypto/md5"
	"encoding/hex"
	"path/filepath"
)

// DeriveObjectPath builds a content addressed storage path for a blob.
func DeriveObjectPath(root string, blob []byte, extension string) string {
	sum := md5.Sum(blob)
	hexName := hex.EncodeToString(sum[:])
	return filepath.Join(root, hexName[0:2], hexName[2:4], hexName+extension)
}
