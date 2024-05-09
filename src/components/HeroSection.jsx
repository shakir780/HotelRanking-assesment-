import HeroBg from "../assets/HotelBg.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroBg})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      className="h-[50vh] lg:h-fit py-32 justify-start"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="mt-16 text-white flex flex-col gap-2 lg:gap-8 capitalize px-3 lg:px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.span
          className="text-xl lg:text-5xl font-semibold opacity-85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Hotel Rankings
        </motion.span>
        <motion.span
          className="text-sm lg:text-xl opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Explore, compare, and curate your ideal accommodations with ease
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
