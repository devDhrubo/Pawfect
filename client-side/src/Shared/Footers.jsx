import logo from '../assets/pawfect logo.png'
"use client";

import { Footer } from "flowbite-react";

export function Footers() {
  return (
    <Footer className='mt-60' container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href='/'
            src={logo}
            alt="Flowbite Logo"
            name="Pawfect"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Pawfect™" year={2024} />
      </div>
    </Footer>
  );
}

export default Footers;