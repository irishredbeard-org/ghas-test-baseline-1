package com.acme.notifications.templates;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

public class TemplateFileResolver {

    private final Path templateDir;

    public TemplateFileResolver(String baseDir) {
        this.templateDir = new File(baseDir).toPath();
    }

    public String render(String templateName) throws Exception {
        if (templateName == null
                || templateName.contains("..")
                || templateName.startsWith("/")
                || !templateName.matches("[A-Za-z0-9._-]+\\.html")) {
            throw new IllegalArgumentException("unknown template");
        }

        File template = new File(templateDir.toFile(), templateName);
        byte[] content = Files.readAllBytes(template.toPath());
        return new String(content, "UTF-8");
    }
}
