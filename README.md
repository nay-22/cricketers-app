# The Cricketers App
An interactive web application showcasing detailed profiles of Indian cricket players. Users can,
- explore player information
- filter and sort by various attributes
- and navigate through paginated lists seamlessly. 

Built with a modern tech stack, the app prioritizes performance, accessibility, and a responsive user experience.

## Techstack
- **React** v19+
- **React Router** v7+
- **TypeScript** v5+
- **Tailwind CSS** v4+
- **Vite** v6+

## Features

### App
- Custom hooks to enable custom providers and local state persistence.
- Theming support with dynamic styles and custom theme provider.
- Lazy loading to improve first load performance.
- Responsive layout to support various screen sizes.
- Ensured accessibility using aria-labels.
- Typeahead(SearchForm) to search players by name with support for keyboard navigation.
- Genreric Loaders and Error components.

### Cricketers Page:
- View list of cricketer links with pagination support.
- Responsive paginator implementing sliding window to render limited page numbers.
- Improved paginator accessibility by conditional rendering of paginator to footer for smaller hand-held devices.
- Filter Modal to enable sorting and filtering on various parameters.

### Cricketer Details Page:
- Avails resusable CricketerCard that conditionally renders all cricketer details.
- Displays upto 5 similar cricketers conforming to the same type using the CricketerCard but, to render certain details only.

## Potential Improvements
- Support local & session caching in **SearchForm**.
- Improved theming to support other properties.
- Lazy loading for heavy components such as SearchForm, FilterForm, etc...

