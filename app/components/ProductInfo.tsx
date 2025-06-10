'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Product } from '../data/products';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="space-y-6">
      {/* Product Title */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
          {product.name.split(' ').map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"></div>
      </motion.div>

      {/* Rating */}
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="text-5xl font-bold text-gradient">
          {product.rating}
        </div>
        <div>
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">Professional Grade</p>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-gray-300 leading-relaxed text-sm">
          {product.longDescription}
        </p>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gold-500 mb-3">Key Benefits</h3>
        <div className="space-y-2">
          {product.features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button 
          className="luxury-button text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EXPLORE DEVICE
        </motion.button>
      </motion.div>

      {/* Company Badge */}
      <motion.div
        className="pt-4 border-t border-luxury-700/30"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
            <span className="text-luxury-900 font-bold text-xs">R</span>
          </div>
          <div>
            <p className="text-gold-500 font-semibold text-sm">ROLLINS WELLNESS</p>
            <p className="text-gray-400 text-xs">Wellness Technology Pioneer</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo; 