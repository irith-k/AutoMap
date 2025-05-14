# Our Guide to Deploying Your Next.js Application to Vercel

Link to our Deployment: https://automap-pqeee05g8-maxholschs-projects.vercel.app

Hi there! It's Max, and this guide will walk you through the steps to deploy your Next.js application to Vercel. Vercel is a platform from the creators of Next.js, optimized for deploying Next.js applications.

## Prerequisites

1.  **Vercel Account**: Ensure you have a Vercel account. You can sign up at [vercel.com](https://vercel.com).
2.  **Git Repository**: We will connect this project to our github repository. Vercel uses it for continuous deployment.

## Deployment Steps

1.  **Push Your Code**: Make sure your latest code is pushed to your Git repository.
    ```bash
    git add .
    git commit -m "Max Max Max!!!!!" (or some other message that's more professional)
    git push
    ```

2.  **Import Project on Vercel**:
    *   Go to your Vercel dashboard.
    *   Click on "Add New..." and select "Project".
    *   Vercel will ask to connect to your Git provider. Authorize it if you haven't already.
    *   Select the Git repository for your Next.js project.

3.  **Configure Project**:
    *   Vercel automatically detects Next.js projects. The default settings worked for me, but sometimes need some troubleshooting.
    *   **Framework Preset**: Should be automatically set to "Next.js". This is what we use to build+package everything
    *   **Build and Output Settings**:
        *   **Build Command**: Vercel will normally use `next build` (or your custom build script if specified in `package.json`, e.g., `npm run build`). Since your `package.json` has `"build": "next build"`, this will be used automatically.
        *   **Output Directory**: Vercel knows that Next.js outputs to the `.next` directory. This will be configured automatically, but it's good to keep in mind
        *   **Install Command**: Usually `npm install` or `yarn install`. Vercel will detect `package-lock.json` or `yarn.lock` and use the appropriate command. I use npm for everything
    *   **Environment Variables**:
        *   If your application uses environment variables (e.g., for API keys, database URLs), you need to add them in the Vercel project settings. For example this project uses OPENAI_API_KEY. IT IS VERY VERY VERY IMPORTANT NOT TO HARDCODE THESE INTO YOUR SITE!!!!!
        *   Go to your project settings on Vercel, then navigate to "Environment Variables".
        *   Add your variables here. For example, if you have a `.env.local` or `.env` file, replicate those variables.

4.  **Deploy**:
    *   Click the "Deploy" button, or through the cli type "vercel"
    *   Vercel will start the build process. You can monitor the build logs in real-time through the nifty dashboard.

5.  **Access Your Deployed Site**:
    *   Once the deployment is successful, Vercel will provide you with a URL (or multiple, including a production domain if configured) to access your live application. You can change this anytime later

## Continuous Deployment

By default, Vercel sets up continuous deployment. This is a really really useful feature. This means:
*   Every `git push` to your main branch (e.g., `main`, `master`) will trigger a production deployment.
*   Every `git push` to other branches will create a preview deployment with a unique URL, allowing you to test changes before merging to production.

## Custom Domains

If you have a custom domain, you can configure it in your Vercel project settings under the "Domains" tab.

## Other important stuff

*   **Build Failures**: Check the build logs on Vercel for any errors. Common issues include missing dependencies, incorrect environment variable configuration, or build command errors.
*   **Serverless Function Issues**: If you use Next.js API routes (serverless functions), ensure they adhere to Vercel's function limits and configurations if you do anything highly custom. Getting used to serverless functions and running programs on the edge takes a moment, and I highly recommend diving into the documentation on next.js to learn more.

That's it! That's the majority of what I know, I hope it helps! If you have any questions in the future, don't hesitate to reach out to maxhholschneider@gmail.com, always happy to help
