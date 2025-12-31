import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function PricingTable() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly");

  const prices = {
    pro: { monthly: 199, yearly: 499 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  /* ================= HANDLERS ================= */

  // FREE PLAN
  const handleFreePlan = () => {
    toast.success("You are using the Free plan 🚀");
    navigate("/");
  };

  // PRO PLAN
  const handlePaidPlan = () => {
    if (!user) {
      toast.error("Please register or login to continue");
      navigate("/register", {
        state: {
          redirectTo: "/payment",
          plan: "pro",
          billing,
        },
      });
      return;
    }

    navigate("/payment", {
      state: { plan: "pro", billing },
    });
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* ===== BILLING TOGGLE ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-16"
      >
        <div className="flex bg-gray-100 rounded-full p-1 shadow-inner">
          {["monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setBilling(type)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === type
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ===== PRICING CARDS ===== */}
      <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
        {/* ===== FREE ===== */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          whileHover={{ y: -8, scale: 1.03 }}
          className="rounded-2xl border bg-white p-8 shadow-sm hover:shadow-xl"
        >
          <h3 className="text-xl font-bold">Free</h3>
          <p className="text-sm text-gray-500 mt-1">For getting started</p>

          <div className="mt-6 text-4xl font-extrabold">₹0</div>

          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li>✔ Search PPTs</li>
            <li>✔ Preview PPTs</li>
            <li>✖ Limited downloads</li>
            <li>✖ Watermark-free</li>
            <li>✖ Ads removal</li>
          </ul>

          <motion.button
            onClick={handleFreePlan}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full rounded-xl bg-gray-100 hover:bg-gray-200 py-3 font-semibold"
          >
            Continue Free
          </motion.button>
        </motion.div>

        {/* ===== PRO ===== */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          whileHover={{ y: -10, scale: 1.05 }}
          className="relative rounded-3xl border-2 border-purple-600 bg-gradient-to-b from-purple-50 to-white p-8 shadow-2xl"
        >
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-4 py-1 rounded-full font-semibold shadow"
          >
            Most Popular
          </motion.span>

          <h3 className="text-xl font-bold">Pro</h3>
          <p className="text-sm text-gray-500 mt-1">
            Students & professionals
          </p>

          <div className="mt-6 text-4xl font-extrabold text-purple-700">
            ₹{prices.pro[billing]}
            <span className="text-base text-gray-500">
              /{billing === "monthly" ? "mo" : "yr"}
            </span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li>✔ Unlimited search</li>
            <li>✔ Full PPT preview</li>
            <li>✔ Unlimited downloads</li>
            <li>✔ No watermark</li>
            <li>✔ Faster downloads</li>
            <li>✔ Save favorites</li>
          </ul>

          <motion.button
            onClick={handlePaidPlan}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold shadow-xl"
          >
            Upgrade to Pro
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
