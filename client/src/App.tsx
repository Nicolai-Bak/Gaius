import { Route, Routes } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

import { CurrentWorkoutProvider } from './components/CurrentWorkoutProvider';
import { Header } from './components/Header';
import { LanguageProvider } from './components/LanguageProvider';
import { Home } from './pages/Home';
const Settings = lazy(() => import('./pages/Settings'));
const WorkoutHistory = lazy(() => import('./pages/WorkoutHistory'));

export const App: Component = () => {
  return (
    <LanguageProvider>
      <CurrentWorkoutProvider>
        <Header />
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/workoutHistory" component={WorkoutHistory} />
        </Routes>
      </CurrentWorkoutProvider>
    </LanguageProvider>
  );
};
