import React, { useState } from "react";
import DialogModal from "@/Components/DialogModal";
import classNames from "classnames";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import useRoute from "@/Hooks/useRoute";
import { Loader2, PlusCircle } from "lucide-react";
import { Auth, OmittedCustomer } from "@/types";
import { Button } from "@/Components/ui/button";

export default function UpdateCustomerModal({
    auth,
    setConfirmingCustomerUpdate,
    confirmingCustomerUpdate,
}: {
    auth: Auth;
    setConfirmingCustomerUpdate: React.Dispatch<
        React.SetStateAction<OmittedCustomer | null>
    >;
    confirmingCustomerUpdate: OmittedCustomer | null;
}) {
    const route = useRoute();
    const form = useForm({
        name: confirmingCustomerUpdate?.name,
        email: confirmingCustomerUpdate?.email,
        phone: confirmingCustomerUpdate?.phone,
        address: confirmingCustomerUpdate?.address,
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

    function updateCustomer(e: React.FormEvent) {
        console.log(form.data);
        form.put(route("customers.update", confirmingCustomerUpdate?.id), {
            errorBag: "updateCustomer",
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
                setConfirmingCustomerUpdate(null);
            },
        });
    }

    return (
        <DialogModal
            isOpen={confirmingCustomerUpdate ? true : false}
            maxWidth="xl"
            onClose={() => setConfirmingCustomerUpdate(null)}
        >
            <DialogModal.Content
                title={"Memperbaiki Langganan Dengan Cepat ⚡"}
            >
                <div className="grid gap-8">
                    <div className="flex items-center gap-x-8">
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                defaultValue={confirmingCustomerUpdate?.name}
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
                                defaultValue={confirmingCustomerUpdate?.email}
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
                                defaultValue={confirmingCustomerUpdate?.phone}
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
                                defaultValue={confirmingCustomerUpdate?.address}
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
                                            : confirmingCustomerUpdate?.avatar
                                    }')`,
                                }}
                            ></span>
                            {form.errors.avatar ? (
                                <InputError
                                    message={form.errors.avatar}
                                    className="mt-2"
                                />
                            ) : (
                                "*Foto tidak harus diupload (optional)"
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
                        onClick={() => setConfirmingCustomerUpdate(null)}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={updateCustomer}
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
                        Perbaiki
                    </Button>
                </div>
            </DialogModal.Footer>
        </DialogModal>
    );
}
