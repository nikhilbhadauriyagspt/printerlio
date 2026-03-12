import { motion } from "framer-motion";

const features = [
  {
    title: "Fast Shipping",
    desc: "Orders delivered quickly and safely to your doorstep.",
  },
  {
    title: "Best Prices",
    desc: "Premium quality at rates that fit your budget.",
  },
  {
    title: "Great Quality",
    desc: "Excellence in every unit, built for durability.",
  },
  {
    title: "Helpful Support",
    desc: "Friendly team ready to assist with any questions.",
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-20 lg:py-28">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6 group cursor-default"
            >
              {/* Centered Small Line Accent */}
              <div className="relative h-1 w-12 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              </div>

              {/* Typographic Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-500 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] font-bold text-slate-400 leading-relaxed group-hover:text-slate-500 transition-colors duration-500 max-w-[200px] mx-auto">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
