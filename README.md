# baseline-services

A collection of small, self-contained service handlers across several languages
(JavaScript, TypeScript, Python, Java, Go, C#). Each module implements a narrow
piece of typical back-office functionality — report sorting, invoice export,
avatar storage, audit logging, customer lookup, outbound integrations, and so on.

## Layout

| Directory | Language |
|-----------|----------|
| `javascript/` | Node.js handlers |
| `typescript/` | TypeScript handlers |
| `python/` | Flask-style handlers |
| `java/` | Servlet / Spring-style classes |
| `go/` | net/http handlers |
| `csharp/` | ASP.NET-style controllers |

## Build & tooling

Dependencies are declared per ecosystem (`package.json`, `go.mod`,
`python/requirements.txt`, `java/pom.xml`, `csharp/*.csproj`). Code scanning runs
via the workflow in `.github/workflows/`.
