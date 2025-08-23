import { Link, useRouteError } from "react-router";
import { motion } from "framer-motion";

export default function NotFound() {
  const error = useRouteError() || null;
const message = (error && (error.statusText || error.message)) 
  || "The page you're looking for doesn't exist.";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.700)_1px,transparent_0)] [background-size:22px_22px] opacity-40"
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* Card */}
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            {/* 404 Badge */}
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/90">
                ERROR 404
              </span>
              <span className="text-xs text-white/60">Not Found</span>
            </div>

            {/* Big number + art */}
            <div className="relative mb-6 flex items-center justify-between gap-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-7xl font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
              >
                404
              </motion.div>

              {/* Minimal SVG Illustration */}
              <motion.svg
                initial={{ rotate: -6, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.15 }}
                width="132"
                height="132"
                viewBox="0 0 132 132"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:block drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                aria-hidden
              >
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgb(129 140 248)" />
                    <stop offset="100%" stopColor="rgb(236 72 153)" />
                  </linearGradient>
                </defs>
                <rect x="6" y="6" width="120" height="120" rx="24" stroke="url(#grad)" strokeWidth="2.5" opacity="0.8" />
                <path d="M32 72c12-20 56-20 68 0" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="52" r="6" fill="url(#grad)" />
                <circle cx="82" cy="52" r="6" fill="url(#grad)" />
                <path d="M46 95h40" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                <path d="M24 24l16 16M108 24l-16 16M24 108l16-16M108 108l-16-16" stroke="url(#grad)" strokeWidth="2" opacity="0.35" />
              </motion.svg>
            </div>

            {/* Text */}
            <h1 className="mb-2 text-2xl font-semibold text-white/95">Page is not found</h1>
            <p className="mb-6 text-white/70">
              The page you are looking for has been removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* Error details (optional) */}
            {message && (
              <details className="mb-6 select-text rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70 open:bg-black/30">
                <summary className="cursor-pointer list-none font-medium text-white/80">Details</summary>
                <div className="mt-2 whitespace-pre-wrap break-words text-white/70">{message}</div>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/" aria-label="Go back to homepage">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 3.75l8.25 7.5v8.25a.75.75 0 01-.75.75h-5.25v-6h-4.5v6H4.5a.75.75 0 01-.75-.75V11.25L12 3.75z" />
                  </svg>
                  Home
                </motion.button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80 shadow-sm transition hover:bg-white/10"
              >
                Go Back
              </button>
            </div>
          </div>

          {/* Footer tip */}
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-white/50">
            Tip: আপনি চাইলে এই পেজটিকে <code className="rounded bg-black/40 px-1 py-0.5">Route path='*'</code> এ সেট করতে পারেন।
          </p>
        </motion.div>
      </main>
    </div>
  );
}
