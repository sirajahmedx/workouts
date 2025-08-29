# Workouts App

A cross-platform fitness app built with Expo, React Native, and TypeScript. Browse, filter, and view details of exercises by muscle group, type, and difficulty. Data is fetched from the [API Ninjas Exercises API](https://api-ninjas.com/api/exercises).

## Key Features

- Browse exercises by muscle, type, and difficulty
- Filter exercises using a modal picker
- View detailed instructions for each exercise
- Modern dark-themed UI
- Live data from API Ninjas

## Quick Start

```bash
npm install
npx expo start
```

## Filtering & Details

- Tap "Add Filters" to select muscle, type, and difficulty
- Tap an exercise for instructions and details

## Project Structure

```
api/         # API calls
app/         # Main app & routing
components/  # UI components
constants/   # Theme/colors
data/        # Sample exercises
assets/      # Fonts/images
```

## API

Uses [API Ninjas Exercises API](https://api-ninjas.com/api/exercises) for live exercise data.

## License

MIT
