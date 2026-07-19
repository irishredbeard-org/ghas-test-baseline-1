package com.acme.ops.backup;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

public class BackupJobLauncher {

    private static final Set<String> ALLOWED_TARGETS = new HashSet<>(Arrays.asList(
            "postgres", "redis", "elastic", "config"));

    public Process launch(String target) throws Exception {
        if (!ALLOWED_TARGETS.contains(target)) {
            throw new IllegalArgumentException("unsupported backup target");
        }

        List<String> command = new ArrayList<>();
        command.add("/opt/acme/bin/run-backup.sh");
        command.add("--target");
        command.add(target);

        return new ProcessBuilder(command).start();
    }
}
