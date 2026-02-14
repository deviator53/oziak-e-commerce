import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="flex flex-col items-start">
                <span className="font-display text-2xl font-bold tracking-wider leading-none text-white">
                  OZIAK
                </span>
                <span className="text-xs font-light tracking-wide mt-1 text-gray-400">
                  ELEGANCE REDEFINED
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Crafting bespoke menswear that embodies sophistication and timeless elegance. Each
              piece is meticulously tailored to perfection.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Tiktok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="rgba(206,212,218,1)"
                >
                  <path d="M16 8.24537V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C10.0163 9 10.5185 9.06019 11 9.17393V12.3368C10.5454 12.1208 10.0368 12 9.5 12C7.567 12 6 13.567 6 15.5C6 17.433 7.567 19 9.5 19C11.433 19 13 17.433 13 15.5V2H16C16 4.76142 18.2386 7 21 7V10C19.1081 10 17.3696 9.34328 16 8.24537Z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="snapchat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="rgba(206,212,218,1)"
                >
                  <path d="M11.872 21.7645C10.6817 21.7645 9.88811 21.2027 9.17926 20.7079C8.67548 20.3512 8.20292 20.0124 7.64564 19.9188C7.37369 19.8697 7.09729 19.8519 6.84317 19.8519C6.3706 19.8519 5.99612 19.9232 5.72863 19.9767C5.55922 20.0079 5.41655 20.0347 5.3051 20.0347C5.18919 20.0347 5.04207 20.0035 4.98411 19.8073C4.93507 19.6468 4.90386 19.4953 4.87266 19.3481C4.79241 18.9781 4.72554 18.7507 4.58733 18.7285C3.0983 18.5011 2.20667 18.1578 2.0328 17.7521C2.01942 17.7075 2.00159 17.6629 2.00159 17.6273C1.99267 17.5025 2.08184 17.3999 2.20667 17.3776C3.38808 17.1815 4.44913 16.5529 5.34522 15.5186C6.0407 14.7161 6.37952 13.9404 6.41073 13.8557C6.41073 13.8467 6.41964 13.8467 6.41964 13.8467C6.58906 13.4946 6.62472 13.1959 6.52218 12.9507C6.33048 12.4915 5.69742 12.2953 5.26498 12.1616C5.15352 12.1303 5.0599 12.0947 4.97965 12.0679C4.60962 11.9208 3.9944 11.6087 4.07464 11.1763C4.1326 10.8642 4.54721 10.6413 4.88603 10.6413C4.97965 10.6413 5.0599 10.6547 5.12677 10.6904C5.50572 10.8642 5.849 10.9534 6.14324 10.9534C6.50881 10.9534 6.68268 10.8152 6.72726 10.7706C6.71834 10.5744 6.70497 10.3694 6.69159 10.1777C6.60243 8.81346 6.49989 7.11936 6.93234 6.14747C8.22967 3.24074 10.9848 3.00892 11.8007 3.00892C11.823 3.00892 12.1573 3 12.1573 3C12.1707 3 12.1885 3 12.2064 3C13.0222 3 15.7774 3.22737 17.0747 6.13856C17.5116 7.11044 17.4046 8.80901 17.3154 10.1687L17.3065 10.2356C17.2976 10.4184 17.2842 10.5923 17.2753 10.7706C17.3199 10.8063 17.4804 10.94 17.8103 10.9445C18.0956 10.9356 18.4077 10.8419 18.7643 10.6814C18.8758 10.6324 18.9917 10.6146 19.0764 10.6146C19.2012 10.6146 19.3261 10.6458 19.4331 10.6814H19.442C19.7407 10.7929 19.9368 11.0024 19.9368 11.2209C19.9458 11.426 19.7853 11.738 19.0229 12.0456C18.9427 12.0768 18.849 12.1125 18.7376 12.1393C18.3141 12.2686 17.681 12.4736 17.4804 12.9284C17.3689 13.1691 17.4135 13.4767 17.5829 13.8245C17.5829 13.8334 17.5918 13.8334 17.5918 13.8334C17.6409 13.9582 18.9293 16.8828 21.7959 17.3598C21.9207 17.3821 22.001 17.4846 22.001 17.6094C22.001 17.654 21.9921 17.6986 21.9698 17.7387C21.7959 18.1489 20.9132 18.4833 19.4152 18.7151C19.277 18.7374 19.2102 18.9647 19.1299 19.3348C19.0987 19.4863 19.063 19.6335 19.0185 19.794C18.9739 19.9411 18.8803 20.0213 18.7198 20.0213H18.6975C18.5949 20.0213 18.4567 20.0079 18.2739 19.9723C17.953 19.9054 17.6008 19.8564 17.1594 19.8564C16.8964 19.8564 16.6244 19.8787 16.3569 19.9232C15.8041 20.0124 15.3271 20.3557 14.8233 20.7123C14.1055 21.2027 13.3075 21.7645 12.1261 21.7645C12.1261 21.7645 11.9077 21.7645 11.872 21.7645Z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-white">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop/kaftan"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Kaftan
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/shirts"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/accessories"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/new-arrivals"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/sale"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/custom"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Custom Tailoring
                </Link>
              </li>
              <li>
                <Link
                  href="/alterations"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Alterations
                </Link>
              </li>
              <li>
                <Link
                  href="/styling"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Personal Styling
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/appointments"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-white">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Oziak. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
