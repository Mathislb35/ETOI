'use client';

import { useEffect, useState } from 'react';
import {MapPin, X, Send, Building2, MessageCirclePlus, ClipboardList, Search, Filter} from 'lucide-react';

/* ───────────────────────────────
   Types
─────────────────────────────── */
type School = {
    name: string;
    city: string;
    postalCode: string;
    managerName: string;
    managerRole: string;
};

type Intervenant = {
    id: number;
    firstname: string;
    lastname: string;
    expertise: string;
    city: string;
    linkedin: string;
    interventions: number;
    rating: number;
    available: boolean;
};

type Demande = {
    id: number;
    theme: string;
    description: string;
    date: string;
    duration: string;
    status: 'open' | 'confirmed';
    applicants: number;
};

type DashboardData = {
    school: School | null;
    intervenants: Intervenant[];
    demandes: Demande[];
};

export default function SchoolDashboard() {
    const [activeTab, setActiveTab] =
        useState<'intervenants' | 'demandes'>('intervenants');

    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState<DashboardData>({
        school: null,
        intervenants: [],
        demandes: [],
    });

    const [form, setForm] = useState({
        theme: '',
        description: '',
        date: '',
        duration: '',
        level: '',
    });

    /* ───────── FETCH DATA ───────── */
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/dashboard/school', {
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('API error');

                const json = await res.json();

                setData({
                    school: json.school ?? null,
                    intervenants: json.intervenants ?? [],
                    demandes: json.demandes ?? [],
                });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleCreateDemande = async () => {
        try {
            const res = await fetch('/api/demandes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Erreur création demande');

            const newDemande = await res.json();

            setData(prev => ({
                ...prev,
                demandes: [newDemande, ...prev.demandes],
            }));

            setForm({
                theme: '',
                description: '',
                date: '',
                duration: '',
                level: '',
            });

            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreateDemande();
    };

    if (loading) {
        return (
            <div className="min-h-screen p-8 space-y-4">
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-64 bg-gray-200 animate-pulse rounded" />
            </div>
        );
    }

    const school = data.school;

    return (
        <div className="min-h-screen bg-[#f5f7fb]">

            {/* ───────── SIDEBAR ───────── */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r flex flex-col">
                <div className="p-5 border-b">
                    <h1 className="text-sky-600 font-bold text-xl">ÉTOI</h1>
                    <p className="text-xs text-stone-400">Établissement</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('intervenants')}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                            activeTab === 'intervenants'
                                ? 'bg-sky-50 text-sky-600'
                                : 'text-stone-500'
                        }`}
                    >
                        <ClipboardList size={18} />Tableau de bord
                    </button>
                </nav>

                <div className="p-4 border-t text-sm text-stone-500">
                    {school?.name}
                </div>
            </aside>

            {/* ───────── MAIN ───────── */}
            <main className="ml-64 p-8">

                {/* HEADER */}
                <div className="mb-8">
                    <h2 className="text-2xl text text-black font-bold">
                        Bonjour {school?.managerName} 👋
                    </h2>

                    <p className="text-stone-500 flex items-center gap-2 mb-2">
                        <MapPin size={14} />
                        {school?.city} {school?.postalCode}
                    </p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="group flex items-center justify-center gap-2 cursor-pointer bg-white text-stone-800 font-semibold px-4 py-2 rounded-xl border border-stone-200 hover:border-stone-500 transition shadow-sm"
                    >
                        <MessageCirclePlus size={18} />
                        <span>Nouvelle demande</span>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border">
                        <div className="text-xs text-stone-400">
                            Intervenants disponibles
                        </div>

                        <div className="text-2xl font-bold text-stone-900 mt-2">
                            {data.intervenants.length}
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border">
                        <div className="text-xs text-stone-400">
                            Demandes créées
                        </div>

                        <div className="text-2xl font-bold text-stone-900 mt-2">
                            {data.demandes.length}
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border">
                        <div className="text-xs text-stone-400">
                            Interventions réalisées
                        </div>

                        <div className="text-2xl font-bold text-stone-900 mt-2">
                            0
                        </div>
                    </div>
                </div>

                {/* SEARCH */}
                {activeTab === 'intervenants' && (
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

                        {data.intervenants.length === 0 ? (
                            <div className="bg-white border border-dashed rounded-3xl p-12 text-center">
                                <h2 className="font-bold text-stone-800">
                                    Aucun intervenant disponible
                                </h2>

                                <p className="text-stone-500 text-sm mt-2">
                                    Les intervenants apparaîtront ici.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {data.intervenants.map((intervenant) => (
                                    <div
                                        key={intervenant.id}
                                        className="bg-white border rounded-2xl p-5"
                                    >
                                        <h3 className="font-semibold text-black">
                                            {intervenant.firstname} {intervenant.lastname}
                                        </h3>

                                        <p className="text-sm text-sky-600 mt-1">
                                            {intervenant.expertise}
                                        </p>

                                        <p className="text-xs text-stone-400 mt-2">
                                            {intervenant.city}
                                        </p>

                                        <button className="mt-4 w-full bg-sky-600 text-white py-2 rounded-xl">
                                            Contacter
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* EMPTY DEMANDES */}
                {data.demandes.length === 0 &&
                    activeTab === 'demandes' && (
                        <div className="bg-white p-10 rounded-2xl border text-center">
                            <h3 className="font-semibold text-lg">
                                Aucune demande pour le moment
                            </h3>

                            <p className="text-sm text-stone-500 mt-1">
                                Créez votre première demande.
                            </p>

                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-4 bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                                Créer une demande
                            </button>
                        </div>
                    )}
            </main>

            {/* ───────── MODALE ───────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-lg rounded-2xl bg-white">

                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="text-lg text-black font-semibold">
                                Demande d’intervention
                            </h2>

                            <button onClick={() => setShowModal(false)} className="cursor-pointer text-black">
                                <X />
                            </button>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="space-y-4 text-black p-5">

                            <input
                                placeholder="Thématique"
                                className="w-full border p-2 rounded"
                                value={form.theme}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        theme: e.target.value,
                                    })
                                }
                            />

                            <textarea
                                placeholder="Description"
                                className="w-full border p-2 rounded min-h-[100px]"
                                value={form.description}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="date"
                                className="w-full border p-2 rounded"
                                value={form.date}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        date: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="time"
                                className="w-full border p-2 rounded"
                                value={form.duration}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        duration: e.target.value,
                                    })
                                }
                            />

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 cursor-pointer bg-black text-white p-3 rounded"
                            >
                                Envoyer <Send size={18} />
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}