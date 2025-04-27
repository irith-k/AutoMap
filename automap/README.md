This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Creating the .env file

First, you must create a new .env file in the root of the project directory and add the following:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORG_ID=your_openai_org_id
OPENAI_PROJECT_ID=your_openai_project_id
```

Please replace the above credentials with those of your own OpenAI API key.

If you do not have an API key/organization/project yet, please complete the following:

1. Visit https://platform.openai.com/
2. Log in to your OpenAI account or create a new account if you do not yet have one.
3. Visit https://platform.openai.com/settings/organization/general and copy your "Organization ID". Paste this here in your .env file:

```bash
OPENAI_ORG_ID=paste_org_id_here
```

4. Press the "Default Project" button in the top left and press "Create Project." You can name this whatever you want, but we recommend something along the lines of "Auto Map."
5. On the https://platform.openai.com/settings page, press "General" under the "Project" tab, and copy your Project ID. Please paste this here in your .env file:

```bash
OPENAI_PROJECT_ID=paste_project_id_here
```

6. Still on the https://platform.openai.com/settings page, and still under the "Project" tab, press the "API Keys" button.
7. Create a new secret key, and please copy the secret key and store it in a secure location. You will NOT be able to view it again. Please paste this here in your .env file:

```bash
OPENAI_API_KEY=paste_api_key_here
```

8. Visit the following page https://platform.openai.com/settings/organization/billing/overview and press "Add to credit balance" to add money to your account. You will NOT be able to use Auto Map unless the OpenAI api has a credit balance. Based on the low-cost nature of Auto Map's LLM usage, we recommend adding $5-20 to start with.
9. (Optional) To ensure the website always has enough of a balance, you can press the "Enable auto recharge" button to automatically add funds to your account if said account becomes fully drained, ensuring that there is never a "pause" in a user's ability to use Auto Map.

Now your .env file is all set! Be sure to "Save" the file before continuing with the steps below to run the app.

### Running the app

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Next, open a new terminal and type in the following to start the backend server:

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
