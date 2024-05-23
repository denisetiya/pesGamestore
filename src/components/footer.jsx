import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-center w-full py-6 text-center border-t gap-y-6 gap-x-12 border-blue-gray-50 md:justify-between">
      <p className="block font-sans text-xs antialiased font-normal leading-relaxed md:text-base text-blue-gray-900">
        © 2024 Pes GameStore
      </p>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Link
            to="/about"
            className="block font-sans text-xs antialiased font-normal leading-relaxed transition-colors md:text-base text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/license"
            className="block font-sans text-xs antialiased font-normal leading-relaxed transition-colors md:text-base text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
          >
            License
          </Link>
        </li>
        <li>
          <Link
            to="/contribute"
            className="block font-sans text-xs antialiased font-normal leading-relaxed transition-colors md:text-base text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
          >
            Contribute
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="block font-sans text-xs antialiased font-normal leading-relaxed transition-colors md:text-base text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
