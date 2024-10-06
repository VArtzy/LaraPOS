import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';

import { Input } from '@/Components/ui/input';

import { JetstreamTeamPermissions, Team, User } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import usePhotoUrl from '@/Hooks/usePhotoUrl';
import { Loader2 } from 'lucide-react';

interface Props {
  team: Team & { owner: User };
  permissions: JetstreamTeamPermissions;
}

export default function UpdateTeamNameForm({ team, permissions }: Props) {
  const route = useRoute();
  const form = useForm({
    name: team.name,
  });

  function updateTeamName() {
    form.put(route('teams.update', [team]), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={updateTeamName}
      title={'Team Name'}
      description={`The team's name and owner information.`}
      renderActions={
        permissions.canUpdateTeam
          ? () => (
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
            )
          : undefined
      }
    >
      {/* <!-- Team Owner Information --> */}
      <div className="col-span-6">
        <Label children="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={usePhotoUrl(
              team.owner.profile_photo_path!,
              team.owner.profile_photo_url!,
            )}
            alt={team.owner.name}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {team.owner.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {team.owner.email}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="name" children="Team Name" />

        <Input
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          disabled={!permissions.canUpdateTeam}
        />

        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
