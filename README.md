# SearchX (React Autocomplete Demo)

This project is a **React** application demonstrating a minimal, Google-like **search experience** with:

- **Autocomplete** suggestions
- **Search history** (items appear at the top if previously searched)
- **Voice search** using the native Web Speech API
- **Arrow-key navigation** for autocomplete
- **Context-based** state management

---

## Features

1. **Search Bar**

   - Displays suggestions (autocomplete) as you type.
   - Highlights items on arrow-key presses (Up/Down).
   - Allows selecting an item via Enter or mouse click.
   - Shows a “Cancel” icon to clear text.
   - Offers voice input (mic icon) if the browser supports the Web Speech API.

2. **Autocomplete**

   - Up to 10 suggestions from a local data source.
   - Shows items in **search history** (special color/icon).
   - Hover or arrow-key highlight reveals a “Delete” button for history items.

3. **Search Context**

   - Manages global state: `searchText`, `autocompleteItems`, `searchResults`, etc.
   - Provides `updateAutocomplete()` and `searchItems()` to filter or finalize searches.
   - Ensures consistent data between pages (e.g. Home, Results).

4. **Results Page**

   - Displays final search results (filtered items) plus metadata (count, time).
   - Reuses the same Search Bar with the last search term pre-filled.

5. **Items in History on Top**

   - Previously searched items appear **first** in suggestions.

6. **Arrow-Key + Hover**
   - handles both arrows and mouse hover.
   - Press Enter to select the highlighted suggestion; otherwise uses typed text.

---

## Project Structure

    ├─ src/
    │   ├─ components/
    │   │   ├─ SearchBar.tsx
    │   │   ├─ AutocompleteList.tsx
    │   │   ├─ VoiceSearch.tsx
    │   │   ├─ SearchResultsList.tsx
    │   │   └─ IconWrapper/
    |   |       ├─ IconWrapper.tsx
    |   |       ├─ mapTypeToIcon.ts
    |   |       └─ index.ts
    │   ├─ context/
    │   │   └─ SearchContext.tsx
    │   ├─ hooks/
    │   │   └─ useSearch.tsx
    │   ├─ data/
    │   │   └─ localDB.ts
    │   ├─ types/
    │   │   └─ searchTypes.ts
    │   ├─ App.tsx
    │   └─ main.tsx
    ├─ public/
    │   └─ index.html
    ├─ package.json
    └─ README.md

---

## Getting Started

1. **Clone** the repository:
   ```bash
   git clone https://github.com/nitzanmaizel/SearchX
   ```
2. **Install Dependencies**
   ```bash
   cd SearchX
   npm install
   ```
3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This runs the app at [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Starts the local dev server with live reload |
| `npm run build`   | Bundles the app for production               |
| `npm run preview` | Serves the production build locally          |
| `npm run lint`    | Runs linter (ESLint) checks                  |

---

## Usage

- **Typing** in the **Search Bar** filters the data in `localDB.ts` by titles matching the input.
- **Arrow keys** let you navigate suggestions; press **Enter** to select.
- **Mouse** can click a suggestion or use the **Cancel** icon to clear the input.
- **Voice search** (mic icon) uses the **Web Speech API** if available (Chrome/Edge).
- **Search results** showing how many items matched and how long it took.

---

## Tech Stack

- **React + TypeScript**
- **Context API** for global state
- **Vite** or CRA for bundling
- **ESLint/Prettier** (optional) for code style

---

## Notes / Caveats

- **Web Speech API** is best supported in **Chrome** or **Chromium-based** browsers. Safari/Firefox don’t fully support it.
- The sample data is in [`localDB.ts`](./src/data/localDB.ts). You can replace it with a real API or use your own data.

---

## Contributing

1. **Fork the Repository & Create a New Branch**
   ```bash
   git checkout -b feature/my-feature
   ```
2. **Commit Your Changes**
   ```bash
   git commit -m 'Add new feature'
   ```
3. **Push to Your Branch**
   ```bash
   git push origin feature/my-feature
   ```
4. **Create a Pull Request**  
   Go to your repository on GitHub and click the **Compare & pull request** button.

---

## License

This project is open-source under the [MIT License](LICENSE).  
Feel free to adapt or extend it for your own needs. Enjoy searching!
