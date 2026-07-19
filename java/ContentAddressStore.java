package com.acme.storage.cas;

import java.security.MessageDigest;

public class ContentAddressStore {

    public String addressOf(byte[] blob) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] hash = digest.digest(blob);
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(Character.forDigit((b >> 4) & 0xF, 16));
                sb.append(Character.forDigit(b & 0xF, 16));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    public String shardPath(byte[] blob) {
        String address = addressOf(blob);
        return address.substring(0, 2) + "/" + address.substring(2, 4) + "/" + address;
    }
}
