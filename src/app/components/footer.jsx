// components/footer.jsx

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-10 bg-sky-100 text-gray-600">
      <div className="flex flex-row space-x-4">
          <a className="hover:text-gray-900 cursor-pointer">Home</a>
          <a className="hover:text-gray-900 cursor-pointer">About</a>
          <a className="hover:text-gray-900 cursor-pointer">Contact</a>
          <a className="hover:text-gray-900 cursor-pointer">Terms</a>
          <a className="hover:text-gray-900 cursor-pointer">Privacy</a>
      </div>
      <p className="pt-4">
        2024 Drive-Thru Lib. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;