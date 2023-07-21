import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// pages
import LadingPage from './pages/LadingPage';
import Articles from './pages/Aticles';

// layouts
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<LadingPage />} />
      <Route path='articles' element={<Articles />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
