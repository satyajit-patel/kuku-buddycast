import { motion } from "motion/react";
import React, { useEffect } from "react";
import { AuroraBackground } from "./aurora-background";
import { Link } from "react-router-dom";
import axios from "axios";

export function AuroraBackgroundDemo() {
  useEffect(() => {
    const wakeUpSidd = async () => {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${VITE_BACKEND_URL}/ping`);
      console.log(response.data);
    }
    wakeUpSidd();
  }, []);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Kuku BuddyCast
        </div>
        <div
          className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          is an AI-powered personalized audio content generator.
        </div>
        <Link to="/home">
          <button
            className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Explore now
          </button>
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
