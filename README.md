# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
npm start

The app contains 4 tabs at the top, each tab containing different features. The tabs from left to right are Home, Map, Logs and Settings.

Home: Where the user will be adding cars and having them leave
+1-- - fast forward time. Time is set initially to when its opened but doesnt progress in real time
Park - have a car of given plate number of given size enter through entrance
Leave - have car given its id leave. The user will be informed of the total fee it owes.

Map: View the current state of the parking lot

Logs: For keeping track of things happening. The most recent activities are presented at top

Settings: For setting the layout and dimensions of the parking lot
dimensions - number of rows and cells of the parking lot. Accepted values inclusive, 1-9
sizes - the size each cell is able to accept
entrances - where the entrances are, represented by a outer cell, entrances are station by the cell
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

```sh
- Has problems with opening in mobile, some elements not rendering or working properly
- Sometimes running npm start causes socket connection error, just rerun if this happens
- despite using expo router, this wont be using routing as all features are in one page
```

## Icons used from flaticon

- [Settings icon by Pixel perfect](https://www.flaticon.com/free-icons/settings)
- [Search icon by Freepik](https://www.flaticon.com/free-icons/search)
- [Map icon by Freepik](https://www.flaticon.com/free-icons/map)
- [Home icon by Freepik](https://www.flaticon.com/free-icons/home-button)
