# Website Rework

This project holds the website rework code. Included in this are the join-flow, marketing, Storybook, and the design system. It uses a mix of technologies, mainly Next.js for the join-flow and marketing apps, and Vite for the individual packages, including the design system.

## Project Structure

This is a multi-app project that contains the following applications:

- **Join Flow**: Built with Next.js, this application handles the user onboarding process.
- **Marketing**: Also built with Next.js, this application serves the marketing pages and content.
- **Storybook**: A development environment for UI components, built using Vite, which allows for isolated component testing and documentation.

The design system is located in the `packages/design-system` directory and is written in Vite. It is imported into the other applications to ensure a consistent UI across the project.

## Getting Started

If it's your first time using this project, the best way to get up to speed is to view the Storybook and see what components are available.

### Steps to Run the Project

1. **Build entire app**:
   From the root run:

   ```bash
   turbo build
   ```

2. **Build the Design System**:
   In one terminal, navigate to the design system package and run:

   ```bash
   cd packages/design-system
   npm run buildwatch
   ```

   This command will build the design system Vite project and keep it watching for any changes.

3. **Run Storybook**:
   In another terminal, navigate to the Storybook app and run:

   ```bash
   cd apps/storybook
   npm run dev
   ```

   This will start the Storybook application, which you can access on http://localhost:6005.

## Additional Information

Ensure you have Node.js and npm installed on your machine.
You may need to install dependencies for each app and package before running the commands above. You can do this by running npm install in each respective directory.
