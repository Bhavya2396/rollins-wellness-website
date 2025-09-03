'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductGallery from '../components/ProductGallery';
import ClientOnly from '../components/ClientOnly';

const MedicalDevice3D = dynamic(() => import('../components/MedicalDevice3D'), {
	ssr: false,
	loading: () => <div className="w-full h-full bg-[#2a3142]" />
});

export default function HBOT15ATAPage() {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const top = window.scrollY;
			const h = document.documentElement.scrollHeight - window.innerHeight;
			setScrollProgress(h ? top / h : 0);
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const benefits: string[] = [
		'Improves brain function & metabolism',
		'Increases tissue oxygenation',
		'Reduces inflammation & swelling',
		'Enhances wound healing',
		'Supports faster athletic recovery'
	];

	const specs: { name: string; value: string }[] = [
		{ name: 'Internal Volume', value: '1.4㎥' },
		{ name: 'Pressure', value: '50kpa (1.5 ATA)' },
		{ name: 'Dimensions', value: '82" L × 28" W × 51" H' },
		{ name: 'Features', value: 'Touchscreen interface, remote control, LED lighting, intercom, entertainment system, humidity & temperature monitoring, safety relief valves' }
	];

	const galleryImages = [
		'/images/HBOT 1.5ATA/SGRC0740.JPG',
		'/images/HBOT 1.5ATA/SGRC0743.JPG',
		'/images/HBOT 1.5ATA/SGRC0744.JPG'
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
				<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
					<Link href="/" className="text-white text-xl font-bold hover:text-blue-300 transition-colors">← Back to Home</Link>
					<div className="text-white text-lg font-semibold">HBOT 1.5ATA Chamber</div>
				</div>
			</nav>

			<section className="pt-20 pb-16 px-4">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
					<div>
						<div className="h-[600px] relative">
							<ClientOnly fallback={
								<div className="w-full h-full bg-[#2a3142] flex items-center justify-center">
									<div className="text-center">
										<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
										<p className="text-white text-sm">Loading 3D Model...</p>
									</div>
								</div>
							}>
								<MedicalDevice3D
									modelUrl={"https://gbt3sbuqldp6frke.public.blob.vercel-storage.com/Rollins%20-%20wellness%20-%20/HBOT%201.5ATA%20%282%29.glb"}
									fallbackImage="/images/device-placeholder.svg"
									deviceName="HBOT 1.5ATA"
									category="Hyperbaric Oxygen Therapy"
									rating={4.8}
									scrollProgress={scrollProgress}
								/>
							</ClientOnly>
						</div>

						<div className="mt-8 grid sm:grid-cols-2 gap-4">
							{benefits.map((b, i) => (
								<motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.05 }} className="p-4 rounded-xl border border-white/20 bg-white/5 hover:border-white/40 transition-colors">
									<div className="text-blue-300 text-xl mb-2">✨</div>
									<p className="text-white/90">{b}</p>
								</motion.div>
							))}
						</div>
					</div>

					<div className="space-y-6">
						<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold text-white">
							HBOT 1.5ATA
						</motion.h1>
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-4 text-gray-300 text-lg">
							<p>
								The HBOT 1.5 ATA chamber is a safe, innovative hyperbaric oxygen therapy solution designed to increase oxygen concentration in the bloodstream. By operating at 1.5 atmospheres absolute (ATA), it creates an environment where oxygen dissolves more efficiently into the plasma, tissues, and vital organs. This accelerates the body’s natural healing processes, making it highly effective for recovery, wellness, and prevention.
							</p>
							<p>
								The chamber combines advanced technology with comfort-focused features, such as touchscreen controls, auto/manual operation, LED lighting, and entertainment systems. Equipped with intercoms and real-time monitoring, it ensures safety while maintaining a relaxing user experience. Its spacious interior makes it ideal for clinics, wellness centers, and even home users seeking cutting-edge recovery solutions.
							</p>
						</motion.div>

						<div className="pt-6">
							<motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-white mb-6">
								Technical Specifications
							</motion.h2>
							<div className="grid md:grid-cols-1 gap-4">
								{specs.map((s, i) => (
									<motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.08 }} className="p-5 rounded-xl border transition-all duration-300 border-white/20 bg-white/5 hover:border-white/40">
										<h3 className="text-green-400 font-semibold text-lg mb-1">{s.name}</h3>
										<p className="text-white/90">{s.value}</p>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Product Gallery Section */}
			<ClientOnly>
				<ProductGallery 
					images={galleryImages} 
					productName="HBOT 1.5ATA"
					backgroundTheme={{
						primary: 'blue-600',
						secondary: 'blue-500',
						accent: 'blue-400',
						gradient: 'from-blue-600 to-blue-800',
						accentGradient: 'from-blue-400 to-blue-600'
					}}
				/>
			</ClientOnly>
		</div>
	);
} 