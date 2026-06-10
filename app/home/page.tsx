"use client";

import '@/app/components/layout/navbar';
import Link from "next/link";
import { useState } from "react";

import {
    Sparkles,
    ArrowRight,
    GraduationCap,
    Users,
    Calendar,
    MapPin,
    Star,
    CheckCircle,
    ChevronRight,
    Handshake,
    Lightbulb,
    Building2,
    Award,
    Clock,
    Search,
    Menu,
    X,
} from "lucide-react";

/* ─── Types ─── */
interface Stat {
    value: string;
    label: string;
}

interface Step {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

interface ProfileCard {
    name: string;
    role: string;
    company: string;
    domains: string[];
    city: string;
    rating: number;
    avatar: string;
    initials: string;
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    org: string;
    initials: string;
    color: string;
}

/* ─── Data ─── */
const stats: Stat[] = [
    { value: "150 +", label: "Bénévoles actifs" },
    { value: "5", label: "Établissements partenaires" },
    { value: "500 +", label: "Interventions réalisées" },
];

const stepsSchool: Step[] = [
    {
        icon: <Search size={22} />,
        title: "Déposez votre besoin",
        description:
            "Décrivez l'intervention souhaitée : thématique, format, niveau d'études et date indicative.",
        color: "bg-sky-50 text-sky-600",
    },
    {
        icon: <Users size={22} />,
        title: "Recevez des profils",
        description:
            "ÉTOI vous propose des professionnels disponibles et correspondant à votre demande.",
        color: "bg-indigo-50 text-indigo-600",
    },
    {
        icon: <Calendar size={22} />,
        title: "Planifiez l'intervention",
        description:
            "Échangez directement avec le bénévole et confirmez la date depuis la plateforme.",
        color: "bg-emerald-50 text-emerald-600",
    },
];

const stepsVolunteer: Step[] = [
    {
        icon: <Award size={22} />,
        title: "Créez votre profil",
        description:
            "Renseignez vos expertises, disponibilités et les thématiques sur lesquelles vous intervenez.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: <Lightbulb size={22} />,
        title: "Recevez des sollicitations",
        description:
            "Les établissements vous contactent pour des interventions en cours, TD, conférences ou jurys.",
        color: "bg-rose-50 text-rose-600",
    },
    {
        icon: <Handshake size={22} />,
        title: "Partagez votre expertise",
        description:
            "Intervenez à votre rythme et contribuez à l'enseignement supérieur breton.",
        color: "bg-violet-50 text-violet-600",
    },
];

const profiles: ProfileCard[] = [
    {
        name: "Sophie Kermarrec",
        role: "Directrice Innovation",
        company: "Crédit Agricole du Morbihan",
        domains: ["Finance", "ESG", "Management"],
        city: "Vannes",
        rating: 4.9,
        avatar: "SK",
        initials: "SK",
    },
    {
        name: "Thomas Guillou",
        role: "Fondateur & CEO",
        company: "OcéanTech SAS",
        domains: ["Entrepreneuriat", "Tech", "Océan"],
        city: "Brest",
        rating: 5.0,
        avatar: "TG",
        initials: "TG",
    },
    {
        name: "Anne-Cécile Le Bras",
        role: "Avocate associée",
        company: "Le Bras & Associés",
        domains: ["Droit des affaires", "Contrats"],
        city: "Rennes",
        rating: 4.8,
        avatar: "AL",
        initials: "AL",
    },
    {
        name: "Yannick Morel",
        role: "Ingénieur R&D",
        company: "Naval Group",
        domains: ["Mécanique", "Industrie navale"],
        city: "Lorient",
        rating: 4.7,
        avatar: "YM",
        initials: "YM",
    },
];

const testimonials: Testimonial[] = [
    {
        quote:
            "ÉTOI nous a permis de trouver en 48 h un intervenant pour un TD de comptabilité que nous n'arrivions plus à couvrir. Simplicité et réactivité remarquables.",
        author: "Isabelle Tanguy",
        role: "Responsable pédagogique",
        org: "IAE Rennes",
        initials: "IT",
        color: "bg-sky-100 text-sky-700",
    },
    {
        quote:
            "En tant que bénévole, la plateforme me donne de la visibilité et me met en relation avec des étudiants vraiment motivés. Je recommande à tous les professionnels bretons.",
        author: "Loïc Guérin",
        role: "Directeur Commercial",
        org: "Agence Guérin & Co",
        initials: "LG",
        color: "bg-emerald-100 text-emerald-700",
    },
    {
        quote:
            "L'outil de matching est bluffant : les profils proposés étaient exactement dans notre domaine et disponibles aux créneaux souhaités.",
        author: "Martine Pouliquen",
        role: "Chef de département",
        org: "UBO Brest",
        initials: "MP",
        color: "bg-violet-100 text-violet-700",
    },
];

const domains = [
    "Droit & Juridique",
    "Finance & Gestion",
    "Numérique & IA",
    "Industrie & Ingénierie",
    "Entrepreneuriat",
    "Santé & Social",
    "Communication",
    "Architecture & BTP",
    "Marine & Maritime",
    "Agriculture & Agri-food",
    "Design & Créativité",
    "Tourisme & Hôtellerie",
];

const avatarColors = [
    "bg-sky-100 text-sky-700",
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
];

/* ─── Sub-components ─── */
function StepCard({ step, index }: { step: Step; index: number }) {
    return (
        <div className="flex gap-5">
            <div className="shrink-0 flex flex-col items-center">
                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${step.color}`}
                >
                    {step.icon}
                </div>
                {index < 2 && (
                    <div className="w-px flex-1 mt-3 bg-linear-to-b from-stone-200 to-transparent" />
                )}
            </div>
            <div className="pt-1 pb-8">
                <h4 className="font-semibold text-stone-800 mb-1">{step.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

function ProfileCardComponent({
                                  profile,
                                  i,
                              }: {
    profile: ProfileCard;
    i: number;
}) {
    return (
        <div className="bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4">
            <div className="flex items-start gap-3">
                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-semibold text-sm shrink-0 ${avatarColors[i % avatarColors.length]}`}
                >
                    {profile.initials}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-stone-800 text-sm leading-tight truncate">
                        {profile.name}
                    </p>
                    <p className="text-xs text-stone-500 truncate">{profile.role}</p>
                    <p className="text-xs text-stone-400 truncate">{profile.company}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-stone-600">
            {profile.rating}
          </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {profile.domains.map((d) => (
                    <span
                        key={d}
                        className="text-xs bg-stone-50 text-stone-600 border border-stone-200 px-2 py-0.5 rounded-full"
                    >
            {d}
          </span>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-stone-400">
                    <MapPin size={11} />
                    {profile.city}
                </div>
                <button className="text-xs text-sky-600 font-medium hover:text-sky-800 flex items-center gap-1">
                    Voir le profil <ChevronRight size={12} />
                </button>
            </div>
        </div>
    );
}

/* ─── Main page ─── */
export default function HomePage() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans antialiased">


            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-linear-to-b from-sky-50 to-white pt-10 pb-28">
                {/* Cercle de couleurs */}
                <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-100/60 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl" />

                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Badge */}
                        <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Sparkles size={12} />
              Plateforme 100 % bretonne
            </span>

                        <h1 className="text-7xl md:text-6xl lg:text-7xl font-extrabold text-black animate-fade-up mb-6">
                            Connecter {" "}
                            <span className="bg-linear-to-br from-sky-500 to-pink-400 bg-clip-text text-transparent">l'enseignement supérieur</span> avec
                            des <span className="bg-linear-to-br from-sky-500 to-pink-400 bg-clip-text text-transparent">professionnels engagés </span>
                        </h1>

                        <p className="text-lg text-stone-500 leading-relaxed mb-10 max-w-2xl mx-auto">
                            ÉTOI facilite la mise en relation entre bénévoles passionnés et
                            établissements d'enseignement supérieur en Bretagne pour des
                            interventions inspirantes.
                        </p>

                        {/* CTA dual */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register/volunteer"
                                className="group flex items-center justify-center gap-2 bg-linear-to-br from-sky-500 to-pink-400 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-sky-700 transition shadow-sm"
                            >
                                <Users size={18} />
                                <span>Devenir intervenant</span>
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110"
                                />
                            </Link>

                            <Link
                                href="/register/school"
                                className="group flex items-center justify-center gap-2 bg-white text-stone-800 font-semibold px-6 py-3.5 rounded-xl border border-stone-200 hover:border-stone-500 transition shadow-sm"
                            >
                                <Building2 size={18} />
                                <span>Accès établissement</span>
                            </Link>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="bg-white rounded-2xl border border-stone-100 shadow-sm px-6 py-5 text-center"
                            >
                                <p className="text-3xl font-bold text-black mb-1">
                                    {s.value}
                                </p>
                                <p className="text-sm text-stone-500">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Comment ça marche ── */}
            <section id="comment" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest">
              Fonctionnement
            </span>
                        <h2 className="mt-3 text-3xl font-bold text-stone-900">
                            Simple pour tout le monde
                        </h2>
                        <p className="mt-3 text-stone-500 max-w-xl mx-auto">
                            Que vous soyez établissement ou professionnel, la démarche est
                            pensée pour être rapide et sans friction.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Établissements */}
                        <div id="etablissements">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-9 h-9 rounded-lg bg-white border-2 flex items-center justify-center">
                                    <Building2 size={18} className="text-gray-500" />
                                </div>
                                <h3 className="font-bold text-stone-800">
                                    Pour les établissements
                                </h3>
                            </div>
                            <div>
                                {stepsSchool.map((step, i) => (
                                    <StepCard key={step.title} step={step} index={i} />
                                ))}
                            </div>
                            <Link
                                href="/auth/register?type=school"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110"
                            >
                                Inscrire mon établissement
                                <ArrowRight size={14}/>
                            </Link>
                        </div>

                        {/* Bénévoles */}
                        <div id="benevoles">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-9 h-9 rounded-lg bg-white border-2 flex items-center justify-center">
                                    <Users size={18} className="text-gray-500" />
                                </div>
                                <h3 className="font-bold text-stone-800">
                                    Pour les intervenants
                                </h3>
                            </div>
                            <div>
                                {stepsVolunteer.map((step, i) => (
                                    <StepCard key={step.title} step={step} index={i} />
                                ))}
                            </div>
                            <Link
                                href="/auth/register?type=volunteer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-800"
                            >
                                Devenir intervenant <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>



            {/* ── Domaines d'expertise ── */}
            <section id="thematiques" className="py-24 bg-stone-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest">
              Thématiques
            </span>
                        <h2 className="mt-3 text-3xl font-bold text-stone-900">
                            Tous les domaines d'expertise
                        </h2>
                        <p className="mt-3 text-stone-500 max-w-xl mx-auto">
                            Trouvez un intervenant dans votre domaine, quel que soit votre
                            programme.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {domains.map((d) => (
                            <button
                                key={d}
                                className="text-sm bg-white border border-stone-200 text-stone-700 px-4 py-2 rounded-full hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Témoignages ── */}
            <section id="temoignages" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest">
              Témoignages
            </span>
                        <h2 className="mt-3 text-3xl font-bold text-stone-900">
                            Ils utilisent ÉTOI
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div
                                key={t.author}
                                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex flex-col gap-5"
                            >
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className="text-amber-400 fill-amber-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-stone-600 text-sm leading-relaxed flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs ${t.color}`}
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-stone-800">
                                            {t.author}
                                        </p>
                                        <p className="text-xs text-stone-500">
                                            {t.role} — {t.org}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Avantages ── */}
            <section id="choix" className="py-24 bg-stone-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest">
              Pourquoi ÉTOI
            </span>
                        <h2 className="mt-3 text-3xl font-bold text-stone-900">
                            Une plateforme pensée pour la Bretagne
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <CheckCircle size={20} className="text-sky-600" />,
                                title: "100 % gratuit",
                                desc: "Pour les bénévoles comme pour les établissements. ÉTOI est un service sans but lucratif.",
                                bg: "bg-sky-50",
                            },
                            {
                                icon: <MapPin size={20} className="text-emerald-600" />,
                                title: "Ancrage territorial",
                                desc: "Tous les profils sont basés en Bretagne. On mise sur la proximité géographique et culturelle.",
                                bg: "bg-emerald-50",
                            },
                            {
                                icon: <Clock size={20} className="text-amber-600" />,
                                title: "Mise en relation rapide",
                                desc: "De votre besoin à la confirmation d'intervention en moins de 72 heures en moyenne.",
                                bg: "bg-amber-50",
                            },
                            {
                                icon: <Award size={20} className="text-violet-600" />,
                                title: "Bénévoles vérifiés",
                                desc: "Chaque profil est validé par notre équipe avant d'apparaître dans les résultats.",
                                bg: "bg-violet-50",
                            },
                            {
                                icon: <GraduationCap size={20} className="text-indigo-600" />,
                                title: "Tous niveaux",
                                desc: "Licence, master, BTS, BUT… nous couvrons l'ensemble de l'enseignement supérieur.",
                                bg: "bg-indigo-50",
                            },
                            {
                                icon: <Handshake size={20} className="text-rose-600" />,
                                title: "Suivi & évaluation",
                                desc: "Chaque intervention est évaluée pour garantir la qualité et améliorer l'expérience.",
                                bg: "bg-rose-50",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex gap-4 p-6 rounded-2xl bg-white border border-stone-200 hover:border-2 transition"
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-stone-800 mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-stone-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA final ── */}
            <section className="py-24 bg-linear-to-r from-sky-500 via-pink-400 to-amber-400">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                        Rejoignez la communauté ÉTOI
                    </h2>
                    <p className="text-sky-100 text-lg mb-10 leading-relaxed">
                        Que vous soyez professionnel breton souhaitant partager votre
                        expérience, ou établissement en quête d&apos;intervenants, ÉTOI vous
                        ouvre les portes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register/volunteer"
                            className="flex items-center justify-center gap-2 text-black bg-white font-semibold px-6 py-3.5 rounded-xl hover:bg-sky-50 transition shadow-sm"
                        >
                            <Users size={18} />
                            Devenir intervenant
                            <ArrowRight size={18}
                                        className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110"/>
                        </Link>
                        <Link
                            href="/register/school"
                            className="flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl border-2 border-white transition"
                        >
                            <Building2 size={18} />
                            Accès établissement
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="bg-stone-900 text-stone-400 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Link href="/home" className="flex items-center gap-2.5 shrink-0">
                                    <img
                                        src="/logo.png"
                                        width={70}
                                        height={70}
                                        alt="Logo ETOI"
                                        className="object-contain"
                                    />
                                </Link>
                                <span className="font-bold text-white text-sm">ÉTOI</span>
                            </div>
                            <p className="text-xs leading-relaxed">
                                La plateforme de mise en relation pour l&#39;enseignement supérieur
                                breton.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-xs font-semibold text-stone-300 uppercase tracking-widest mb-4">
                                Plateforme
                            </h5>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/benevoles" className="hover:text-white transition">
                                        Trouver un bénévole
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/etablissements"
                                        className="hover:text-white transition"
                                    >
                                        Établissements
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/home#thematiques" className="hover:text-white transition">
                                        Domaines
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-xs font-semibold text-stone-300 uppercase tracking-widest mb-4">
                                Ressources
                            </h5>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/faq" className="hover:text-white transition">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-white transition">
                                        Nous contacter
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-white transition">
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-xs font-semibold text-stone-300 uppercase tracking-widest mb-4">
                                Légal
                            </h5>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/mentions-legales"
                                        className="hover:text-white transition"
                                    >
                                        Mentions légales
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/confidentialite"
                                        className="hover:text-white transition"
                                    >
                                        Confidentialité
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cgu" className="hover:text-white transition">
                                        CGU
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs">
                            © {new Date().getFullYear()} ÉTOI Bretagne. Tous droits réservés.
                        </p>
                        <p className="text-xs flex items-center gap-1">
                            <MapPin size={11} /> Rennes, Bretagne
                        </p>
                        <p className="text-xs flex items-center gap-1">
                            Développé par Lebreton--Béchu Mathis
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}