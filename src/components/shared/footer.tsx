"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🔥 BRAND */}
        <div>
          <h2 className="text-2xl font-bold">FoodHub</h2>
          <p className="text-sm text-muted-foreground mt-3">
            Your favorite meals, delivered fast and fresh. Discover the best
            food from top restaurants near you.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4">
            <Link href="#">
              <FaFacebook className="h-5 w-5 hover:text-primary transition" />
            </Link>
            <Link href="#">
              <FaInstagram className="h-5 w-5 hover:text-primary transition" />
            </Link>
            <Link href="#">
              <FaTwitter className="h-5 w-5 hover:text-primary transition" />
            </Link>
          </div>
        </div>

        {/* 🔥 QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/meals" className="hover:text-primary">Meals</Link></li>
            <li><Link href="/providers" className="hover:text-primary">Providers</Link></li>
          </ul>
        </div>

        {/* 🔥 SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
            <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        {/* 🔥 CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📍 Rangpur, Bangladesh</li>
            <li>📞 +880 1234-567890</li>
            <li>✉️ support@foodhub.com</li>
          </ul>
        </div>
      </div>

      {/* 🔥 BOTTOM BAR */}
      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
}