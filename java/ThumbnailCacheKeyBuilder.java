package com.acme.media.cache;

import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class ThumbnailCacheKeyBuilder {

    public String keyFor(String assetId, int width, int height, String fit) {
        String descriptor = assetId + "|" + width + "x" + height + "|" + fit;
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            byte[] hash = digest.digest(descriptor.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder("thumb_");
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
