import { useForm, Head, Link } from "@inertiajs/react";
import classNames from "classnames";
import React from "react";
import useRoute from "@/Hooks/useRoute";
import AuthenticationCard from "@/Components/AuthenticationCard";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Mail, Loader2 } from "lucide-react";

interface Props {
    status: string;
}

export default function ForgotPassword({ status }: Props) {
    const route = useRoute();
    const form = useForm({
        email: "",
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route("password.email"));
    }

    return (
        <AuthenticationCard
            headline="Relaks Dan Coba Ingat"
            subheadline="Jika Tidak Bisa, Tenang. Kami Bisa Resetkan untuk Anda."
            imageUrl="forgot.webp"
        >
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Lupa password? Tak masalah. Masukkan alamat email Anda, dan kami
                akan kirimkan tautan reset password untuk memilih yang baru.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={(e) =>
                            form.setData("email", e.currentTarget.value)
                        }
                        required
                        autoFocus
                    />
                    <InputError className="mt-2" message={form.errors.email} />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Button variant="secondary" type="button">
                        <Link className="w-full h-full" href={route("login")}>
                            Kembali
                        </Link>
                    </Button>

                    <Button
                        className={classNames({
                            "opacity-25": form.processing,
                        })}
                        disabled={form.processing}
                    >
                        <Loader2
                            className={`mr-2 h-4 w-4 animate-spin ${
                                form.processing ? "block" : "hidden"
                            }`}
                        />
                        {form.processing ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Mail className="w-5 h-5 mr-2" />
                        )}
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
}
