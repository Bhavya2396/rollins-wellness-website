'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
        
        {/* Brand Logo - Ferrari Style */}
        <motion.div 
          className="text-2xl font-bold text-white tracking-wider"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          ROLLINS WELLNESS
        </motion.div>

        {/* Navigation Links - Ferrari Style */}
        <div className="flex items-center space-x-12">
          <motion.a 
            href="#gallery" 
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wider"
            whileHover={{ y: -2 }}
          >
            GALLERY
          </motion.a>
          <motion.a 
            href="#about" 
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wider"
            whileHover={{ y: -2 }}
          >
            ABOUT
          </motion.a>
          <motion.a 
            href="#contact" 
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wider"
            whileHover={{ y: -2 }}
          >
            CONTACT
          </motion.a>
          <motion.a 
            href="/mobile" 
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 text-sm font-medium tracking-wider border border-cyan-500/30 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20"
            whileHover={{ y: -2, scale: 1.05 }}
          >
            MOBILE
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 