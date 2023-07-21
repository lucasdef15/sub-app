import { Outlet } from 'react-router-dom';
import NavBar from '../components/Nav/Nav';

export default function RootLayout() {
  return (
    <div className='rootLayout'>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
