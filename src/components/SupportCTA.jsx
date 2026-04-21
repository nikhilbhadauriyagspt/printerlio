import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LogIn,
  Search,
  ShoppingCart,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: LogIn,
    title: "Login Account",
    desc: "Sign in to your account to save your details, manage orders, and enjoy a smooth shopping experience.",
  },
  {
    number: "02",
    icon: Search,
    title: "Select Product",
    desc: "Browse printer categories and choose the product that matches your home, office, or business needs.",
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "Add to Cart",
    desc: "Add your selected printer or accessories to the cart and review everything before placing the order.",
  },
  {
    number: "04",
    icon: CreditCard,
    title: "Checkout",
    desc: "Enter your shipping details, complete payment securely, and place your order with confidence.",
  },
];

export default function SupportCTA() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-10 font-['Poppins'] overflow-hidden border-t border-gray-100">
      <div className="max-w-[1820px] mx-auto">
        
        {/* Centered Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">Shopping Guide</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h2 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-4">
            How To <span className="text-blue-800">Buy</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-[600px]">
            Experience a seamless shopping journey with our simplified four-step process 
            designed for your convenience.
          </p>
        </div>

        {/* Circular Steps Container */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[90px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gray-200 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group"
                >
                  {/* Circle with Icon */}
                  <div className="relative mb-10">
                    <div className="w-[180px] h-[180px] rounded-full bg-white border-2 border-[#001e3c] flex items-center justify-center transition-all duration-500 group-hover:bg-[#001e3c] group-hover:border-[#fbb124] shadow-[0_15px_35px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_rgba(0,30,60,0.25)]">
                       <Icon size={44} className="text-[#001e3c] group-hover:text-blue-800 transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    
                    {/* Floating Step Number */}
                    <div className="absolute -top-1 -right-1 w-12 h-12 rounded-full bg-[#fbb124] text-[#001e3c] flex items-center justify-center font-black text-[18px] shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-500">
                      {step.number}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center px-4">
                    <h3 className="text-[19px] font-bold text-[#001e3c] mb-3 uppercase tracking-wide group-hover:text-blue-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-gray-500 max-w-[260px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-20 flex justify-center items-center gap-8">
           <Link to="/shop" className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#001e3c] hover:text-blue-800 transition-colors group">
              Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </Link>
           <div className="w-[1px] h-6 bg-gray-200"></div>
           <Link to="/cart" className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#001e3c] transition-colors">
              View Your Cart
           </Link>
        </div>
      </div>
    </section>
  );
}