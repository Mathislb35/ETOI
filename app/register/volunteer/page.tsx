'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
    User, Mail, Briefcase, Globe,
    ArrowRight,
    Lock,
    Eye,
    EyeOff,
} from 'lucide-react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/* ───────────────────────────────
   Expertises / thématiques
─────────────────────────────── */
const EXPERTISES = [
    'Développement web',
    'Cybersécurité',
    'Intelligence artificielle',
    'Cloud & DevOps',
    'Data & BI',
    'UX / UI Design',
    'Marketing digital',
    'Entrepreneuriat',
    'Gestion de projet',
    'Réseaux & systèmes',
    'Communication',
    'Finance',
    'Ressources humaines',
    'Droit',
];

/* ───────────────────────────────
   Validation schema
─────────────────────────────── */
const registerSchema = z
    .object({
        firstname: z.string().min(2, 'Prénom requis'),
        lastname: z.string().min(2, 'Nom requis'),

        email: z.string().email('Adresse email invalide'),

        expertise: z.string().min(1, 'Veuillez sélectionner une thématique'),

        linkedin: z
            .string()
            .url('Lien LinkedIn invalide')
            .includes('linkedin.com', {
                message: 'Veuillez entrer un profil LinkedIn valide',
            }),

        password: z
            .string()
            .min(8, 'Minimum 8 caractères'),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });

type RegisterForm = z.infer<typeof registerSchema>;

export default function IntervenantRegisterPage() {
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        setLoading(true);
        setServerError(null);

        try {
            const response = await fetch(
                '/api/auth/register/intervenant',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Impossible de créer le compte");
            }

            const login = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (login?.ok) {
                window.location.href = '/dashboard/volunteer';
            }

        } catch (error: any) {
            setServerError(
                error.message || 'Une erreur est survenue'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fb] flex">

            {/* ───────────────── Left Side ───────────────── */}
            <div className="hidden lg:flex flex-1 bg-sky-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-amber-300 to-amber-400" />

                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col justify-center px-20 text-white max-w-xl">
                    <span className="text-sm uppercase tracking-[0.2em] text-sky-100 mb-6">
                        Plateforme ÉTOI
                    </span>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Rejoignez le réseau des intervenants
                    </h1>

                    <p className="text-lg text-sky-100 leading-relaxed">
                        Partagez votre expertise avec les étudiants
                        bretons et participez aux interventions,
                        conférences et ateliers pédagogiques.
                    </p>
                </div>
            </div>

            {/* ───────────────── Right Side ───────────────── */}
            <div className="flex-1 flex items-center justify-center p-6 mb-10">

                <div className="w-full max-w-xl">

                    {/* Card */}
                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-stone-900 mb-2">
                                Inscription intervenant
                            </h2>

                            <p className="text-stone-500">
                                Créez votre compte professionnel ÉTOI.
                            </p>
                        </div>

                        {/* Server error */}
                        {serverError && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                {serverError}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* Name row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Firstname */}
                                <div>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />

                                        <input
                                            id="firstname"
                                            type="text"
                                            placeholder="Prénom"
                                            {...register('firstname')}
                                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition text-black"
                                        />
                                    </div>

                                    {errors.firstname && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {
                                                errors.firstname
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Lastname */}
                                <div>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />

                                        <input
                                            id="lastname"
                                            type="text"
                                            placeholder="Nom"
                                            {...register('lastname')}
                                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition text-black"
                                        />
                                    </div>

                                    {errors.lastname && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {
                                                errors.lastname
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Email professionnel"
                                        {...register('email')}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition text-black"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Expertise */}
                            <div>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />

                                    <select
                                        id="expertise"
                                        {...register('expertise')}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl text-stone-400 border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                                    >
                                        <option value="" className="text-stone-400">
                                            Sélectionnez votre domaine
                                        </option>

                                        {EXPERTISES.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {errors.expertise && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.expertise.message}
                                    </p>
                                )}
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <input
                                        id="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        {...register('linkedin')}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition text-black"
                                    />
                                </div>

                                {errors.linkedin && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.linkedin.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        {...register('password')}
                                        className="w-full h-12 pl-12 pr-12 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition text-black"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700"
                                    >
                                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm password */}
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />

                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        {...register('confirmPassword')}
                                        className="w-full h-12 pl-12 pr-12 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition text-black"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700"
                                    >
                                        {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {
                                            errors
                                                .confirmPassword
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full
                                    h-12
                                    cursor-pointer
                                    rounded-xl
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition

                                    ${
                                    loading
                                        ? 'bg-sky-400 cursor-not-allowed'
                                        : 'bg-sky-600 hover:bg-sky-700 text-white'
                                }
                                `}
                            >
                                {loading
                                    ? 'Création du compte...'
                                    : 'Créer mon compte'}

                                {!loading && (
                                    <ArrowRight size={18} />
                                )}
                            </button>
                        </form>

                        {/* Bottom */}
                        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                            <p className="text-sm text-stone-500">
                                Déjà un compte ?{' '}
                                <Link
                                    href="/login"
                                    className="text-sky-600 hover:text-sky-800 font-semibold"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}