# Jain Foods

Jain Foods is a React restaurant-discovery application. It loads restaurant listings for a fixed location, supports search and rating filters, and provides client-side navigation to restaurant details and other pages. Restaurant-detail and menu data currently comes from a local mock-data file.

> The project is under active development. About, Contact, Cart, and Instamart are placeholder pages. Authentication, cart management, ordering, and live restaurant-menu fetching have not yet been implemented.

## Application Features

- Fetches restaurant listings from a Swiggy endpoint when the home page mounts
- Displays restaurant images, names, ratings, prices, localities, and cuisines
- Searches restaurant names case-insensitively
- Filters restaurants with ratings above `4.0` and sorts them highest-first
- Navigates between pages without full document reloads
- Shows mock restaurant details and expandable menu categories
- Creates external Swiggy cuisine links from restaurant and cuisine data
- Shares a user name through React Context and demonstrates nested provider overrides
- Loads the Instamart page as a separate JavaScript chunk
- Uses Tailwind utility classes and local Gilroy font files for styling

## Learning Guide

The topics are arranged in the same order in which the application grows from a basic page into an interactive React application:

```text
static HTML shell
→ React root and components
→ props and data-driven lists
→ reusable file structure
→ state and events
→ effects and API data
→ controlled search
→ routes and SPA navigation
→ dynamic URLs and a custom hook
→ lazy loading
→ utility-first styling
→ composed restaurant-menu UI
→ shared Context
```

For each topic, consider four questions:

1. What problem does this feature solve?
2. Which React idea solved it?
3. What causes the component to render or re-render?
4. Which parts are React, and which parts are ordinary JavaScript or tooling?

The examples are based on this application and are intended to work as reusable notes for future React projects.

## The React Mental Model

Before reading the feature notes, keep this small model in mind:

- A **component** is a function that describes part of the UI.
- **JSX** is the syntax used to describe the elements that component returns.
- **Props** are read-only inputs received from a parent.
- **State** is a component's memory. Updating state requests another render.
- A **render** means React calls the component again to calculate its next JSX.
- An **effect** synchronizes the component with something outside rendering, such as a network request.
- **Context** supplies shared data to descendants.
- React compares the previous and next element trees and updates only the necessary DOM. This is reconciliation.

A useful summary is:

```text
UI = function(props, state, context)
```

Event handlers update state, state causes a render, and the new JSX describes the updated screen.

### What causes a render?

A component can render because:

- it mounts for the first time;
- its state setter is called with a changed value;
- its parent renders it again;
- a context value it consumes changes; or
- React Router matches and mounts it for the current location.

Changing a normal local variable does not ask React to render. Mutating an existing state object or array in place is also unreliable because React expects state updates to provide a new value.

During a render, React calls the component from the top, creates fresh local variables and event-handler closures, and calculates JSX. State is preserved by React between renders. After React applies the required DOM changes, eligible effects run.

### Props, state, and context compared

| Input | Who owns it? | How this component reads it | How it changes |
| --- | --- | --- | --- |
| Props | The parent | Function parameters | Parent renders different props |
| State | The component | `useState` value | Component calls its setter |
| Context | The nearest provider | `useContext` | Provider receives a different value |

All three are inputs to rendering. A component should treat them as read-only while calculating JSX.

### React versus the surrounding JavaScript ecosystem

| Category | Examples in this project |
| --- | --- |
| React | Components, JSX conventions, `useState`, `useEffect`, `useContext`, `createContext`, `lazy`, `Suspense` |
| React DOM | `createRoot` and rendering into a browser DOM node |
| React Router | `createBrowserRouter`, `RouterProvider`, `Outlet`, `Link`, `useParams` |
| JavaScript | Modules, destructuring, callbacks, `map`, `filter`, `sort`, optional chaining, nullish coalescing, template literals, `async`/`await`, `fetch` |
| Build and styling tools | Parcel, PostCSS, Tailwind CSS, CSS, asset imports |
| React component library | Font Awesome's `FontAwesomeIcon` |

This distinction matters: React commonly appears beside these tools, but learning what layer owns an idea makes errors easier to diagnose.

## React Learning Notes

### 1. Project foundation

The application starts with a Parcel project, the `react` and `react-dom` packages, and an HTML entry point.

```js
import React from "react";
import ReactDOM from "react-dom/client";
```

Key notes:

- `react` provides the component model and React APIs.
- `react-dom` connects React to a web browser's DOM.
- Parcel is the build tool. It resolves imports, transforms JSX, serves the development build, and creates production bundles. Parcel is not part of React.
- `<script type="module">` makes the JavaScript file an ES module, allowing `import` and `export`.
- Importing React alone does not display anything. The application must also create a React root and render an element into it.

### 2. React root, JSX, and components

The rendered React interface needs a root DOM node:

```html
<div id="root"></div>
```

and mounted `AppLayout` into it:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
```

It also introduced function components:

```jsx
const Header = () => {
  return <div className="header">...</div>;
};
```

and composition:

```jsx
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};
```

Beginner notes:

- A component name must start with a capital letter. React treats `<Header />` as a component and `<header>` as a built-in HTML element.
- Use a component as `<Header />`, not as `Header()`. JSX lets React manage the component correctly.
- A component must return one root element. The application uses wrapping `<div>` elements.
- JSX looks like HTML but is JavaScript syntax. Use `className`, camel-cased events, and braces for JavaScript expressions.
- `<Header />` is a React element description. It is not the DOM node itself.
- Components can be repeated. The page can render the same restaurant-card component many times.
- Styling can come from a CSS class or from a JavaScript style object, using syntax such as `className="res-card"` or `style={styleCard}`.

Render checkpoint: calling `root.render` caused the first render. No state existed yet, so user interaction could not change the component output.

### 3. Props, list rendering, and keys

Repeated hard-coded cards are replaced by data-driven rendering:

```jsx
{resList.map((restaurant) => (
  <RestaurantCard
    key={restaurant.info.resId}
    resData={restaurant}
  />
))}
```

`RestaurantCard` received each object through props:

```jsx
const RestaurantCard = (props) => {
  const { name, image, rating, cuisine, costText } = props.resData.info;
  // ...
};
```

Key notes:

- Props are the attributes passed to a component. `resData={restaurant}` creates a prop named `resData`.
- Props flow from parent to child and should be treated as read-only.
- A single reusable component can render different output because each instance receives different props.
- `map` is a JavaScript array method, not a React API. It is commonly used in JSX because it returns a new array of React elements.
- Every sibling created from a list needs a `key` that is unique among those siblings.
- A key helps React preserve item identity across insertions, deletions, sorting, and filtering.
- A key is used internally by React and is not automatically available as `props.key`.
- Stable database or API IDs are preferable to array indexes.
- Destructuring and `join(", ")` are JavaScript conveniences used to prepare values for JSX.

Render checkpoint: the list was still static. React rendered it once from local JSON; there was no setter to request later renders.

### 4. Component files and ES modules

The application separates the large `App.js` file into:

- `src/App.js`
- `src/components/Header.js`
- `src/components/Body.js`
- `src/components/RestaurantCard.js`
- `src/utils/mockData.js`

Each component used a default export:

```js
export default Body;
```

and another module imported it without braces:

```js
import Body from "./components/Body";
```

Key notes:

- File splitting does not change how React renders. It improves separation of concerns and maintainability.
- A default export can be imported under a different local name, although consistent names are easier to follow.
- A named export uses braces and must use the exported name:

  ```js
  export const TOP_RATING = 4.0;
  import { TOP_RATING } from "../utils/constants";
  ```

- Component files belong in `components`; non-visual helpers, constants, hooks, and data belong in `utils` in this project's convention.
- The HTML module entry changed from `./App.js` to `./src/App.js`.

### 5. State, events, filtering, and sorting

The restaurant list becomes interactive with `useState`:

```jsx
const [filteredRestaurantList, setFilteredRestaurantList] =
  useState(restaurantList);
```

The button handled a click and updated state:

```jsx
<button
  onClick={() => {
    const topRated = restaurantList
      .filter((restaurant) => restaurant.info.avgRating > TOP_RATING)
      .sort((a, b) => b.info.avgRating - a.info.avgRating);

    setFilteredRestaurantList(topRated);
  }}
>
  Top Rated Restaurants
</button>
```

Key notes:

- `useState(initialValue)` returns a two-item array: the current state value and its setter.
- Array destructuring gives those items readable names.
- Calling the setter requests a re-render. Assigning directly to the state variable does not.
- State is a snapshot for one render. The setter's new value is available in a later render, not by mutating the current snapshot.
- `onClick` receives a function. Writing `onClick={handleClick}` passes it; writing `onClick={handleClick()}` calls it during rendering.
- `filter` returns a new array and is a good fit for immutable state updates.
- `sort` mutates the array on which it is called. Here it follows `filter`, so it sorts the new filtered array. When sorting a state array directly, copy it first with `[...items].sort(...)`.
- Reassigning a state variable before calling its setter is unnecessary. Derive a new `const` result and pass it to the setter.
- `TOP_RATING` was extracted as a named constant so the rule is not an unexplained “magic number” inside the component.

Render checkpoint: clicking the button called the setter, React called `Body` again, and the next render mapped the filtered state.

### 6. Effects and asynchronous API data

Static restaurant JSON is replaced by a network request:

```jsx
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  const response = await fetch(SWIGGY_GET_API_URL);
  const json = await response.json();
  // extract restaurants
  setFilteredRestaurantList(restaurants);
};
```

The render sequence became:

```text
initial state []
→ first render shows no cards
→ effect runs after React updates the DOM
→ fetch resolves
→ setter stores restaurants
→ React renders again with cards
```

Key notes:

- Fetching is a side effect because it communicates with a system outside React.
- Effects run after rendering; they should not be used to calculate ordinary JSX values that can be calculated during render.
- An empty dependency array means “run after this component mounts.” Without the array, the effect would run after every render and could create a fetch loop.
- The effect callback itself is not marked `async`; it calls a separate async function. An effect callback may return only a cleanup function or nothing, while an async function returns a Promise.
- `await` pauses that async function, not the whole browser or React.
- Optional chaining (`?.`), nullish coalescing (`??`), `flatMap`, `Array.isArray`, and `filter` are JavaScript features used to safely normalize the nested API response.
- The image URL combines a CDN base URL with an image ID using a template literal.
- The current hook still needs production-grade loading, error, abort, and retry handling.

### 7. Controlled input and search state

The complete server result is kept separate from the list shown on screen:

```jsx
const [restaurantList, setRestaurantList] = useState([]);
const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
const [searchText, setSearchText] = useState("");
```

The input became controlled:

```jsx
<input
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
/>
```

Key notes:

- A controlled input gets its displayed value from React state.
- `onChange` receives a React event object. `event.target.value` is the latest text from the input.
- Every keystroke updates state and causes `Body` to render again.
- The complete `restaurantList` remains unchanged, while search/filter actions replace only `filteredRestaurantList`. This prevents one filter from permanently losing the source data.
- `toLowerCase().includes(...)` implements case-insensitive substring matching with JavaScript string methods.
- State should start with the same data type it will hold. Text state should use `""`, not an array.
- Clearing `searchText` also clears the visible input because state controls `value`.

### 8. API access and CORS

The Swiggy listing URL is routed through a CORS proxy so it can be requested from the browser during development.

Key notes:

- CORS is a browser security policy, not a React feature.
- A proxy can make a learning project work, but it introduces an external dependency and should not be treated as the application's own secure backend.
- The UI should eventually expose network failures instead of silently displaying an empty list.

### 9. Declarative routing and nested layouts

React Router represents the page map as route configuration:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
    ],
    errorElement: <Error />,
  },
]);
```

The root now renders the router:

```jsx
root.render(<RouterProvider router={router} />);
```

and the layout reserves a place for the matched child:

```jsx
<div className="app">
  <Header />
  <Outlet />
</div>
```

Key notes:

- React Router is a separate library, not part of React.
- `createBrowserRouter` matches the browser URL to route objects.
- `RouterProvider` gives the route configuration to the application.
- `Outlet` renders the matched child route while keeping shared layout elements mounted.
- Nested routes avoid repeating `Header` on every page.
- `errorElement` is a route error boundary supplied by React Router. It is not the same API as a React class error boundary.
- Each route's `element` is JSX that tells the router what to render.

### 10. Single-page navigation with `Link`

The header uses client-side links:

```jsx
<Link to="/about">About Us</Link>
```

Key notes:

- A single-page application loads one HTML document and changes the visible route on the client.
- `Link` renders an accessible link and asks the router to update browser history without a full document reload.
- Use `Link` for routes managed by React Router. A normal `<a href>` is still appropriate for downloads, external sites, or deliberate full-page navigation.
- URLs remain useful: users can bookmark a page, use Back/Forward, and share a route.
- Defining routes determines what can render at each URL. Adding `Link` connects user actions to those routes.

### 11. Dynamic URLs, route params, and a custom hook

Each card links to a URL containing its restaurant ID:

```jsx
<Link to={`/restaurants/${restaurant.info.id}`}>
  <RestaurantCard restaurantData={restaurant} />
</Link>
```

The route declared a parameter:

```jsx
{ path: "/restaurants/:resId", element: <RestaurantMenu /> }
```

and the component read it:

```jsx
const { resId } = useParams();
```

The fetch logic also moved into `useRestaurantList`:

```jsx
const restaurantList = useRestaurantList();
```

Key notes:

- `:resId` is a dynamic URL segment. For `/restaurants/123`, `useParams()` returns an object containing `resId: "123"`.
- Route parameters are strings unless the application converts them.
- The current detail page reads `resId` but still uses one mock restaurant, so the URL does not yet choose the displayed menu.
- A custom hook is a function whose name begins with `use` and that may call other hooks.
- Custom hooks share stateful logic, not one global state value. Each call normally gets its own hook state.
- Hooks must be called at the top level of a function component or another custom hook, never inside a condition, loop, or event handler.
- Moving fetching into a custom hook separated server-data concerns from the `Body` UI.
- Because the custom hook starts with `[]` and updates later, `Body` added an effect with `[restaurantList]` to synchronize the visible list whenever the fetched list changes.

### 12. Lazy loading, code splitting, and Suspense

The Instamart page uses a lazy import:

```jsx
const Instamart = lazy(() => import("./components/Instamart"));
```

Its route supplied temporary UI while the module loaded:

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
  <Instamart />
</Suspense>
```

Key notes:

- A normal static import is included in the initial dependency graph.
- Dynamic `import()` returns a Promise and lets Parcel create a separate chunk.
- `lazy` turns that Promise-backed module into a component React can render.
- The lazily imported module must provide a default component export for this syntax.
- `Suspense` renders its `fallback` while the lazy component's code is pending.
- This improves initial bundle size when a route is not immediately needed.
- This app uses Suspense for code loading only. Its API fetch is not Suspense-based.
- A rejected lazy import still needs suitable error handling; Suspense handles waiting, not every error.

### 13. Tailwind CSS

The interface uses utility classes instead of separate custom selectors for most styling:

```jsx
<div className="flex flex-wrap">
```

Key notes:

- Tailwind is a styling framework, not a React feature.
- React uses `className` to place the generated CSS class string on an element.
- Utility classes keep styling near the JSX, while React still handles rendering and interaction exactly as before.
- PostCSS processes Tailwind during the Parcel build.
- Styling changes do not create React state and do not themselves cause React renders.

### 14. Detail-page composition, conditional UI, and lifted control

The restaurant detail route is a composed page:

```text
RestaurantDetails
├── RestaurantHeader
└── RestaurantMenu
    ├── MenuItemHeader
    └── MenuItemDetails
```

`RestaurantDetails` loaded mock values into state and passed them down:

```jsx
<RestaurantHeader data={header} />
<RestaurantMenu menuItems={menu} />
```

`RestaurantMenu` owned accordion state:

```jsx
const [showIndex, setShowIndex] = useState(null);

const handleClick = (index) => {
  index === showIndex ? setShowIndex(null) : setShowIndex(index);
};
```

It passed the event callback to the header and the selected state to the details:

```jsx
<MenuItemHeader handleClick={handleClick} index={index} />
<MenuItemDetails showIndex={showIndex} index={index} />
```

Key notes:

- State is placed in the closest common parent that needs to coordinate multiple children. This is often called **lifting state up**.
- `MenuItemHeader` does not own the open index. It calls a callback prop to ask its parent to change it.
- `MenuItemDetails` receives the result as props and renders only when `index === showIndex`.
- This creates one source of truth and ensures only one category is open.
- `condition && <Element />` is conditional rendering. If the condition is false, React renders nothing for that expression.
- Returning nothing implicitly produces no UI, although an explicit `return null` is often clearer.
- `itemCards?.length` uses JavaScript optional chaining before rendering nested data.
- `defaultPrice ?? price` uses nullish coalescing: it falls back only for `null` or `undefined`, not for valid values such as `0`.
- Callback props are ordinary function values. They allow events to travel upward while data travels downward.
- Font Awesome icons are third-party React components. Passing `icon={faStar}` is still ordinary prop usage.
- The mock data is read locally because the live menu endpoint is restricted. Using an effect to copy synchronous mock values into state demonstrates effects, but direct initialization would be simpler for data that never changes.

### 15. Context API and nested providers

The application creates a context:

```jsx
const UserContext = createContext({ loggedInUserName: "User" });
```

It provides values to descendants:

```jsx
<UserContext.Provider value={{ loggedInUserName: userDetails?.name }}>
  <UserContext.Provider value={{ loggedInUserName: "Jain's Food" }}>
    <Header />
  </UserContext.Provider>
  <Outlet />
</UserContext.Provider>
```

Consumers read the nearest value:

```jsx
const { loggedInUserName } = useContext(UserContext);
```

Key notes:

- Context is useful for data needed by distant descendants, such as the current user, theme, or locale.
- `createContext(defaultValue)` creates the context object.
- The default value is used only when no matching provider exists above the consumer.
- A provider's `value` is available to all of its descendants, including routed content rendered by `Outlet`.
- `useContext(UserContext)` reads the closest provider above that component.
- A nested provider overrides the same context only inside its own subtree. Therefore `Header` reads `"Jain's Food"`, while `RestaurantHeader` reads the outer logged-in user.
- The outer provider exists from the first render, so consumers do not temporarily fall back to `"User"`; they initially receive `{ loggedInUserName: undefined }` until the simulated user effect updates state.
- When a provider value changes, React re-renders consumers that read that context.
- The inline object passed to `value` is a new object on every `AppLayout` render. This is harmless here, but larger apps may memoize frequently recreated context values to avoid unnecessary consumer renders.
- Context avoids prop drilling, but it does not replace all props. Data used by only one nearby child is usually clearer as a prop.

## Feature-by-Feature Quick Reference

This section documents every React feature currently used in the source code. React Router and third-party React component features are covered separately below.

### 1. React root with `createRoot`

`src/App.js` creates the application root and mounts React inside the `<div id="root">` element declared in `index.html`:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
```

`createRoot` gives React control of the DOM below that element. `render` supplies the top-level element—in this application, the router provider.

### 2. JSX

Components use JSX to describe their output with HTML-like syntax inside JavaScript:

```jsx
const Contact = () => {
  return <h1>Contact Us</h1>;
};
```

JavaScript expressions inside `{}` make the markup dynamic. The application uses expressions for text, image URLs, attributes, event handlers, route destinations, mapped components, and conditional content:

```jsx
<h3>{name}</h3>
<img src={`${SWIGGY_IMAGE_CDN_BASE_URL}${cloudinaryImageId}`} />
```

JSX attributes use React conventions such as `className` instead of HTML's `class`, and event names such as `onClick` and `onChange` use camel case.

### 3. Function components

Every application component is a JavaScript function that returns JSX. Examples include `AppLayout`, `Header`, `Body`, `RestaurantCard`, `RestaurantDetails`, `RestaurantHeader`, `RestaurantMenu`, `MenuItemHeader`, and `MenuItemDetails`.

Function components split the UI by responsibility. For example, `RestaurantDetails` coordinates the detail page, `RestaurantHeader` displays restaurant information, and the menu components implement expandable categories and individual dishes.

### 4. Component composition

React builds larger screens by nesting components. The shared layout composes `Header` with the router's `Outlet`, while the details page composes its header and menu:

```jsx
<div className="max-w-4xl mx-auto px-6 mt-10">
  <RestaurantHeader data={header} />
  <RestaurantMenu menuItems={menu} />
</div>
```

This lets each component own a focused part of the interface and be maintained independently.

### 5. Props and one-way data flow

Parents pass values and callbacks to children through props. Data flows downward; a child reads the values it receives rather than reaching into its parent's local state.

The code uses both the `props` object:

```jsx
const RestaurantCard = (props) => {
  const { name } = props.restaurantData.info;
};
```

and parameter destructuring:

```jsx
const MenuItemHeader = ({ index, menuItemList, handleClick }) => {
  // ...
};
```

Callback props also let a child report an interaction upward. `RestaurantMenu` passes `handleClick` to `MenuItemHeader`, which calls it with the selected category index.

### 6. Local state with `useState`

`useState` stores values that change during the lifetime of a mounted component. Calling its setter schedules a re-render with the new value.

The general form is:

```jsx
const [value, setValue] = useState(initialValue);
```

React uses `initialValue` when that component instance first mounts and preserves the state between later renders. State belongs to a component instance, so rendering two `RestaurantMenu` components would give each one independent `showIndex` state.

Current state usage is:

| Component or hook | State | Purpose |
| --- | --- | --- |
| `AppLayout` | `userDetails` | Stores the simulated authenticated user |
| `Body` | `searchText` | Stores the controlled search input value |
| `Body` | `filteredRestaurantList` | Stores the restaurants currently visible |
| `useRestaurantList` | `restaurantList` | Stores restaurant data returned by the API |
| `RestaurantDetails` | `header` | Stores mock restaurant header data |
| `RestaurantDetails` | `menu` | Stores mock menu-category data |
| `RestaurantMenu` | `showIndex` | Tracks the one expanded category, or `null` when all are closed |

The accordion demonstrates a state update based on the current value:

```jsx
const handleClick = (index) => {
  index === showIndex ? setShowIndex(null) : setShowIndex(index);
};
```

Important state rules:

- Do not assign to the state variable or mutate state arrays/objects. Call the setter with a replacement value.
- A setter schedules a future render; code already running still sees the current render's state snapshot.
- React may batch multiple setters from one event for efficiency.
- If the next value depends on the previous value, the functional form avoids stale snapshots:

  ```jsx
  setShowIndex((currentIndex) =>
    currentIndex === index ? null : index,
  );
  ```

### 7. Side effects with `useEffect`

Rendering should describe UI. `useEffect` is used for work that occurs after React applies a render to the DOM:

- `useRestaurantList` starts an asynchronous network request after its consumer first mounts.
- `Body` synchronizes its visible list whenever the full restaurant list changes.
- `AppLayout` simulates receiving authenticated-user data after mounting.
- `RestaurantDetails` loads restaurant header and menu values from the local mock data after mounting.

An empty dependency array runs the effect after the initial mount:

```jsx
useEffect(() => {
  fetchData();
}, []);
```

A dependency reruns the effect when that value changes:

```jsx
useEffect(() => {
  setFilteredRestaurantList(restaurantList);
}, [restaurantList]);
```

No current effect registers a subscription or other resource, so the application does not yet use an effect cleanup function.

Effect dependency notes:

- List every reactive value read by an effect in its dependency array.
- Omitting the array runs the effect after every render.
- An empty array is appropriate only when the effect does not depend on changing props or state.
- A cleanup function is needed for resources such as timers, subscriptions, or in-flight requests that should be cancelled when dependencies change or the component unmounts.

```jsx
useEffect(() => {
  const controller = new AbortController();

  // Start work with controller.signal.

  return () => controller.abort();
}, []);
```

The cleanup example is a reference pattern; the current application has not implemented request cancellation.

### 8. A custom hook

`src/utils/useRestaurantList.js` defines `useRestaurantList`, a custom hook that combines `useState`, `useEffect`, and asynchronous data fetching:

```jsx
const restaurantList = useRestaurantList();
```

Its `use` prefix follows React's hook naming convention. Extracting this logic keeps `Body` focused on display and filtering and makes the fetching behavior reusable.

### 9. Context with `createContext`, providers, and `useContext`

Context shares a value with descendants without passing it through every intermediate component.

`src/utils/UserContext.js` creates a context and supplies a fallback value for consumers that have no matching provider:

```jsx
const UserContext = createContext({ loggedInUserName: "User" });
```

`AppLayout` provides the simulated logged-in user's name to its subtree:

```jsx
<UserContext.Provider value={{ loggedInUserName: userDetails?.name }}>
  {/* descendants */}
</UserContext.Provider>
```

It also places `Header` inside a nested provider whose `"Jain's Food"` value overrides the parent value only for that subtree. `Header` therefore reads the brand name, while `RestaurantHeader`, rendered through `Outlet`, reads the parent user's name (`"Arpit Jain"` after the effect updates state).

Both consumers read the nearest provider with `useContext`:

```jsx
const { loggedInUserName } = useContext(UserContext);
```

When a provider's `value` changes, React re-renders consumers of that context.

### 10. Controlled input

The search field is controlled because React state is its source of truth:

```jsx
<input
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
/>
```

Typing updates `searchText`, and the current state is passed back through `value`. Clearing that state from the top-rated button also clears the visible input.

### 11. Event handling

React event props connect user actions to functions:

- The search input's `onChange` stores typed text.
- The Search button's `onClick` filters restaurant names.
- The Top Rated Restaurants button's `onClick` clears the search and filters/sorts the list.
- A menu header's `onClick` calls the parent callback to open or close its category.

The handlers update state, and React renders the corresponding UI instead of manually changing DOM elements.

### 12. List rendering and keys

Arrays are transformed into elements with `map`. Restaurant cards, cuisines, menu categories, and menu dishes are all rendered this way:

```jsx
{filteredRestaurantList.map((restaurant) => (
  <Link
    key={restaurant.info.id}
    to={`/restaurants/${restaurant.info.id}`}
  >
    <RestaurantCard restaurantData={restaurant} />
  </Link>
))}
```

The `key` helps React match an array item with its existing rendered element during reconciliation. Restaurant cards use stable restaurant IDs. Some mock menu arrays currently use their indexes because the rendered collection does not expose a selected stable ID at that level.

### 13. Conditional rendering

The application uses JavaScript expressions to decide whether React should render an element:

- `condition && <Element />` renders content only when the condition is truthy. It is used for cuisine lists, menu counts, descriptions, item collections, and the selected menu details.
- A ternary in `handleClick` chooses the next state value—close the current category or open another one. This is JavaScript control flow supporting the conditional UI.
- `RestaurantMenu` returns mapped content only when at least one supported category exists; otherwise the component renders nothing.
- Optional chaining such as `itemCards?.length` safely checks possibly missing API/mock-data fields before rendering dependent UI.

Example:

```jsx
{info.description && (
  <span className="text-gray-500">{info.description}</span>
)}
```

With `&&`, ensure the left side is a boolean when a number might be zero. React can render the number `0`; this application avoids that surprise with checks such as `itemCards?.length > 0`.

### 14. Lazy loading with `lazy`

`lazy` defers loading the Instamart module until React needs to render that route:

```jsx
const Instamart = lazy(() => import("./components/Instamart"));
```

The dynamic `import()` allows Parcel to create a separate JavaScript chunk, reducing the code needed for the first page load.

### 15. Loading fallback with `Suspense`

The lazy component is wrapped in `Suspense`:

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
  <Instamart />
</Suspense>
```

React displays the fallback while the module promise is pending, then replaces it with `Instamart` after the code loads. This use of `Suspense` is for code loading, not data fetching.

### 16. Declarative rendering and reconciliation

The components describe what the interface should look like for the current props, state, and context. When one of those inputs changes, React runs the affected components again, compares the new element tree with the previous one, and applies the required DOM updates. The application therefore does not manually create, replace, or remove restaurant cards or menu items.

## React Router Features Used

These APIs come from `react-router-dom` rather than React itself.

### Data router creation and provider

`createBrowserRouter` declares the route tree and uses browser history. `RouterProvider` activates that router and renders the matching route elements.

### Nested routes and shared layout

All pages are children of the `/` route. `AppLayout` owns the shared `Header`, and `Outlet` renders the currently matched child page. Because `Outlet` is also inside the outer context provider, routed pages can consume that context.

### Client-side navigation with `Link`

Header links, restaurant cards, and cuisine links use `Link`. Internal links update the browser URL and matched UI without downloading a new HTML document. Cuisine links are generated dynamically and open an external Swiggy URL in a new tab.

### Dynamic route parameters with `useParams`

Restaurant-card destinations contain an ID:

```jsx
to={`/restaurants/${restaurant.info.id}`}
```

The `/restaurants/:resId` route declares a dynamic `resId` segment. `RestaurantDetails` reads it with `useParams`:

```jsx
const { resId } = useParams();
```

The variable is currently reserved for future live menu fetching; the details displayed today come from `AnandShekhwati` mock data.

### Route error element

The root route defines `errorElement: <Error />`. React Router displays this component for unmatched locations and errors handled at that route boundary.

## Other React-Based Components

`MenuItemHeader` and `MenuItemDetails` render `FontAwesomeIcon` components from `@fortawesome/react-fontawesome`. The chevron and star definitions are passed through the `icon` prop. These are ordinary third-party React components and participate in composition and prop flow like the application's own components.

## Route Reference

| URL | Component | Current behavior |
| --- | --- | --- |
| `/` | `Body` | Live restaurant listing, search, and rating filter |
| `/about` | `AboutUs` | Placeholder About page |
| `/contact` | `Contact` | Placeholder Contact page |
| `/coming-soon` | `ComingSoon` | Placeholder used by the Cart link |
| `/instamart` | `Instamart` | Lazily loaded placeholder page |
| `/restaurants/:resId` | `RestaurantDetails` | Mock restaurant header and expandable menu |
| Any unmatched route | `Error` | Route-level error UI |

## Data Flow

### Restaurant listing

1. React mounts `RouterProvider`, which renders `AppLayout` and the matching child route.
2. `AppLayout` simulates loading user data and publishes it through `UserContext`.
3. On `/`, `Body` calls `useRestaurantList`.
4. The custom hook fetches the API after mounting and stores the restaurant array in state.
5. `Body` synchronizes that result into its visible-list state.
6. Search and rating-button events derive a new visible list.
7. `Body` maps the list to linked `RestaurantCard` components.

### Restaurant details and menu

1. Selecting a card navigates to `/restaurants/:resId`.
2. `RestaurantDetails` reads `resId` and loads the current mock restaurant data into state.
3. It passes header data to `RestaurantHeader` and category data to `RestaurantMenu`.
4. `RestaurantMenu` filters supported item categories and passes each category to `MenuItemHeader` and `MenuItemDetails`.
5. Clicking a category header changes `showIndex`; only the matching category's dishes are rendered.

## Component Tree

```text
RouterProvider
└── AppLayout
    └── UserContext.Provider (logged-in user)
        ├── UserContext.Provider (header override)
        │   └── Header
        │       ├── Logo
        │       └── Navigation Links
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
            └── RestaurantDetails (/restaurants/:resId)
                ├── RestaurantHeader
                └── RestaurantMenu
                    ├── MenuItemHeader
                    └── MenuItemDetails
```

## Project Structure

```text
jain-foods/
├── assets/
│   ├── fonts/
│   └── logo/logo.png
├── src/
│   ├── components/
│   │   ├── AboutUs.js
│   │   ├── Body.js
│   │   ├── ComingSoon.js
│   │   ├── Contact.js
│   │   ├── Error.js
│   │   ├── Header.js
│   │   ├── Instamart.js
│   │   ├── MenuItemDetails.js
│   │   ├── MenuItemHeader.js
│   │   ├── RestaurantCard.js
│   │   ├── RestaurantDetails.js
│   │   ├── RestaurantHeader.js
│   │   └── RestaurantMenu.js
│   ├── utils/
│   │   ├── mockdata/anandShekhawati.js
│   │   ├── constants.js
│   │   ├── UserContext.js
│   │   └── useRestaurantList.js
│   └── App.js
├── app.css
├── index.html
├── package.json
└── README.md
```

## Tech Stack

- React 19 and React DOM 19
- React Router DOM 6
- Parcel 2
- Tailwind CSS 4
- Font Awesome React components
- JavaScript, ES modules, and JSX
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
| `npm test` | Reserved for Jest; Jest and test cases are not currently configured |

## Data Source Notes

The restaurant-listing API uses fixed coordinates (`25.1273781`, `75.8250356`). Change `SWIGGY_GET_API_URL` in `src/utils/constants.js` to load another location.

Listing information and images come from third-party Swiggy endpoints through a CORS proxy for learning purposes. Loading may stop working if the endpoint, response shape, proxy, or browser-access policy changes. The current request also has no loading, empty, or error UI.

The restaurant-detail route currently reads `src/utils/mockdata/anandShekhawati.js`; its `resId` parameter does not yet select or fetch a restaurant-specific menu.
