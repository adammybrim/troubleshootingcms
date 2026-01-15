# Troubleshooting CMS

A Sanity CMS for managing troubleshooting guides, issues, and solutions.

## Project Setup

This project is configured for:
- **Project ID**: b0jjhurd
- **Dataset**: troubleshooting

## Schema Types

### 1. Troubleshooting Guide (`troubleshootingGuide`)
Main content type for comprehensive troubleshooting guides with:
- Title, slug, description
- Category and tags
- Difficulty level and estimated time
- Prerequisites and related issues
- Rich content (text, images, code blocks)
- Related guides

### 2. Issue (`issue`)
Individual problems that can be solved:
- Title, slug, description
- Symptoms and error messages
- Category and tags
- Severity and frequency levels
- Affected systems
- Related solutions and issues

### 3. Solution (`solution`)
Step-by-step solutions for issues:
- Title, slug, description
- Detailed steps with code examples
- Verification steps and success criteria
- Difficulty and time estimates
- Risk assessment and alternatives

### 4. Category (`category`)
Organizational structure:
- Hierarchical categories
- Icons and colors
- Ordering support

### 5. Tag (`tag`)
Flexible tagging system:
- Descriptive tags with colors
- Category association

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Deploy to Sanity:
   ```bash
   npm run deploy
   ```

## Features

- Rich text editing with Portable Text
- Code syntax highlighting
- Image management with hotspots
- Reference relationships between content
- Custom preview panes
- Hierarchical categorization
- Tag-based organization
