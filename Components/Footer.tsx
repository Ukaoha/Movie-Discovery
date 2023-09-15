import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; // Import icons from Font Awesome

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex gap-4 items-center justify-center mb-6">
        {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((SocialIcon, idx) => (
          <span className="text-brand" key={idx}>
            <a href="/" key={idx}>
              <SocialIcon />
            </a>
          </span>
        ))}
      </div>
      <div className="flex gap-4 items-center justify-center text-black flex-col md:flex-row font-semibold mb-6">
        {['Continue of Use', 'Privacy & Policy', 'Press Room'].map((value, idx) => (
          <span key={idx}>
            <Link href="/">{value}</Link>
          </span>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm mb-12 font-semibold">
        &copy; {new Date().getFullYear()} MovieBox by Zoba
      </div>
    </footer>
  );
};

export default Footer;
