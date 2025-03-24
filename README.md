# Teams Meeting Side Panel

React app available in a Microsoft Teams meeting side panel. This would allow users to interact with the app during a Teams meeting via the side panel.

## Getting Started

### Setting up the Manifest File

The app requires a `manifest.json` file with your specific configuration for Teams. For security reasons, this file is excluded from version control.

Follow these steps to set up your manifest file:

1. Navigate to the `appPackage` directory
2. Copy `manifest.template.json` to create a new `manifest.json` file:
   ```sh
   cp manifest.template.json manifest.json  # For Unix/Linux/Mac
   # OR
   copy manifest.template.json manifest.json  # For Windows
   ```
3. Open `manifest.json` and replace all placeholders (values in `{{PLACEHOLDER}}` format) with your actual values:
   - `{{APP_ID}}`: Your application ID from Entra (Azure AD)
   - `{{DEVELOPER_NAME}}`: Your name or organization name
   - `{{WEBSITE_URL}}`: Your website URL
   - `{{PRIVACY_URL}}`: URL to your privacy policy
   - `{{TERMS_URL}}`: URL to your terms of service
   - `{{CONFIGURATION_URL}}`: URL for your app configuration
   - `{{VALID_DOMAIN}}`: Domain where your app is hosted

> **Note:** The `manifest.json` file contains sensitive information and is excluded from git version control.

## Testing the React app

To test the React app, follow these steps:

1. Install the dependencies:
   ```sh
   npm install
   ```

2. Run the development server:
   ```sh
   npm run dev
   ```

3. Navigate to the provided local server URL.

4. Verify that the web app is working, including a counter component that increments when clicked.

## Registering the App in Entra

To register the app in Entra (formerly Azure AD), follow these steps:

1. **Register the App**:
   - Go to the [Azure portal](https://portal.azure.com/) and navigate to Microsoft Entra ID.
   - Select **App registrations** and click **New registration**.
   - Enter a name for your app and set the **Redirect URI** to `https://<your-app-url>/auth-end`. Click **Register**. TODO: Is Redirect URI required?
   - Once registered, note down the **Application (client) ID** and **Directory (tenant) ID**.
   - Navigate to **Certificates & secrets** and create a new client secret. Note down the secret value.

2. **Update the Manifest**:
   - Open the `manifest.json` file and replace the placeholder `<your-app-id>` with the **Application (client) ID** obtained from the Azure portal.
   - Ensure the `validDomains` field includes your app's URL. TODO: Can it be Google?

3. **Update Vite Configuration**:
   - Ensure your `vite.config.ts` file includes the necessary headers for embedding in Teams:
     ```typescript
     // ...existing code...
     server: {
       headers: {
         'X-Frame-Options': 'ALLOW-FROM https://teams.microsoft.com',
         'Content-Security-Policy': "frame-ancestors 'self' https://teams.microsoft.com"
       }
     }
     // ...existing code...
     ```

4. **Deploy the App**:
   - Run the development server:
     ```sh
     npm run dev
     ```

## Packaging Your Teams App

To prepare your app for submission to Microsoft Teams, you need to create an app package that includes the manifest and app icons.

### Required Files for Teams App Package

1. `manifest.json`: Describes your app's configuration and capabilities
2. `color.png`: Full color app icon (192x192 pixels)
3. `outline.png`: Transparent outline icon (32x32 pixels)

### Creating the App Package

Follow these steps to create your Teams app package:

#### Windows (Command Prompt)

1. Navigate to your project directory:
   ```cmd
   cd path\to\teams-meeting-side-panel\appPackage
   ```

2. Create the app package zip file:
   ```cmd
   powershell Compress-Archive -Path .\* -DestinationPath teams-meeting-side-panel.zip
   ```

### Testing Your App Package

After creating your app package, you can upload it to Microsoft Teams:

1. Go to Microsoft Teams
2. Click on "Apps" in the bottom-left corner
3. Select "Upload a custom app" (or "Upload for [your organization]" depending on your permissions)
4. Choose the `teams-meeting-side-panel.zip` file you created
5. Follow the prompts to complete the installation

# References
[Meeting Side Panel - Teams](https://learn.microsoft.com/en-us/microsoftteams/platform/sbs-meetings-sidepanel): Tutorial
[Meetings SidePanel JavaScript sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/nodejs): Sample code