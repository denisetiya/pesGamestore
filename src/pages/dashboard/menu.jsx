import AdminCard from "../../components/cardAdmin";
import MiniMenu from "../../components/miniMenu";
import { motion } from "framer-motion";
function MenuAdmin() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-xl font-bold text-center"
        >
          Account List
        </motion.p>
        <AdminCard />
      </div>

      <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="w-full px-8">
        <MiniMenu />
      </motion.div>
    </div>
  );
}

export default MenuAdmin;
