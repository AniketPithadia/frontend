import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">LiveAssist360</h3>
            <p className="mb-4">
              LiveAssist360 provides consistent, high quality customer service
              in a simple month to month format. Brands and tech companies work
              with us to make their support teams fast and flexible, while
              maintaining standards. We call this support ops on demand.
            </p>
            <p>© {new Date().getFullYear()} LiveAssist360. All rights reserved.</p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="mb-4">
              <li>
                <a href="#">How it works</a>
              </li>
              <li>
                <a href="#">Support as a Service</a>
              </li>
              <li>
                <a href="#">Dedicated support teams</a>
              </li>
              <li>
                <a href="#">Sales assistants</a>
              </li>
              <li>
                <a href="#">Sales teams on demand</a>
              </li>
              <li>
                <a href="#">Enterprise call centers</a>
              </li>
              <li>
                <a href="#">Back office support</a>
              </li>
              <li>
                <a href="#">All solutions</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="mb-4">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Get a quote</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Client testimonials</a>
              </li>
              <li>
                <a href="#">Referral program</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;