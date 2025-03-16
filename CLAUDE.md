# Asaharan.github.io - Qwik Project Guide

## Build/Development Commands
- `pnpm dev` - Start development server (port 2345)
- `pnpm build` - Production build with type checking
- `pnpm lint` - Run ESLint on TypeScript files
- `pnpm fmt` - Format code with Prettier
- `pnpm fmt.check` - Check formatting without fixing
- `pnpm build.types` - Run TypeScript type checking
- `pnpm dev.debug` - Debug development server with Node inspector

## Code Style Guidelines
- **Imports**: Use `~/` path alias for src directory imports
- **Components**: Name with PascalCase, export as constants
- **Formatting**: Use Prettier with tailwindcss plugin
- **Types**: Use TypeScript interfaces/types for props and data with strict mode
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files
- **CSS**: Use Tailwind utility classes with clsx for conditional styling
- **Icons**: Use @qwikest/icons for Material icons or custom SVG components
- **Error Handling**: Use structured error handling with specific error types

## Qwik Syntax
- Use `component$()` for defining components
- Use `$()` for capturing references to functions
- Use `useSignal()` for state management
- Leverage resource loaders with `useResource$()`
- Follow Qwik's resumability patterns and optimize component boundaries

## Project Structure
- `/src/components` - Reusable UI components
- `/src/routes` - Page components (directory-based routing)
- `/src/utils` - Utility functions
- `/src/data` - Static data files
- `/public` - Static assets (images, fonts)