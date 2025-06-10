# Website Rework

This project holds the website rework code. Included in this are the join-flow, marketing and the design system. It uses a mix of technologies, mainly Next.js for the join-flow and marketing apps, and Vite for the individual packages, including the design system.

## Project Structure

This is a multi-app project that contains the following applications:

- **Join Flow**: Built with Next.js, this application handles the user onboarding process.
- **Marketing**: Also built with Next.js, this application serves the marketing pages and content.

The design system is located in the `packages/design-system` directory. It is imported into the other applications to ensure a consistent UI across the project.

## Getting Started

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
   npm run build:dev:watch
   ```

   Builds in development mode and watches for changes, rebuilding automatically on file updates

3. **Run marketing and join flow apps**:
   To run the other 2 apps ensure the project has been built with step 1
   Then an env file will be needed in marketing

   ```bash
   JOIN_FLOW_URL=
   ```

   The value for this will typically be: <http://localhost:3000>

   Run the apps with

   ```bash
   npm run start
   ```
