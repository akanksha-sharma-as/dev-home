# Deployment Runbook

This project has two deployed services:

- Frontend: Vercel
- Backend: Render Docker Web Service
- Repository: https://github.com/akanksha-sharma-as/dev-home

## 1. Before changing backend code

1. Make the change under `java-mastery/backend`.
2. Keep secrets out of source code. Use environment variables for API keys and deployment settings.
3. Check that the Docker build still uses Java 11 from `backend/Dockerfile`.
4. Run the frontend build if the change affects shared contracts or frontend behavior:

```powershell
cd D:\Code-Work\site\Dev-dojo\java-mastery\frontend
npm run build
```

5. If Maven is installed locally, build the backend:

```powershell
cd D:\Code-Work\site\Dev-dojo\java-mastery\backend
mvn clean package -DskipTests
```

If Maven is not installed locally, Render will build Maven inside the Docker image. The Docker build is still required to pass on Render.

## 2. Commit and push the change

From the repository root:

```powershell
cd D:\Code-Work\site\Dev-dojo
git status
git add java-mastery/backend
git commit -m "Describe the backend change"
git push origin main
```

Only stage the files related to the change. Do not commit `node_modules`, `dist`, `target`, `.env`, or API keys.

## 3. Deploy the backend on Render

The Render service must be configured as Docker, not Ruby or Java auto-detection.

1. Open the Render backend service.
2. Confirm the service is connected to `akanksha-sharma-as/dev-home` on branch `main`.
3. Confirm these settings:

```text
Runtime: Docker
Root Directory: java-mastery/backend
Dockerfile Path: Dockerfile
Docker Context Directory: .
```

4. Open **Manual Deploy**.
5. Select **Deploy latest commit**.
6. Open the deployment logs.
7. Wait for these kinds of messages:

```text
Started JavaMasteryApplication
Tomcat started on port 8080
Your service is live
```

The current backend URL is:

```text
https://dev-home-1.onrender.com
```

The free Render instance can sleep when inactive. The first request after sleeping may take up to about a minute.

## 4. Render environment variables

Keep these variables in Render's Environment settings:

```text
CORS_ALLOWED_ORIGINS=https://dev-home-chi.vercel.app
```

If the quiz generation endpoint uses Claude, also set:

```text
ANTHROPIC_API_KEY=your_actual_key
```

Never place the real API key in Git, `.env.example`, source files, screenshots, or chat messages.

After changing environment variables, save them and trigger a new deploy if Render does not restart the service automatically.

## 5. Deploy frontend changes

Vercel is connected to the same GitHub repository and should deploy automatically after a push.

The Vercel project should use:

```text
Framework Preset: Vite
Root Directory: java-mastery/frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The Vercel environment variable should be:

```text
VITE_API_URL=https://dev-home-1.onrender.com
```

If Vercel does not deploy automatically:

1. Open the Vercel project.
2. Open **Deployments**.
3. Select **Redeploy** for the latest commit.
4. Ensure the environment variable is configured for **Production**.

## 6. When frontend and backend both change

Use this order:

1. Push the backend change.
2. Deploy and verify the backend on Render.
3. Push the frontend change.
4. Wait for Vercel to deploy.
5. Test the production frontend.

For API contract changes, deploy backend-compatible behavior first. Deploy the frontend second so it never calls an endpoint that does not exist yet.

## 7. Production verification checklist

Open the deployed frontend:

```text
https://dev-home-chi.vercel.app/
```

Check:

- Home page loads.
- Java, Spring Boot, and DSA set links open the correct content.
- Dashboard loads without console errors.
- Practice and quiz pages load.
- Random Quiz can call the backend.
- Theme switching works.
- Mobile layout works at a narrow viewport.
- Browser DevTools Network tab has no failed `/api` requests.
- Render logs show no startup or CORS errors.

The random quiz backend endpoint is:

```text
POST https://dev-home-1.onrender.com/api/quiz/generate
```

## 8. If deployment fails

1. Open the failed deployment logs in Render or Vercel.
2. Identify the first error, not only the final failure line.
3. Common backend issues:
   - Render runtime changed from Docker.
   - Root directory is wrong.
   - Dockerfile path is wrong.
   - Required environment variable is missing.
   - Java or Maven build error.
   - Port is not using `${SERVER_PORT:8080}`.
4. Common frontend issues:
   - Root directory is not `java-mastery/frontend`.
   - `npm run build` fails.
   - `VITE_API_URL` is missing or incorrect.
   - Render CORS does not contain the Vercel URL.

## 9. Rollback

If the latest deployment breaks production:

1. Open the GitHub commit history.
2. Identify the last known working commit.
3. In Render or Vercel, use the deployment for that commit and select **Rollback** or redeploy it.
4. Fix the issue locally.
5. Push a new commit and redeploy normally.

Do not force-push or delete the `main` branch to recover a deployment.
