'use client';

import Link from 'next/link';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

/* ───────────────────────────────
   Validation schema
─────────────────────────────── */
const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Mot de passe invalide'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });


    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setError(null);

        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.error) {
            setError("Email ou mot de passe incorrect");
        }

        setLoading(false);
    };


    return (
        <div className="min-h-screen bg-[#f5f7fb] flex">

            {/* ───────── Left Side ───────── */}
            <div className="hidden lg:flex flex-1 bg-sky-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-sky-500 via-pink-400 to-amber-400" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col justify-center px-20 text-white max-w-xl">
                    <span className="text-sm uppercase tracking-[0.2em] text-sky-100 mb-6">
                        Plateforme ÉTOI
                    </span>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Connecter les professionnels aux étudiants bretons
                    </h1>

                    <p className="text-lg text-sky-100 leading-relaxed">
                        Accédez à votre espace pour gérer vos interventions, disponibilités et échanges.
                    </p>
                </div>
            </div>

            {/* ───────── Right Side ───────── */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-stone-900 mb-2">
                                Connexion
                            </h2>
                            <p className="text-stone-500">
                                Connectez-vous à votre espace ÉTOI.
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                                    Adresse email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="vous@exemple.fr"
                                    {...register('email')}
                                    className="w-full h-12 px-4 rounded-xl text-black border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                                />

                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-stone-700 mb-2">
                                    Mot de passe
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        {...register('password')}
                                        className="w-full h-12 px-4 pr-12 rounded-xl text-black border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
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

                            {/* Forgot password */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm cursor-pointer text-sky-600 hover:text-sky-800 font-medium"
                                >
                                    Mot de passe oublié ?
                                </button>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition
                                    ${loading
                                    ? 'bg-sky-400 cursor-not-allowed'
                                    : 'bg-sky-400 hover:bg-sky-500 text-white cursor-pointer'
                                }
                                `}
                            >
                                {loading ? 'Connexion...' : 'Se connecter'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        {/* Bottom */}
                        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                            <p className="text-sm text-stone-500">
                                Pas encore de compte ?{' '}
                                <Link href="/register" className="text-sky-600 hover:text-sky-800 font-semibold">
                                    S'inscrire
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}