---
title: "5 everyday Git tricks to save time and headaches"
date: "2020-06-18T00:12:03.284Z"
description: ""
category: engineering
status: draft
---

Most developers use git everyday for uses far beyond source control. 

This guide assumes intermediate knowledge of the `git` bash utility.

## The Tricks

```toc
exclude: The Tricks
fromHeading: 1
toHeading: 2
```

## Trick #1: Amended commits

While reviewing your work, it is common to find issues or improvements. It is
simple to incorporate new changes into the latest commit using `git-commit
--amend`:

```bash
# Stage your changes
$ git add [...]
# Commit them to latest commit:
$ git commit --amend --no-edit
```

This will add the latest changes to your previous commit. If you want to make
changes to the commit message, simply omit the `--no-edit` option, and git will
open your editor with commit message to edit.

I use this frequently enough that I added the following alias:

```bash
git config --global alias.cane commit --amend --no-edit
```

## Trick #2: Patch mode (`-p): Granular browsing and actions

The patch flag `-p` can be used with several git commands to varying effect.

### Patched `git log`
Let's take `git-log` as a simple use case, here against the react git repo:

```diff
$ git log -p
commit 090c6ed7515b63c9aa7c42659973bfc179691006 (HEAD -> master, origin/master, origin/HEAD)
Author: YeonJuan <yeonjuan93@naver.com>
Date:   Thu Jun 18 01:29:02 2020 +0900

    [eslint-plugin-react-hooks]: handling sparse array when no-inline callback (#19145)

diff --git a/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js b/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js
index c82042839..9322952fa 100644
--- a/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js
+++ b/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js
@@ -369,6 +369,20 @@ const tests = {
         }
       `,
     },
+    {
+      code: normalizeIndent`
+        function MyComponent({myEffect}) {
+          useEffect(myEffect, [,myEffect]);
+        }
+      `,
+    },
```

While usually `git log` simply outputs high-level commit information, here it includes output of the changes in each commit. This is even more useful when a path is provided:

```diff
$ git log -p README.md
commit d7918f4a9b74a44aa9d665b5860db76914615f89
Author: zefeng <zefengbao@outlook.com>
Date:   Sun Mar 29 22:18:15 2020 +0800

    chore: npm link more directly (#18428)

diff --git a/README.md b/README.md
index a2635458c..d890a3782 100644
--- a/README.md
+++ b/README.md
@@ -16,7 +16,7 @@ React has been designed for gradual adoption from the start, and **you can use a
 * [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html) as a `<script>` tag in one minute.
 * [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html) if you're looking for a powerful JavaScript toolchain.

-You can use React as a `<script>` tag from a [CDN](https://reactjs.org/docs/cdn-links.html), or as a `react` package on [npm](https://www.npmjs.com/).
+You can use React as a `<script>` tag from a [CDN](https://reactjs.org/docs/cdn-links.html), or as a `react` package on [npm](https://www.npmjs.com/package/react).

 ## Documentation
```

This is useful for tracking down when or how a particular file changed over time.

### Patched `git-add`
Another great use of the patch flag is with `git add`:

```bash
$ git add -p
diff --git a/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js b/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js
index c82042839..9322952fa 100644
--- a/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js
+++ b/packages/eslint-plugin-react-hooks/__tests__/ESLintRuleExhaustiveDeps-test.js
@@ -369,6 +369,20 @@ const tests = {
         }
       `,
     },
+    {
+      code: normalizeIndent`
+        function MyComponent({myEffect}) {
+          useEffect(myEffect, [,myEffect]);
+        }
+      `,
+    },
+    {
+      code: normalizeIndent`
+        function MyComponent({myEffect}) {
+          useEffect(myEffect, [,myEffect,,]);
+        }
+      `,
+    },
     {
       code: normalizeIndent`
         let local = {};
Stage this hunk [y,n,q,a,d,e,?]?
```

When the `-p` flag is provided to git add, changes are displayed for interactive
staging. This is useful when you make many changes without making commits along
the way. You can effectively group changes into commits based on the effect,
resulting in a clean, easy-to-follow git history for posterity. Which is what
everyone wants and needs.

### Other uses

The patch flag can also be used with `git-checkout` and `git-reset`.

Checkouts are useful to pull changes from a branch (for example, a spike branch)
into a feature branch when you want to make the changes permanent. You can event
`git checkout -p stash@{0}` to checkout from a stash!

Patch can be used with git reset to reset staged changes that you do not want to
commit at this time. Or it can be used for partial `--soft` and `--hard` resets.

## Trick #3: Travel through time with the reflog

```bash
$ git co -b git-tricks
Switched to a new branch 'git-tricks'
$ git commit --allow-empty -m "An empty commit"
[git-tricks 92ef2ba] An empty commit
$ git reflog
92ef2ba (HEAD -> git-tricks) HEAD@{0}: commit: An empty commit
7ed0f97 (origin/master, origin/HEAD, master) HEAD@{1}: checkout: moving from
master to git-tricks
```

## Trick #4: Easy branch renaming

This is a quick one. If you don't like the name of your branch, simply rename it
with:

```bash
git branch -m your-new-branch-name
```

## Trick #5: ???


