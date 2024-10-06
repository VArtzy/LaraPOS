import React, { useState } from "react";
import DialogModal from "@/Components/DialogModal";
import classNames from "classnames";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import useRoute from "@/Hooks/useRoute";
import { Loader2, PlusCircle } from "lucide-react";
import { Auth } from "@/types";
import { Button } from "@/Components/ui/button";

export default function CreateCustomerModal({
    auth,
    setConfirmingCustomerAdd,
    confirmingCustomerAdd,
}: {
    auth: Auth;
    setConfirmingCustomerAdd: React.Dispatch<React.SetStateAction<boolean>>;
    confirmingCustomerAdd: boolean;
}) {
    const route = useRoute();
    const form = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: null as File | null,
        team_id: auth.user?.current_team_id,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoRef = React.useRef<HTMLInputElement>(null);

    function updatePhotoPreview() {
        const photo = photoRef.current?.files?.[0];

        if (!photo) {
            return;
        }

        form.setData("avatar", photo);

        const reader = new FileReader();

        reader.onload = (e) => {
            setPhotoPreview(e.target?.result as string);
        };

        reader.readAsDataURL(photo);
    }

    function clearPhotoFileInput() {
        if (photoRef.current?.value) {
            photoRef.current.value = "";
            form.setData("avatar", null);
        }
    }

    function addCustomer(e: React.FormEvent) {
        form.post(route("customers.store"), {
            errorBag: "addCustomer",
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
                setConfirmingCustomerAdd(false);
            },
        });
    }

    return (
        <DialogModal
            isOpen={confirmingCustomerAdd}
            maxWidth="xl"
            onClose={() => setConfirmingCustomerAdd(false)}
        >
            <DialogModal.Content
                title={"Menambahkan Langganan Dengan Mudah 😍"}
            >
                <p className="mb-8">
                    Anda dapat menambahkan langganan dengan mudah dengan mengisi
                    form! Pastikan data yang anda masukkan benar. Termasuk,
                    alamat email yang unik.
                </p>
                <div className="grid gap-8">
                    <div className="flex items-center gap-x-8">
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                placeholder="Nama pelanggan panggilan/lengkap"
                                onChange={(e) =>
                                    form.setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Email valid dan aktif pelanggan"
                                onChange={(e) =>
                                    form.setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.email}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="phone">No. Telp</Label>
                            <Input
                                type="tel"
                                id="phone"
                                placeholder="Nomor handphone aktif pelanggan"
                                onChange={(e) =>
                                    form.setData("phone", e.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.phone}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                placeholder="Alamat valid pelanggan"
                                onChange={(e) =>
                                    form.setData("address", e.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.address}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Gambar</Label>
                        {/* // <!-- Profile Photo Preview --> */}
                        <div className="m-2 grid gap-8 grid-cols-2 opacity-80">
                            <span
                                className="block rounded-full w-20 h-20"
                                style={{
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center",
                                    backgroundImage: `url('${
                                        photoPreview
                                            ? photoPreview
                                            : "https://source.unsplash.com/random/80x80"
                                    }')`,
                                }}
                            ></span>
                            {form.errors.avatar ? (
                                <InputError
                                    message={form.errors.avatar}
                                    className="mt-2"
                                />
                            ) : (
                                "*Foto tidak harus diupload (optional). Foto disebelah tidak akan digunakan, hanya sebagai contoh."
                            )}
                        </div>
                        <Input
                            id="picture"
                            type="file"
                            ref={photoRef}
                            onChange={updatePhotoPreview}
                        />
                    </div>
                </div>
            </DialogModal.Content>

            <DialogModal.Footer>
                <div className="flex items-center justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setConfirmingCustomerAdd(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={addCustomer}
                        className={classNames("ml-2", {
                            "opacity-25": form.processing,
                        })}
                        disabled={form.processing}
                    >
                        {form.processing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <PlusCircle size={18} className="mr-2"></PlusCircle>
                        )}
                        Tambahkan
                    </Button>
                </div>
            </DialogModal.Footer>
        </DialogModal>
    );
}
