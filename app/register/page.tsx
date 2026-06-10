import Link from 'next/link';
import { Building2, BriefcaseBusiness } from 'lucide-react';

export default function RegisterChoicePage() {
    return (
        <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
            {/* Content */}
            <main className="flex-1 flex items-center justify-center mt-10 px-6 pb-10">
                <div className="w-full max-w-6xl">
                    {/* Title */}
                    <div className="text-center mb-14">
                        <h1 className="text-5xl font-bold text-stone-900 mb-4">
                            Qui êtes-vous ?
                        </h1>

                        <p className="text-lg text-stone-500">
                            Choisissez votre espace pour continuer sur ÉTOI
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* SCHOOL */}
                        <Link
                            href="/register/school"
                            className="
                group
                relative
                overflow-hidden
                rounded-[36px]
                bg-sky-500
                p-10
                min-h-[420px]
                border
                border-sky-200
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
                        >
                            {/* Blur effect */}
                            <div className="
                absolute
                top-0
                right-0
                w-72
                h-72
                bg-white/30
                rounded-full
                blur-3xl
              " />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon */}
                                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/70
                  flex
                  items-center
                  justify-center
                  text-sky-700
                  mb-8
                  shadow-sm
                ">
                                    <Building2 size={32} />
                                </div>

                                {/* Text */}
                                <div className="mb-8">
                  <span className="text-sm font-semibold text-sky-700 uppercase tracking-widest">
                    Je suis...
                  </span>

                                    <h2 className="text-5xl font-black text-sky-900 mt-3 mb-6">
                                        L'ÉTABLISSEMENT
                                    </h2>

                                    <p className="text-sky-900/80 leading-relaxed text-lg max-w-md">
                                        Trouvez facilement des intervenants professionnels
                                        correspondant à vos programmes, conférences et besoins pédagogiques.
                                    </p>
                                </div>

                                {/* Button */}
                                <div className="mt-auto">
                                    <div className="
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-3.5
                    rounded-2xl
                    bg-sky-700
                    text-white
                    font-semibold
                    group-hover:bg-sky-800
                    transition
                  ">
                                        J'accède à l'espace établissement
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* VOLUNTEER */}
                        <Link
                            href="/register/volunteer"
                            className="
                group
                relative
                overflow-hidden
                rounded-[36px]
                bg-pink-400
                p-10
                min-h-[420px]
                border
                border-pink-200
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
                        >
                            {/* Blur effect */}
                            <div className="
                absolute
                bottom-0
                left-0
                w-72
                h-72
                bg-white/30
                rounded-full
                blur-3xl
              " />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon */}
                                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/70
                  flex
                  items-center
                  justify-center
                  text-pink-700
                  mb-8
                  shadow-sm
                ">
                                    <BriefcaseBusiness size={32} />
                                </div>

                                {/* Text */}
                                <div className="mb-8">
                  <span className="text-sm font-semibold text-pink-700 uppercase tracking-widest">
                    Je suis...
                  </span>

                                    <h2 className="text-5xl font-black text-pink-700 mt-3 mb-6">
                                        LE PROFESSIONNEL
                                    </h2>

                                    <p className="text-pink-900/80 leading-relaxed text-lg max-w-md">
                                        Valorisez votre expérience et transmettez votre savoir
                                        aux étudiants bretons à travers des interventions bénévoles.
                                    </p>
                                </div>

                                {/* Button */}
                                <div className="mt-auto">
                                    <div className="
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-3.5
                    rounded-2xl
                    bg-pink-600
                    text-white
                    font-semibold
                    group-hover:bg-pink-700
                    transition
                  ">
                                        Je deviens intervenant
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Bottom stats */}
                    <div className="mt-20 text-center">
                        <h3 className="text-3xl font-bold text-stone-900 mb-10">
                            La communauté ÉTOI en chiffres
                        </h3>

                        <div className="flex flex-wrap justify-center gap-8">
                            {[
                                {
                                    value: '320+',
                                    label: 'Intervenants bénévoles',
                                    color: 'from-amber-400 to-yellow-500',
                                },
                                {
                                    value: '48',
                                    label: 'Établissements partenaires',
                                    color: 'from-sky-500 to-sky-600',
                                },
                                {
                                    value: '1 200+',
                                    label: 'Interventions réalisées',
                                    color: 'from-pink-500 to-pink-400',
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className={`
                    w-44
                    h-44
                    rounded-full
                    bg-gradient-to-br
                    ${stat.color}
                    text-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    shadow-xl
                  `}
                                >
                  <span className="text-4xl font-black mb-2">
                    {stat.value}
                  </span>

                                    <span className="text-sm text-center px-6 leading-snug">
                    {stat.label}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}