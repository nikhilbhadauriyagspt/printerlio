import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-urbanist pb-20 text-slate-900">
      {/* --- MINIMALIST PAGE HEADER --- */}
      <header className="pt-40 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb Tag */}
            <div className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-slate-300">Policy document</span>
            </div>

            {/* Main Heading */}
            <div className="flex flex-col space-y-4 mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight uppercase">
                {title}
              </h1>
              {subtitle && (
                <p className="text-slate-500 text-lg md:text-xl font-bold max-w-3xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-gray-50">
              <div className="flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100">
                <Clock size={14} className="text-blue-600" />
                <span className="text-slate-900 text-[11px] font-black uppercase tracking-widest">Last revised: {lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <article className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl prose prose-slate prose-headings:font-black prose-headings:uppercase prose-headings:text-slate-900 prose-h2:pt-12 prose-h2:mb-8 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4 prose-p:text-slate-600 prose-p:text-base prose-p:font-bold prose-p:leading-relaxed prose-li:text-slate-600 prose-li:font-bold prose-strong:text-slate-900 prose-a:text-blue-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
