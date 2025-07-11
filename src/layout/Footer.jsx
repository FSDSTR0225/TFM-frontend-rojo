import { Link } from "react-router";
import logo from "../../src/assets/Codepply-Logotype-gradient.svg";

export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-[#1c1c1c] text-base-content p-10">
      <aside>
        <Link to="/" className="mr-4 pr-4 flex items-center">
          <img src={logo} alt="Codepply Logo" className="h-6" />
        </Link>
        <p>Connecting talent and opportunity</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/offers" className="link link-hover">
          Offers
        </Link>
        <Link to="/developers" className="link link-hover">
          Developers
        </Link>
        <Link to="/projects" className="link link-hover">
          Projects
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link to="/about" className="link link-hover">
          About us
        </Link>
        {/* <Link to="/contact" className="link link-hover disabled:cursor-not-allowed " >
          Contact
        </Link> */}
        <Link to="/onboarding" className="link link-hover">
          Onboarding
        </Link>
        <Link to="/settings" className="link link-hover">
          Settings
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to="/legal/terms" className="link link-hover">
          Terms of use
        </Link>
        <Link to="/legal/privacy" className="link link-hover">
          Privacy policy
        </Link>
        <Link to="/legal/cookies" className="link link-hover">
          Cookie policy
        </Link>
      </nav>
    </footer>
  );
};
