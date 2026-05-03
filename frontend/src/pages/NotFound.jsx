import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" data-testid="page-404">
      <div className="text-center">
        <div className="font-display font-black text-8xl text-[#0F4C81]/20 tracking-tighter">404</div>
        <h1 className="mt-4 font-display text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-500">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-cta mt-8 inline-flex">Back home</Link>
      </div>
    </div>
  );
}
