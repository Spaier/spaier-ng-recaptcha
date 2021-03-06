# Contributing

Based on https://www.conventionalcommits.org

## Commit message structure

type and subject is mandatory.
scope is optional.
no dot in the end.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Example:

```
feat(sample): add v3 reCAPTCHA example
```

## Commit types

Commit message must start in a following format

- **benchmark**: Add benchmarks or correcting existing benchmarks
- **build**: Changes that affect the build system or external dependencies
- **chore**: Other changes that don't modify src or test files
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **improvement**: Improve a current implementation without adding a new feature or fixing a bug
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: `reverts commit <hash>`
- **release**: A new release
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

## Commit scopes

- Visual Studio project
- Node project name
- Angular CLI project name
- Build system(VSTS, travis, etc...)
- Documentation file(readme, changelog, etc...)

## Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

## Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.
