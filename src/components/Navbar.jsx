const Navbar = () => (
  <div className='bg-background p-3 text-center flex rounded-md border shadow-m'>
    <div className='navbar'></div>
    <div className='navbar-start'>
      <h1 className='text-2xl font-bold cursor-pointer'>Welcome</h1>
    </div>
    <div className='navbar-end space-x-3'>
      <ul className='flex px-1'>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  </div>
);

export default Navbar;
