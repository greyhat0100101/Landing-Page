# Modern Futuristic Platform

This repository contains a modular version of the **Modern Futuristic Platform** landing page.  The original HTML file has been broken into reusable pieces and organised into a typical web project structure with a `public` folder.  All styles live in a separate CSS file and the Babylon.js script has been moved into a standalone JavaScript file.

## Repository structure

The project is organised as follows:

```
zentrix-platform/
├── package.json        # Node.js metadata and dependencies
├── server.js           # Express server that serves static files from /public
├── README.md           # This guide
└── public/
    ├── index.html      # Main HTML file
    ├── css/
    │   └── style.css   # All CSS extracted from the original <style> block
    └── js/
        └── main.js     # Babylon.js scene initialisation
```

## Running locally

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.  You should see the modern landing page with the animated Babylon.js background.

The Express server uses `express.static()` to serve everything inside the `public` folder.  According to the Express documentation, you can expose a directory of static assets with a single line of middleware: `app.use(express.static('public'))`【355272206567760†L60-L82】.  This allows images, CSS and JavaScript from `public` to be requested by the browser via simple URLs (e.g., `/css/style.css`).

## Deploying on GitHub

GitHub Pages only supports serving content from either the root of your repository or a special `/docs` folder【430396767846669†L90-L94】.  Since this project keeps its static files under `public`, there are two common approaches:

1. **Publish the root or `/docs` folder:** copy the contents of `public` into a `docs` folder and commit it.  Then, under your repository’s **Settings → Pages** section, choose the branch you want to publish from and select either `/ (root)` or `/docs` as the source【430396767846669†L90-L94】.  Whenever you push changes, GitHub Pages will automatically update your site.
2. **Use GitHub Actions to deploy `public`:** write a workflow that copies the contents of `public` into a deploy folder before the publish step.  For example, you can trigger the workflow on pushes to `main`, run `npm install` if needed, and then copy `public` into a `gh-pages` branch or into the `docs` directory.  See the GitHub Pages documentation for details on custom workflows【430396767846669†L96-L99】.

If you choose to deploy the Node server (for example, to support additional API endpoints), GitHub Pages is not suitable because it only serves static files.  Instead, use a platform that can run Node.js, such as Render.

## Deploying on Render

Render can deploy both static sites and full Node.js applications.  For this project, the easiest method is to deploy the Express server:

1. Push this repository to a Git provider (GitHub, GitLab or Bitbucket).
2. In the Render dashboard, click **New → Web Service** and connect your repository.
3. Set the **Environment** to *Node*.  Leave the **Build Command** as `npm install` (this installs dependencies) and set the **Start Command** to `npm start`.
4. Optionally, set the **Root Directory** to the repository root.  Render will install dependencies and run your Express server.  Because the server uses `express.static()` to serve the `public` directory, all your assets will be available at your site’s domain【355272206567760†L60-L82】.

Alternatively, if you prefer to deploy the site as a static site (without Node), you can create a Render Static Site and set the **Root Directory** to `public`, leave the **Build Command** blank and set the **Publish Directory** to `.`.  This configuration is recommended by Render support when your client files are completely static【277582823470228†L137-L151】.  In this case, Render will upload everything under `public` to its CDN and serve it directly.

## Customisation

Feel free to customise the content, styles or script.  The modular structure makes it straightforward to edit the CSS in `public/css/style.css` or tweak the Babylon.js scene in `public/js/main.js` without touching the HTML.  If you add images or other assets, place them inside `public` and reference them relative to the root (e.g., `<img src="images/my-logo.png" />`).

## License

This project is provided without any specific licensing.  You are free to modify and use it for your personal or commercial projects.  If you do, consider giving credit to the original author, Jorge Ramos.