# Americoders Client

Frontend for the Americoders education platform.

This repository contains the client-side application for Americoders, an education platform built to support students, families, and program operations through a modern web interface.

## Tech Stack

* Next.js
* React
* JavaScript
* SCSS / CSS
* Context-based state management

## Project Structure

* `components/`
* `context/`
* `pages/`
* `pages-sections/`
* `public/`
* `styles/`
* `utils/`
* `next.config.js`
* `server.js`
* `package.json`

## What the Client Does

* Renders the frontend application for Americoders
* Provides the page structure and UI components for the platform
* Organizes reusable sections and shared components
* Uses a Next.js-based app structure for routing and rendering
* Connects to backend services used by the Americoders platform

## Requirements

* Node.js 16+ recommended
* npm or pnpm

## Installation

Clone the repository and install dependencies.

`git clone https://github.com/josephdubon/americoders-client.git`
`cd americoders-client`
`npm install`

If you use pnpm:

`pnpm install`

## Running the Client

Start the development server with:

`npm run dev`

If the project is configured to run through the custom server file, use:

`node server.js`

By default, the local app will typically run at:

`http://localhost:3000`

## Application Structure

The application is organized around:

* `pages/` for route-level pages
* `components/` for reusable UI pieces
* `pages-sections/` for larger page-specific sections
* `context/` for shared client-side state
* `styles/` for SCSS and CSS styling
* `utils/` for helper functions and shared logic

## Related Repositories

* Server: [https://github.com/josephdubon/americoders-server](https://github.com/josephdubon/americoders-server)

## Notes

This repository represents the client side of a larger real-world education platform. Some features may depend on backend services, API keys, and environment-specific configuration used during development or deployment.

## License

Update this section with the license you want to use for the repository.
