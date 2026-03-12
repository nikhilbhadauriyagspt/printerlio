import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="bg-white font-urbanist py-10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10">
        
        {/* Compact Horizontal Ad Banner */}
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-sm">
          
          {/* Content Side */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-6 relative z-10">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                Smooth Experience.
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
                Get the best results for your office with tools that are built to last. We only pick equipment that we know will make your work look great and run perfectly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
              {["Built to Last", "Perfect Results", "Office Ready"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/shop" className="inline-flex items-center gap-3 bg-blue-600 text-white h-11 px-8 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-xl">
                Explore Collection <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-[400px] lg:w-[500px] relative min-h-[250px] md:min-h-full">
            <img 
              src={printerCat} 
              alt="Professional Collection" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            {/* Gradient blend */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
