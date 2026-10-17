# Publish to your own GitHub repository in 5–10 minutes

1. Go to https://github.com/new and choose repository name `java-backend-interview-handbook` under your `BhagyashriT` account. Make it **Public** so engineers can use the resource. Select **Add a README** = **No** (the ZIP already includes one). Create repository.
2. Extract the downloaded ZIP on your computer. Open the `java-backend-interview-handbook` folder inside it.
3. In the GitHub repository, click **uploading an existing file** (or Add file → Upload files). Drag the **contents of the extracted folder**, including its subfolders, not the ZIP itself. On some systems hidden files (`.github`, `.gitignore`) require showing hidden files; they are useful but the site functions without them.
4. Commit to `main`. Check that `README.md`, `java/`, `system-design/`, `src/` and `docs/` are directly at the repository root (not nested inside another folder).
5. Go to **Settings → Pages → Build and deployment**, select `Deploy from a branch`, `main`, `/docs` and click Save. Wait for the initial deployment to complete.
6. Visit https://bhagyashrit.github.io/java-backend-interview-handbook/ and check study questions, topic filtering, and links to GitHub notes.
7. Pin the repository to your GitHub profile only after you've personally reviewed the explanations and fixed anything you don't understand.

**Important:** This is a new repository, separate from `BhagyashriT.github.io` (your personal portfolio). Do **not** replace the current portfolio site's `index.html` with the handbook's study-site index.

**Optional CLI path** if familiar with Git:

```bash
cd java-backend-interview-handbook
git init
git add .
git commit -m "Launch original Java and backend interview handbook"
git branch -M main
git remote add origin https://github.com/BhagyashriT/java-backend-interview-handbook.git
git push -u origin main
```

Only use the CLI flow after creating the empty GitHub repository; the web UI upload is completely sufficient.
