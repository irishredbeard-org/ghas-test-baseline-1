package com.acme.media.transcode;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

public class MediaConversionRunner {

    private static final Map<String, String> PRESETS = new HashMap<>();

    static {
        PRESETS.put("web-720", "libx264");
        PRESETS.put("web-1080", "libx264");
        PRESETS.put("audio", "aac");
        PRESETS.put("archive", "libx265");
    }

    public Process convert(HttpServletRequest request, String inputPath, String outputPath)
            throws Exception {
        String presetKey = request.getParameter("preset");

        String codec = PRESETS.get(presetKey);
        if (codec == null) {
            codec = PRESETS.get("web-720");
        }

        List<String> command = new ArrayList<>();
        command.add("/usr/bin/ffmpeg");
        command.add("-i");
        command.add(inputPath);
        command.add("-c:v");
        command.add(codec);
        command.add(outputPath);

        ProcessBuilder builder = new ProcessBuilder(command);
        builder.redirectErrorStream(true);
        return builder.start();
    }
}
