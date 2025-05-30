import React from 'react'
import { Link } from 'react-router'

export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-[#1c1c1c] text-base-content p-10">
  <aside>
  <Link to={"/"} className="mr-4 pr-4 flex items-center">
            <img
              src="/src/assets/Codepply-Logotype-gradient.svg"
              alt="Codepply Logo"
              className="h-6"
            />
        </Link>
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
  )
}
