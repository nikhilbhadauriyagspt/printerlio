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
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-8 border-t border-gray-100 font-['Poppins']">
      <div className="max-w-[1820px] mx-auto">
        {/* Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-blue-800"></span>
            <span className="text-blue-800 text-[13px] uppercase tracking-[0.2em]">
              Easy purchase flow
            </span>
          </div>

          <h2 className="text-[38px] md:text-[40px] text-slate-900 leading-[1.1]">
            How To <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-800">Buy</span>
          </h2>

          <p className="text-[15px] leading-7 text-gray-600 mt-5 max-w-[760px]">
            Follow a few simple steps to purchase printers and accessories quickly
            and securely from our store.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-[#f8f8f8] min-h-[300px] p-8 md:p-10 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="relative flex items-center justify-center h-14 w-14 rounded-full border border-blue-200 bg-white text-blue-700">
                    <Icon size={24} strokeWidth={1.9} />
                  </div>

                  <span className="text-[28px] md:text-[32px] font-semibold text-slate-200 leading-none">
                    {step.number}
                  </span>
                </div>

                <span className="inline-block text-[10px] uppercase tracking-[2px] text-gray-500 mb-4">
                  Step {step.number}
                </span>

                <h3 className="text-[22px] md:text-[24px] leading-tight text-slate-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-[14px] leading-7 text-gray-600 max-w-[320px]">
                  {step.desc}
                </p>

               
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[2px] text-blue-800 border-b-2 border-transparent hover:border-blue-800 transition-all pb-1"
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[2px] text-slate-700 border-b-2 border-transparent hover:border-slate-700 transition-all pb-1"
          >
            View Cart
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}