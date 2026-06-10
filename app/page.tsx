'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const partners = [
    {
        name: 'Université de Rennes',
        logo: '/Rennes1.png',
    },
    {
        name: 'IGR IAE Rennes',
        logo: '/IGR.png',
    },
    {
        name: 'INSA Rennes',
        logo: '/INSA.png',
    },
    {
        name: 'Rennes 2',
        logo: '/Rennes2.png',
    },
    {
        name: 'Rennes School of Business',
        logo: '/RSB.png',
    },
];

export default function IntroPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/home');
        }, 6000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 overflow-hidden">
            <div className="w-full max-w-5xl text-center animate-fade-in">
                {/* Logo principal */}
                <div className="flex flex-col items-center">
                    <img
                        src="/etoi_logo.png"
                        alt="ETOI"
                        className="
                        w-[320px]
                        md:w-130
                        lg:w-170
                        xl:w-190
                        object-contain"
                    />

                    <p className="mt-4 text-lg md:text-xl text-black">
                        La plateforme qui connecte établissements et intervenants.
                    </p>
                </div>

                {/* Solution Medef */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    <p className="uppercase tracking-[0.25em] text-sm text-black">
                        Une solution du
                    </p>

                    <img
                        src="/medef35.png"
                        alt="MEDEF"
                        className="h-12 object-contain"
                    />
                </div>

                {/* Partenaires */}
                <div className="mt-14">
                    <p className="text-sm uppercase tracking-[0.25em] text-black mb-6">
                        Avec le soutien de ses partenaires 2 ESR
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                        {partners.map((partner) => (
                            <div
                                key={partner.name}
                                className="bg-white/5 border border-white/10 rounded-2xl p-4 h-28 flex items-center justify-center backdrop-blur-sm"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-12 w-auto object-contain opacity-90"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Loader */}
                <div className="mt-14 flex justify-center">
                    <div className="w-10 h-10 border-[3px] border-white/15 border-t-black rounded-full animate-spin" />
                </div>
            </div>
        </main>
    );
}