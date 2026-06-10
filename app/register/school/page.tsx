'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
    MapPin,
    Hash,
    User,
    Briefcase,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    GraduationCap
} from 'lucide-react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


/* ───────────────────────────────
   Validation schema
─────────────────────────────── */
const schoolRegisterSchema = z
    .object({
        city: z.string().min(2, 'Ville requise'),

        postalCode: z
            .string()
            .min(5, 'Code postal invalide'),

        managerName: z
            .string()
            .min(2, 'Nom requis'),

        managerRole: z
            .string()
            .min(2, 'Fonction requise'),

        email: z.string().email('Email invalide'),

        password: z
            .string()
            .min(8, 'Minimum 8 caractères'),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });

type SchoolRegisterForm = z.infer<
    typeof schoolRegisterSchema
>;

export default function SchoolRegisterPage() {
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [serverError, setServerError] = useState<
        string | null
    >(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SchoolRegisterForm>({
        resolver: zodResolver(schoolRegisterSchema),
    });

    const onSubmit = async (
        data: SchoolRegisterForm
    ) => {
        setLoading(true);
        setServerError(null);

        try {
            const response = await fetch(
                '/api/auth/register/school',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error(
                    'Erreur lors de la création du compte'
                );
            }

            // Connexion auto puis redirection dashboard
            await signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/dashboard/school',
            });

        } catch (error: any) {
            setServerError(
                error.message ||
                'Une erreur est survenue'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fb] flex">

            {/* ───────── LEFT SIDE = FORM ───────── */}
            <div className="flex-1 flex items-center justify-center p-6">

                <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-stone-200">

                    <h1 className="text-3xl text-sky-600 font-bold mb-2">
                        Inscription établissement
                    </h1>

                    <p className="text-stone-500 mb-8">
                        Créez votre espace établissement.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Nom établissement */}
                        <div className="relative">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"/>
                            <input
                                type="text"
                                placeholder="Nom de l'établissement"
                                className="w-full h-12 pl-12 pr-4 rounded-xl text-black border border-stone-200"
                            />
                        </div>

                        {/* Ville + CP */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"/>
                                <input
                                    type="text"
                                    placeholder="Ville"
                                    {...register('city')}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl text-black border border-stone-200"
                                />
                            </div>

                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"/>
                                <input
                                    type="text"
                                    placeholder="Code postal"
                                    {...register('postalCode')}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl text-black border border-stone-200"
                                />
                            </div>
                        </div>

                        {/* Responsable */}
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"/>
                            <input
                                type="text"
                                placeholder="Nom du responsable"
                                {...register('managerName')}
                                className="w-full h-12 pl-12 pr-4 rounded-xl text-black border border-stone-200"
                            />
                        </div>

                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"/>
                            <input
                                type="text"
                                placeholder="Fonction (ex : directeur)"
                                {...register('managerRole')}
                                className="w-full h-12 pl-12 pr-4 rounded-xl text-black border border-stone-200"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"/>
                            <input
                                type="email"
                                placeholder="Email professionnel"
                                {...register('email')}
                                className="w-full h-12 pl-12 pr-4 rounded-xl text-black border border-stone-200"
                            />
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
                                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-stone-200 transition text-black"
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
                                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-stone-200 transition text-black"
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
                </div>
            </div>

            {/* ───────── RIGHT SIDE ───────── */}
            <div className="hidden lg:flex flex-1 bg-sky-600 relative overflow-hidden">

                <div className="absolute inset-0 bg-linear-to-br from-sky-500 to-sky-700"/>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"/>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"/>

                <div className="relative z-10 flex flex-col justify-center px-20 text-white max-w-xl">

                <span className="text-sm uppercase tracking-[0.2em] text-sky-100 mb-6">
                    Plateforme ÉTOI
                </span>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Rejoignez le réseau ÉTOI
                    </h1>

                    <p className="text-lg text-sky-100 leading-relaxed">
                        Connectez votre établissement à des intervenants qualifiés et développez des collaborations
                        pédagogiques.
                    </p>
                </div>
            </div>
        </div>
    );
}