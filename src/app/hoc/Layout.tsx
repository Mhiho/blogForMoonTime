import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='layout'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
