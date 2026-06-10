'use client';

import { useState, useMemo } from 'react';
import {
    Bell, LogOut, MapPin, Calendar, Clock,
    CheckCircle, ChevronRight, Search, Filter,
    Star, Briefcase, Users, Send, X
} from 'lucide-react';

/* ───────────────────────────────
   MOCK / API READY STRUCTURE
   (à remplacer par Prisma plus tard)
─────────────────────────────── */

type Demande = {
    id: string;
    theme: string;
    description: string;
    date?: string | null;
    duration?: string | null;
    level?: string | null;
    school: {
        city: string;
        name: string;
    };
};

type Mission = {
    id: string;
    status: 'CONFIRMED' | 'COMPLETED';
    date?: string;
    duration?: string;
    school: {
        name: string;
        city: string;
    };
};

/* ─────────────────────────────── */

const USER = {
    firstname: 'Jean',
    lastname: 'Dupont',
    expertise: 'Développement web',
};

/* ───────────────────────────────
   EMPTY DATA (API READY)
─────────────────────────────── */

const demandesDisponibles: Demande[] = [];
const missions: Mission[] = [];
const candidatures: string[] = [];

export default function IntervenantDashboard() {
    const [activeTab, setActiveTab] = useState<'demandes' | 'missions'>('demandes');
    const [search, setSearch] = useState('');
    const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);

    /* ───────────────────────────────
       STATS DYNAMIQUES
    ─────────────────────────────── */

    const stats = useMemo(() => ({
        applications: candidatures.length,
        availableRequests: demandesDisponibles.length,
        confirmedMissions: missions.filter(m => m.status === 'CONFIRMED').length,
        completedMissions: missions.filter(m => m.status === 'COMPLETED').length,
    }), []);

    const filteredDemandes = useMemo(() => {
        return demandesDisponibles.filter(d =>
            d.theme.toLowerCase().includes(search.toLowerCase()) ||
            d.school.name.toLowerCase().includes(search.toLowerCase()) ||
            d.school.city.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const hasDemandes = demandesDisponibles.length > 0;
    const hasMissions = missions.length > 0;

    /* ───────────────────────────────
       UI
    ─────────────────────────────── */

    return (
        <div className="min-h-screen bg-[#f5f7fb] font-sans">

            {/* ───────── SIDEBAR (inchangée) ───────── */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-stone-200 flex flex-col z-20">
                <div className="px-6 py-5 border-b border-stone-100">
                    <span className="text-sky-600 font-bold text-xl">ÉTOI</span>
                    <span className="ml-2 text-xs text-stone-400 uppercase">Intervenant</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {[
                        { label: 'Tableau de bord', tab: 'demandes', icon: Briefcase },
                    ].map(({ label, tab, icon: Icon }) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                            ${activeTab === tab
                                ? 'bg-sky-50 text-sky-600'
                                : 'text-stone-500 hover:bg-stone-50'}`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="px-4 py-6 border-t border-stone-100">
                    <div className="text-sm text-black font-semibold">{USER.firstname} {USER.lastname}</div>
                    <div className="text-xs text-stone-400">{USER.expertise}</div>
                </div>
            </aside>

            {/* ───────── MAIN ───────── */}
            <main className="ml-64 p-8">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-stone-900">
                        Bonjour {USER.firstname} 👋
                    </h1>
                    <p className="text-stone-500 text-sm">
                        Découvrez les opportunités d’intervention
                    </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Candidatures', value: stats.applications, icon: Send },
                        { label: 'Disponibles', value: stats.availableRequests, icon: Briefcase },
                        { label: 'Confirmées', value: stats.confirmedMissions, icon: Calendar },
                    ].map((s) => (
                        <div key={s.label} className="bg-white p-5 rounded-2xl border">
                            <div className="text-xs text-stone-400">{s.label}</div>
                            <div className="text-2xl font-bold text-stone-900 mt-2">
                                {s.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* TAB DEMANDES */}
                {activeTab === 'demandes' && (
                    <>
                        {/* SEARCH */}
                        <div className="flex gap-3 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-stone-600" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Rechercher..."
                                    className="w-full pl-10 h-10 border rounded-xl bg-white text-stone-500"
                                />
                            </div>
                            <button className="px-4 border rounded-xl bg-white flex items-center gap-2 cursor-pointer">
                                <Filter className="w-4 h-4 text-black" />
                                <p className="text-black">Filtrer</p>
                            </button>
                        </div>

                        {/* EMPTY STATE */}
                        {!hasDemandes ? (
                            <div className="bg-white border border-dashed rounded-3xl p-12 text-center">
                                <Briefcase className="w-10 h-10 mx-auto text-stone-300 mb-3" />
                                <h2 className="font-bold text-stone-800">
                                    Vous n'avez aucune demande d'intervention
                                </h2>
                                <p className="text-stone-500 text-sm mt-2">
                                    Revenez plus tard...
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {filteredDemandes.map(d => (
                                    <div
                                        key={d.id}
                                        onClick={() => setSelectedDemande(d)}
                                        className="bg-white text-black p-5 border rounded-2xl cursor-pointer hover:shadow"
                                    >
                                        <div className="font-semibold">{d.school.name}</div>
                                        <div className="text-xs text-stone-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {d.school.city}
                                        </div>

                                        <div className="mt-3 text-sm text-stone-500 line-clamp-2">
                                            {d.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* TAB MISSIONS */}
                {activeTab === 'missions' && (
                    <>
                        {!hasMissions ? (
                            <div className="bg-white border border-dashed rounded-3xl p-12 text-center">
                                <Calendar className="w-10 h-10 mx-auto text-stone-300 mb-3" />
                                <h2 className="font-bold text-stone-800">
                                    Aucune mission planifiée
                                </h2>
                                <p className="text-stone-500 text-sm mt-2">
                                    Vos missions apparaîtront ici.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {missions.map(m => (
                                    <div key={m.id} className="bg-white border rounded-2xl p-5 flex justify-between">
                                        <div>
                                            <div className="font-semibold">{m.school.name}</div>
                                            <div className="text-xs text-stone-400">{m.school.city}</div>
                                        </div>

                                        <span className="text-xs px-3 py-1 rounded-full border">
                                            {m.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

            </main>

            {/* MODAL */}
            {selectedDemande && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
                        <button onClick={() => setSelectedDemande(null)}>
                            <X />
                        </button>

                        <h2 className="font-bold text-lg mt-2">
                            {selectedDemande.school.name}
                        </h2>

                        <p className="text-sm text-stone-500 mt-3">
                            {selectedDemande.description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}