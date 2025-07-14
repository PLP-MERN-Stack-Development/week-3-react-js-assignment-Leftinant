import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => (
  <div className='flex flex-col min-h-screen md:mx-20 mx-4'>
    <Navbar />
    <main className='flex-grow p-4'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
