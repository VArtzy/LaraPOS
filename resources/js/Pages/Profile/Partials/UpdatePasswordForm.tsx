import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';

import { Input } from '@/Components/ui/input';
import { Blockquote } from '@/Components/ui/typography';
import useTypedPage from '@/Hooks/useTypedPage';
import { Loader2 } from 'lucide-react';

export default function UpdatePasswordForm() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  return (
    <FormSection
      onSubmit={updatePassword}
      title={'Update Password'}
      description={
        'Ensure your account is using a long, random password to stay secure.'
      }
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <Button
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            <Loader2
              className={`mr-2 h-4 w-4 animate-spin ${
                form.processing ? 'block' : 'hidden'
              }`}
            />
            Save
          </Button>
        </>
      )}
    >
      <div className="col-span-6 sm:col-span-4">
        {page.props.auth.user?.google_id ? (
          <Blockquote className="mb-4">
            Beberapa aksi mengharuskan password sebagai protokol keamanan. Jika
            Anda ingin menambahkan password, Anda dapat logout lalu ke menu lupa
            password agar dapat menambahkan.
          </Blockquote>
        ) : null}

        <Label htmlFor="current_password">Current Password</Label>
        <Input
          id="current_password"
          type="password"
          className="mt-1 block w-full"
          ref={currentPasswordRef}
          value={form.data.current_password}
          onChange={e =>
            form.setData('current_password', e.currentTarget.value)
          }
          autoComplete="current-password"
        />
        <InputError message={form.errors.current_password} className="mt-2" />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          autoComplete="new-password"
          ref={passwordRef}
        />
        <InputError message={form.errors.password} className="mt-2" />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          autoComplete="new-password"
        />
        <InputError
          message={form.errors.password_confirmation}
          className="mt-2"
        />
      </div>
    </FormSection>
  );
}
