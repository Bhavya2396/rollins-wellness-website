'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MedicalDevice3D = dynamic(() => import('../components/MedicalDevice3D'), {
	ssr: false,
	loading: () => <div className="w-full h-full bg-[#2a3142]" />
});

export default function OligoscanPage() {
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

	// Benefits and Specs content
	const benefits: string[] = [
		'Instant mineral analysis',
		'Detects deficiency/excess in minerals & potential toxic metal poisoning',
		'Customized healthcare assessment (lab tests, nutrition, supplements, activity, etc.)',
		'Adaptable service for specific needs'
	];

	const specs: { name: string; value: string }[] = [
		{ name: 'Simple Use', value: 'Measurement is taken directly by a portable spectrometer connected to a computer' },
		{ name: 'Rapid Results', value: 'Evaluation of trace minerals reserves, oxidative stress & toxic metals' },
		{ name: 'Certified Technology', value: 'Based on spectroscopy' },
		{ name: 'Direct at your office', value: 'Non-invasive measurement taken in situ' }
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
				<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
					<Link href="/" className="text-white text-xl font-bold hover:text-indigo-300 transition-colors">← Back to Home</Link>
					<div className="text-white text-lg font-semibold">Oligoscan</div>
				</div>
			</nav>

			<section className="pt-20 pb-16 px-4">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
					{/* Left: 3D Model + Benefits (near model) */}
					<div>
						<div className="h-[600px] relative">
							<MedicalDevice3D
								modelUrl={"https://gbt3sbuqldp6frke.public.blob.vercel-storage.com/The%20Oligoscan%201.glb"}
								fallbackImage="/images/device-placeholder.svg"
								deviceName="Oligoscan"
								category="Diagnostic"
								rating={4.9}
								scrollProgress={scrollProgress}
							/>
						</div>

						{/* Benefits under the model */}
						<div className="mt-8 grid sm:grid-cols-2 gap-4">
							{benefits.map((b, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.5, delay: i * 0.05 }}
									className="p-4 rounded-xl border border-white/20 bg-white/5 hover:border-white/40 transition-colors"
								>
									<div className="text-indigo-300 text-xl mb-2">✨</div>
									<p className="text-white/90">{b}</p>
								</motion.div>
							))}
						</div>
					</div>

					{/* Right: Content + Animated Specs */}
					<div className="space-y-6">
						<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold text-white">
							Oligoscan
						</motion.h1>
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-4 text-gray-300 text-lg">
							<p>
								The OLIGOSCAN – A revolutionary method to detect, in real time, intracellular levels of essential minerals, trace elements, and heavy metals using spectrophotometry.
							</p>
							<p>
								This non-invasive technique produces immediate test results. The technology is an invaluable screening tool for measuring actual tissue levels, located 4mm into the dermis, providing an intracellular snapshot of one’s health.
							</p>
							<p>
								Developed in France after decades of research, the Oligoscan is a sophisticated test that is simple to administer. After collecting specific essential information including height, weight, age, and blood type, readings are taken using a spectrophotometer device at four different locations from the person’s non-dominant hand. The collected data is then transmitted to the Oligoscan servers, where it is analyzed against a vast database. You and your doctor can then immediately view the results.
							</p>
						</motion.div>

						{/* Specs with animations */}
						<div className="pt-6">
							<motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-white mb-6">
								Technical Specifications
							</motion.h2>
							<div className="grid md:grid-cols-1 gap-4">
								{specs.map((s, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 14 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.2 }}
										transition={{ duration: 0.45, delay: i * 0.08 }}
										className="p-5 rounded-xl border transition-all duration-300 border-white/20 bg-white/5 hover:border-white/40"
									>
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