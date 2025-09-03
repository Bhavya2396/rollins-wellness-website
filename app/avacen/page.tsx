'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MedicalDevice3D = dynamic(() => import('../components/MedicalDevice3D'), {
	ssr: false,
	loading: () => <div className="w-full h-full bg-[#2a3142]" />
});

export default function AvacenPage() {
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
		'Reduces pain and inflammation',
		'Improves microcirculation',
		'Supports joint and muscle health',
		'Promotes relaxation and stress relief',
		'Non-invasive and drug-free solution'
	];

	const specs: { name: string; value: string }[] = [
		{ name: 'Dimensions', value: '16” L × 8” W × 10” H' },
		{ name: 'Connectivity', value: 'Wi-Fi, RFID, Bluetooth support' },
		{ name: 'Application', value: 'Hand and foot therapy device' },
		{ name: 'Design', value: 'Portable, compact design' }
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
				<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
					<Link href="/" className="text-white text-xl font-bold hover:text-cyan-300 transition-colors">← Back to Home</Link>
					<div className="text-white text-lg font-semibold">Avacen Therapy System</div>
				</div>
			</nav>

			<section className="pt-20 pb-16 px-4">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
					{/* Left: 3D Model + Benefits */}
					<div>
						<div className="h-[600px] relative">
							<MedicalDevice3D
								modelUrl={"https://gbt3sbuqldp6frke.public.blob.vercel-storage.com/Rollins%20-%20wellness%20-%20/Avacen%201.glb"}
								fallbackImage="/images/device-placeholder.svg"
								deviceName="Avacen"
								category="Therapy System"
								rating={4.7}
								scrollProgress={scrollProgress}
							/>
						</div>

						<div className="mt-8 grid sm:grid-cols-2 gap-4">
							{benefits.map((b, i) => (
								<motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.05 }} className="p-4 rounded-xl border border-white/20 bg-white/5 hover:border-white/40 transition-colors">
									<div className="text-cyan-300 text-xl mb-2">✨</div>
									<p className="text-white/90">{b}</p>
								</motion.div>
							))}
						</div>
					</div>

					{/* Right: Content + Specs */}
					<div className="space-y-6">
						<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold text-white">
							Avacen
						</motion.h1>
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-4 text-gray-300 text-lg">
							<p>
								The Avacen device is a compact yet powerful therapy system designed to improve circulation, reduce inflammation, and promote natural healing. By safely applying heat therapy to the hands and feet, Avacen increases microcirculation, enabling the body to transport oxygen and nutrients more efficiently. This unique mechanism makes it especially useful for pain management, arthritis, and chronic conditions.
							</p>
							<p>
								Lightweight and portable, Avacen combines advanced medical engineering with user convenience. With wireless connectivity options such as Wi-Fi, RFID, and Bluetooth, it integrates seamlessly into modern clinics and at-home therapy routines.
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
		</div>
	);
} 