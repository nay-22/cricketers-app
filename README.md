# The Cricketers App
An interactive web application showcasing detailed profiles of Indian cricket players. Users can,
- explore player information
- filter and sort by various attributes
- and navigate through paginated lists seamlessly. 

Built with a modern tech stack, the app prioritizes performance, accessibility, and a responsive user experience.

## Links
- https://cricketers-bzvh6y51e-nayans-projects-ca58165e.vercel.app/
- https://cricketers-app-sepia.vercel.app/

## Techstack
- **React** v19+
- **React Router** v7+
- **TypeScript** v5+
- **Tailwind CSS** v4+
- **Vite** v6+

## Installation
```sh
git clone https://github.com/nay-22/cricketers-app.git
```

```sh
cd cricketers-app
```

```sh
npm install
```

```sh
npm run dev
```

Open: http://localhost:5173/

## Features

### Performance (vercel-deployed)
- Lighthouse (Light Mode - Desktop)
  ![cricketers-preview-lighthouse-score-light-mode](https://github.com/user-attachments/assets/c9e5a20e-6d94-49ac-833c-93d8ea123d93)


- Lighthouse (Dark Mode - Desktop)
  ![cricketers-preview-lighthouse-score-dark-mode](https://github.com/user-attachments/assets/49484753-0d88-4ac3-b38e-69b8e4d45023)

### App
- Custom hooks to enable custom providers and local state persistence.
- Theming support with dynamic styles and custom theme provider.
- Lazy loading to improve first load performance.
- Responsive layout to support various screen sizes.
- Ensured accessibility using aria-labels.
- Typeahead(SearchForm) to search players by name with support for keyboard navigation.
- Generic Loaders and Error components.


https://github.com/user-attachments/assets/11b790c5-efa3-4a91-b972-f8652a202495

https://github.com/user-attachments/assets/9fb9a354-51e8-4374-a3d0-8ecf04b1a22f

https://github.com/user-attachments/assets/0b1ed66a-7a80-4c2a-8a64-f21c89ead4bd

https://github.com/user-attachments/assets/75f9a276-44cc-481c-8d76-f8511d05c7bd





### Cricketers Page:
- View a list of cricketer links with pagination support.
- Responsive paginator implementing sliding window to render limited page numbers.
- Improved paginator accessibility by conditional rendering of paginator to footer for smaller hand-held devices.
- Filter Modal to enable sorting and filtering on various parameters.

https://github.com/user-attachments/assets/eef23061-4d4b-4f19-ab78-6b19d8db86cc

https://github.com/user-attachments/assets/9e84236e-6c0d-4589-a54a-5d2d9e35b655




### Cricketer Details Page:
- Avails resusable CricketerCard that conditionally renders all cricketer details.
- Displays upto 5 similar cricketers conforming to the same type using the CricketerCard but, to render certain details only.

## Potential Improvements
- Support local & session caching in **SearchForm**.
- Improved theming to support other properties.
- Lazy loading for heavy components such as SearchForm, FilterForm, etc...

