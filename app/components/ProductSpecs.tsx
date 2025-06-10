'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductSpecsProps {
  product: Product;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gradient mb-2">SPECIFICATIONS</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full"></div>
      </motion.div>

      {/* Specifications List */}
      <motion.div 
        className="space-y-4"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {Object.entries(product.specs).map(([key, value], index) => (
          <motion.div
            key={key}
            className="luxury-card p-4"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-gold-500 font-semibold text-sm mb-1">{key}</h4>
                {Array.isArray(value) ? (
                  <div className="space-y-1">
                    {value.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-accent-500 rounded-full"></div>
                        <span className="text-gray-300 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white font-medium text-sm">{value}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Applications */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-accent-500 mb-3">Applications</h3>
        <div className="grid grid-cols-1 gap-2">
          {product.applications.slice(0, 6).map((application, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 p-2 rounded-lg bg-luxury-800/30 border border-luxury-700/20"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
            >
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-gray-300 text-xs">{application}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Premium Badge */}
      <motion.div
        className="luxury-card p-4 text-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-gold-500 font-bold text-lg mb-1">PREMIUM</div>
        <div className="text-gray-400 text-xs">Medical Grade Technology</div>
        <div className="mt-2 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gold-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <motion.button 
          className="w-full luxury-button-outline text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          REQUEST QUOTE
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProductSpecs; 