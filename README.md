# Jain Foods

Jain Foods is a React-based restaurant discovery application. The current version fetches live restaurant data from Swiggy for a fixed location and lets users browse, search, and filter the results.

> This project is under active development. The navigation links and cart are currently UI placeholders; ordering, authentication, restaurant menus, and cart management have not been implemented yet.

## Current Features

- Fetches restaurant listings from Swiggy when the page loads
- Displays each restaurant's image, name, rating, cost for two, locality, and cuisines
- Searches restaurants by name (case-insensitive)
- Filters top rated restaurants
- Sorts top-rated results from highest to lowest rating
- Uses a responsive, wrapping card layout
- Includes a header with Home, About Us, Contact Us, and Cart navigation placeholders

## Tech Stack

- [React](https://react.dev/) 19
- [Parcel](https://parceljs.org/) 2
- JavaScript (ES modules and JSX)
- CSS
- Swiggy's public restaurant-listing and image CDN endpoints

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/arpitjain1619/jain-foods.git
cd jain-foods
npm install
```

### Run the Development Server

```bash
npm start
```

Parcel will print the local development URL, typically `http://localhost:1234`.

## Available Scripts

| Command     | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `npm start` | Starts the Parcel development server                                         |
| `npm test`  | Reserved for Jest; the test dependency and test cases are not configured yet |

## How It Works

1. `AppLayout` renders the header and main body.
2. `Body` fetches restaurant data once after the initial render using `useEffect`.
3. The API's nested card response is flattened into a restaurant list.
4. React state stores both the complete list and the currently visible results.
5. Search and rating filters update the visible list.
6. `RestaurantCard` renders the details for each result.

The API URL currently uses fixed coordinates (`25.1273781`, `75.8250356`). Change `SWIGGY_GET_API_URL` in `src/utils/constants.js` to load restaurants for another location.

## Project Structure

```text
jain-foods/
├── assets/
│   └── logo/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── Body.js
│   │   ├── Header.js
│   │   └── RestaurantCard.js
│   ├── utils/
│   │   └── constants.js
│   └── App.js
├── app.css
├── index.html
└── package.json
```

## Component Tree

```text
AppLayout
├── Header
│   ├── Logo
│   └── Navigation Items
└── Body
    ├── Restaurant Search
    ├── Top Rated Filter
    └── Restaurant Container
        └── Restaurant Card
            ├── Image
            ├── Name
            ├── Rating
            ├── Cost for Two
            ├── Locality
            └── Cuisines
```

## Data Source Note

Restaurant information and images are loaded from Swiggy endpoints for learning purposes. Because this application depends on a third-party response shape and browser access policy, data loading may stop working if that API or policy changes.

## Types Of Routing

- Client Side Routing
- Server Side Routing
