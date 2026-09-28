# 🥑 Fresh Cart 🛒

A simple grocery shopping list built with React (Create React App).

## Component tree

```
App                 (state: items)
├── Header
├── AddItemForm     (state: name, amount)
├── ShoppingList    (state: sortBy)
│   └── ListItem
└── Summary         (derived state)
```

## Scripts

- `npm install`: install dependencies
- `npm start`: run the dev server at http://localhost:3000
- `npm run build`: build for production
