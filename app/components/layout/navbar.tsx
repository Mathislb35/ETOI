'use client';

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-stone-100">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">

                {/* Logo */}
                <Link href="/home" className="flex items-center gap-2.5 shrink-0">
                    <img
                        src="/logo.png"
                        width={70}
                        height={70}
                        alt="Logo ETOI"
                        className="object-contain"
                    />
                    <h1 className="text-2xl font-black tracking-tight text-black">
                        ÉTOI
                    </h1>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6 flex-1">
                    <Link href="/home#comment" className="text-sm text-stone-600 hover:text-black">
                        Comment ça marche
                    </Link>
                    <Link href="/home#thematiques" className="text-sm text-stone-600 hover:text-black">
                        Thématiques
                    </Link>
                    <Link href="/home#temoignages" className="text-sm text-stone-600 hover:text-black">
                        Témoignages
                    </Link>
                    <Link href="/home#choix" className="text-sm text-stone-600 hover:text-black">
                        Choisir ÉTOI
                    </Link>
                </nav>

                {/* Auth buttons */}
                <div className="hidden md:flex items-center gap-3 ml-auto">
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm"
                    >
                        Connexion
                    </Link>

                    <Link
                        href="/register"
                        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-linear-to-br from-sky-500 to-pink-400 hover:shadow-sm hover:-translate-y-0.5"
                    >
                        <span>S&apos;inscrire</span>
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Mobile button */}
                <button
                    className="md:hidden ml-auto p-2 text-stone-500 hover:text-stone-800"
                    onClick={() => setMobileOpen(v => !v)}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-3">
                    <Link href="#comment" className="text-sm text-stone-700 py-1">
                        Comment ça marche
                    </Link>
                    <Link href="#thematiques" className="text-sm text-stone-700 py-1">
                        Thématiques
                    </Link>
                    <Link href="#temoignages" className="text-sm text-stone-700 py-1">
                        Témoignages
                    </Link>
                    <Link href="#choix" className="text-sm text-stone-700 py-1">
                        Choisir ÉTOI
                    </Link>

                    <div className="pt-2 flex flex-col gap-2 border-t border-stone-100">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-center border-2 text-black py-2 rounded-lg"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/register"
                            className="text-sm font-medium text-center border-2 text-black py-2 rounded-lg"
                        >
                            S'inscrire
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}