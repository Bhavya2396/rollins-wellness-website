'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '../data/products';

interface ProductThumbnailsProps {
  products: Product[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const ProductThumbnails: React.FC<ProductThumbnailsProps> = ({ 
  products, 
  currentIndex, 
  onSelect 
}) => {
  return (
    <div className="h-full flex items-center justify-center px-8 relative">
      {/* Ferrari-Style Thumbnail Gallery */}
      <div className="flex space-x-6 overflow-x-auto max-w-7xl py-4">
        {products.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => onSelect(index)}
            className={`relative flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden transition-all duration-500 ${
              index === currentIndex 
                ? 'ring-2 ring-gold-500 shadow-2xl shadow-gold-500/25' 
                : 'hover:scale-105 opacity-60 hover:opacity-90'
            }`}
            whileHover={{ 
              scale: index === currentIndex ? 1.05 : 1.08,
              y: index === currentIndex ? 0 : -8
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 60, opacity: 0, rotateX: 45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 3D Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-800/90 via-luxury-900/80 to-luxury-950/90 backdrop-blur-md border border-luxury-700/30"></div>
            
            {/* Luxury Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
            
            {/* Product Image with 3D Effect */}
            <div className="relative w-full h-full p-3 flex items-center justify-center">
              <motion.div
                className="relative w-full h-full"
                animate={index === currentIndex ? {
                  rotateY: [0, 5, 0],
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={50}
                  className="object-contain filter drop-shadow-lg"
                  style={{
                    filter: index === currentIndex 
                      ? "drop-shadow(0 8px 16px rgba(245,158,11,0.3)) drop-shadow(0 4px 8px rgba(239,68,68,0.2))"
                      : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                  }}
                />
              </motion.div>
            </div>

            {/* Active State Enhancements */}
            {index === currentIndex && (
              <>
                {/* Active Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-accent-500/20 rounded-2xl"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Bottom Indicator - Ferrari Style */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600"
                  layoutId="activeIndicator"
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                />
                
                {/* Corner Accent */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
              </>
            )}

            {/* Hover Effects */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-luxury-800/50 to-transparent opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />

            {/* Product Category Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-950/95 to-transparent p-2">
              <p className="text-white text-xs font-semibold truncate tracking-wide">
                {product.name.split(' ').slice(0, 2).join(' ').toUpperCase()}
              </p>
              <p className="text-gold-500 text-[10px] font-medium">
                {product.category.split(' ')[0]}
              </p>
            </div>

            {/* Luxury Border Highlight */}
            <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${
              index === currentIndex 
                ? 'border-gold-500/50' 
                : 'border-transparent hover:border-luxury-600/50'
            }`}></div>
          </motion.button>
        ))}
      </div>

      {/* Enhanced Navigation Indicators */}
      <motion.div 
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(index)}
            className={`transition-all duration-500 ${
              index === currentIndex 
                ? 'w-8 h-2 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full shadow-lg shadow-gold-500/50' 
                : 'w-2 h-2 bg-luxury-600 hover:bg-luxury-500 rounded-full'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={index === currentIndex ? {
              boxShadow: [
                "0 0 10px rgba(245,158,11,0.5)",
                "0 0 20px rgba(245,158,11,0.8)",
                "0 0 10px rgba(245,158,11,0.5)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Luxury Brand Elements */}
      <motion.div 
        className="absolute top-4 right-8 text-xs text-gray-500 font-medium tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        COLLECTION
      </motion.div>
    </div>
  );
};

export default ProductThumbnails; 