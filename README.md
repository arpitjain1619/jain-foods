# Jain Foods

Jain Foods is a React restaurant-discovery application. It loads live restaurant data from a Swiggy endpoint for a fixed location, lets users search or filter the results, and uses client-side routes for the application's pages.

> This project is under active development. The restaurant-detail route currently displays placeholder menu content, and the cart, About, Contact, and Instamart pages are simple placeholders. Authentication, cart management, and ordering have not been implemented.

## Current Application Features

- Fetches restaurant listings when the home page first loads
- Displays each restaurant's image, name, rating, cost for two, locality, and cuisines
- Searches restaurant names case-insensitively
- Filters restaurants above a `4.0` rating and sorts them from highest to lowest
- Navigates without full-page reloads using React Router
- Provides Home, About Us, Contact Us, Cart, Instamart, and restaurant-detail routes
- Loads the Instamart page as a separate JavaScript chunk
- Uses a responsive, wrapping restaurant-card layout

## React Features Used

The following sections cover every React feature currently used by the application. React Router features are documented separately because they come from `react-router-dom`, rather than React itself.

### 1. React root and rendering

`src/App.js` mounts the React application into the `<div id="root">` element from `index.html`:

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
```

`createRoot` creates a React 18+ root. Calling `render` tells React to manage everything below that DOM node and render the router as the application's top-level element.

### 2. JSX

Every component returns JSX, a JavaScript syntax extension that describes the UI with HTML-like markup:

```jsx
const Contact = () => {
  return <h1>Contact Us</h1>;
};
```

JSX supports normal JavaScript expressions inside braces. The application uses this for restaurant values, calculated image URLs, route parameters, event handlers, and mapped lists:

```jsx
<h3>{name}</h3>
<img src={`${SWIGGY_IMAGE_CDN_BASE_URL}${cloudinaryImageId}`} />
```

### 3. Function components

The UI is split into JavaScript functions such as `AppLayout`, `Header`, `Body`, `RestaurantCard`, and `RestaurantMenu`. Each function returns the JSX for one part of the interface.

This component-based structure keeps responsibilities separate:

- `AppLayout` defines the shared page shell.
- `Header` renders the logo and navigation.
- `Body` owns the home-page search and filtering UI.
- `RestaurantCard` renders one restaurant.
- The remaining page components render their corresponding routes.

### 4. Component composition

Larger interfaces are built by nesting smaller components. For example, `AppLayout` renders `Header`, and `Body` renders a `RestaurantCard` for every visible restaurant.

```jsx
<div className="app">
  <Header />
  <Outlet />
</div>
```

React Router supplies the matching child page through `Outlet`, so the header is shared instead of repeated in every page component.

### 5. Props and one-way data flow

`Body` passes each restaurant object to `RestaurantCard` through the `restaurantData` prop:

```jsx
<RestaurantCard restaurantData={restaurant} />
```

The child reads that prop and destructures the values it needs:

```js
const RestaurantCard = (props) => {
  const { name, avgRating, cuisines } = props.restaurantData.info;
};
```

This demonstrates React's one-way data flow: the parent supplies data to the child, and the child uses it to render its UI.

### 6. Local state with `useState`

`useState` stores values that can change while the user interacts with the page. `Body` has two state variables:

```js
const [searchText, setSearchText] = useState("");
const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
```

- `searchText` holds the current search input.
- `filteredRestaurantList` holds the restaurants currently displayed.

The custom `useRestaurantList` hook also uses state to store the restaurants returned by the API. Calling a setter such as `setSearchText` or `setRestaurantList` schedules a re-render with the new value.

### 7. Side effects with `useEffect`

Effects run work that needs to happen outside rendering.

In `useRestaurantList`, an effect with an empty dependency array starts the API request after the hook's component first mounts:

```js
useEffect(() => {
  fetchData();
}, []);
```

In `Body`, another effect synchronizes the visible list whenever the complete restaurant list changes:

```js
useEffect(() => {
  setFilteredRestaurantList(restaurantList);
}, [restaurantList]);
```

The dependency arrays are important: `[]` means the effect runs after the initial mount, while `[restaurantList]` means it reruns when that value changes.

### 8. A custom hook

`src/utils/useRestaurantList.js` defines `useRestaurantList`, a reusable custom hook that combines state, an effect, and data-fetching logic:

```js
const restaurantList = useRestaurantList();
```

Its name starts with `use`, following the React hook convention. Keeping the request logic in a hook lets `Body` focus on rendering and user interactions.

### 9. Controlled form input

The search field is a controlled input because React state is its source of truth:

```jsx
<input
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
/>
```

The `value` comes from state, and every edit calls `onChange` to update that state. Resetting `searchText` therefore also resets the displayed input.

### 10. Event handling

React event props connect user actions to JavaScript functions. The app uses:

- `onChange` to capture typing in the search field.
- `onClick` to search restaurants.
- `onClick` to apply and sort the top-rated filter.

The handlers update state, and React then renders the new visible list.

### 11. Rendering lists with `map`

`Body` transforms the filtered restaurant array into components with `map`:

```jsx
{filteredRestaurantList.map((restaurant) => (
  <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}>
    <RestaurantCard restaurantData={restaurant} />
  </Link>
))}
```

Each item has a stable `key` based on the restaurant ID. React uses keys to identify items efficiently when a list changes.

### 12. Lazy loading with `lazy`

`React.lazy` dynamically imports the Instamart component:

```js
const Instamart = lazy(() => import("./components/Instamart"));
```

Parcel can place this component in a separate bundle. Its code is requested only when the user visits `/instamart`, reducing the JavaScript needed for the initial page.

### 13. Loading fallback with `Suspense`

A lazily imported component is wrapped in `Suspense`:

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
  <Instamart />
</Suspense>
```

React displays the `fallback` while the Instamart JavaScript chunk is loading and replaces it with `Instamart` when the import completes.

### 14. Declarative updates and reconciliation

The application describes what the UI should look like for the current state. When restaurant data, search text, or filtered results change, React re-runs the relevant components and reconciles the resulting JSX with the existing DOM. The code does not manually create, replace, or remove restaurant DOM elements.

## React Router Features Used

The project uses `react-router-dom` 6.30.1 for routing.

### Router creation and provider

`createBrowserRouter` declares the route configuration and uses the browser History API. `RouterProvider` makes that router active for the component tree.

### Nested routes and shared layout

All page routes are children of the `/` layout route. `AppLayout` always renders `Header`, while `Outlet` renders whichever child route matches the current URL.

### Client-side links

`Link` is used for header navigation and restaurant cards. It updates the URL and matched component without requesting an entirely new HTML document from the server.

### Dynamic route parameters

Restaurant links include the restaurant ID:

```jsx
to={`/restaurants/${restaurant.info.id}`}
```

The route path `/restaurants/:resId` declares `resId` as a dynamic segment. `RestaurantMenu` reads it with `useParams`:

```js
const { resId } = useParams();
```

The ID is currently displayed on a placeholder menu page; it is not yet used to fetch that restaurant's menu.

### Route-level error UI

The root route defines `errorElement: <Error />`. React Router renders this component when it cannot match a route or encounters a routing/rendering error handled by the router.

## Route Reference

| URL | Component | Current behavior |
| --- | --- | --- |
| `/` | `Body` | Restaurant listing, search, and rating filter |
| `/about` | `AboutUs` | Placeholder About page |
| `/contact` | `Contact` | Placeholder Contact page |
| `/coming-soon` | `ComingSoon` | Placeholder used by the Cart link |
| `/instamart` | `Instamart` | Lazily loaded placeholder page |
| `/restaurants/:resId` | `RestaurantMenu` | Displays the route ID and placeholder menu items |
| Any unmatched route | `Error` | Displays the route error UI |

## Data Flow

1. React mounts `RouterProvider`, which renders `AppLayout` and the matching child route.
2. On the home route, `Body` calls `useRestaurantList`.
3. The custom hook fetches the API after mounting and stores the returned restaurants in state.
4. `Body` copies the latest complete list into its visible-list state.
5. Search or rating-filter events replace the visible list with a derived list.
6. `Body` maps the visible list to linked `RestaurantCard` components.
7. Selecting a card navigates to `/restaurants/:resId`, where `useParams` reads its ID.

## Component Tree

```text
RouterProvider
└── AppLayout
    ├── Header
    │   ├── Logo
    │   └── Navigation Links
    └── Outlet
        ├── Body (/)
        │   ├── Controlled Search Input
        │   ├── Search and Rating Buttons
        │   └── Restaurant Links
        │       └── RestaurantCard
        ├── AboutUs (/about)
        ├── Contact (/contact)
        ├── ComingSoon (/coming-soon)
        ├── Suspense
        │   └── Instamart (/instamart)
        └── RestaurantMenu (/restaurants/:resId)
```

## Project Structure

```text
jain-foods/
├── assets/logo/logo.png
├── src/
│   ├── components/
│   │   ├── AboutUs.js
│   │   ├── Body.js
│   │   ├── ComingSoon.js
│   │   ├── Contact.js
│   │   ├── Error.js
│   │   ├── Header.js
│   │   ├── Instamart.js
│   │   ├── RestaurantCard.js
│   │   └── RestaurantMenu.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── useRestaurantList.js
│   └── App.js
├── app.css
├── index.html
└── package.json
```

## Tech Stack

- React 19
- React DOM 19
- React Router DOM 6
- Parcel 2
- JavaScript, ES modules, and JSX
- CSS
- Swiggy restaurant-listing and image CDN endpoints

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

### Run the development server

```bash
npm start
```

Parcel prints the local development URL, typically `http://localhost:1234`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the Parcel development server |
| `npm test` | Reserved for Jest; Jest and test cases are not configured yet |

## Data Source Note

The listing API currently uses fixed coordinates (`25.1273781`, `75.8250356`). Change `SWIGGY_GET_API_URL` in `src/utils/constants.js` to load another location.

Restaurant information and images come from third-party Swiggy endpoints through a CORS proxy for learning purposes. Loading can stop working if the endpoint, response shape, proxy, or browser-access policy changes. The current fetch path also has no loading, empty, or request-error UI yet.
