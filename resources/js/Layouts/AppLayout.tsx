import { router } from '@inertiajs/core';
import { Link, Head, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import usePhotoUrl from '@/Hooks/usePhotoUrl';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';
import {
  Bell,
  BookDown,
  HomeIcon,
  LogOut,
  User,
  UserPlus,
  RefreshCcw,
  Eye,
  Trash,
  Users,
  HelpCircle,
  PersonStanding,
  Moon,
  Sun,
  Loader2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/Components/ui/tooltip';
import { Button } from '@/Components/ui/button';
import Checkbox from '@/Components/Checkbox';
import ConfirmationModal from '@/Components/ConfirmationModal';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({});

  const unreadNotificationsCount = page.props.auth.user?.notifications!.filter(
    notification => !notification.read_at,
  ).length;
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark',
  );
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [confirmingNotificationDeletion, setConfirmingNotificationDeletion] =
    useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string>();

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <div>
      <Head title={title} />

      <Banner />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav
          className={`${
            showingNavigationDropdown ? 'overflow-y-scroll' : null
          } fixed z-10 top-0 max-h-screen sm:overflow-y-visible sm:max-h-auto w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700`}
        >
          {/* <!-- Primary Navigation Menu --> */}
          <div className="mx-auto px-4 sm:px-0">
            <div className="flex justify-between sm:justify-normal sm:pr-4 items-center sm:items-stretch h-16">
              <div className="flex sm:h-screen flex-col gap-8 sm:px-4 hover:px-6 transition-all sm:pt-4 items-center sm:bg-white sm:dark:bg-gray-800 sm:border-r border-gray-100 sm:dark:border-gray-700">
                {/* <!-- Logo --> */}
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Link href={route('dashboard')}>
                    <ApplicationMark className="block h-9 w-auto" />
                  </Link>
                </div>

                {/* <!-- Navigation Links --> */}
                <div className="hidden space-x-8 sm:-my-px sm:flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <NavLink
                          href={route('dashboard')}
                          active={route().current('dashboard')}
                        >
                          <HomeIcon />
                        </NavLink>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="hidden space-x-8 sm:-my-px sm:flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <NavLink
                          href={route('customers.index')}
                          active={route().current('customers.index')}
                        >
                          <PersonStanding />
                        </NavLink>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Customers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="hidden w-full sm:flex sm:items-center justify-between">
                <div className="flex">
                  <div className="ml-3 relative">
                    {/* <!-- Teams Dropdown --> */}
                    {page.props.jetstream.hasTeamFeatures ? (
                      <Dropdown
                        align="left"
                        width="60"
                        renderTrigger={() => (
                          <span className="inline-flex rounded-md">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                            >
                              {page.props.auth.user?.current_team?.name}
                              <svg
                                className="ml-2 -mr-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </span>
                        )}
                      >
                        <div className="w-60">
                          {/* <!-- Team Management --> */}
                          {page.props.jetstream.hasTeamFeatures ? (
                            <>
                              <div className="block px-4 py-2 text-xs text-gray-400">
                                Manage Team
                              </div>
                              {/* <!-- Team Settings --> */}
                              <DropdownLink
                                href={route('teams.show', [
                                  page.props.auth.user?.current_team!,
                                ])}
                              >
                                <Users className="inline mr-2" />
                                Team Settings
                              </DropdownLink>
                              {page.props.jetstream.canCreateTeams ? (
                                <DropdownLink href={route('teams.create')}>
                                  <UserPlus className="inline mr-2" /> Create
                                  New Team
                                </DropdownLink>
                              ) : null}
                              <div className="border-t border-gray-200 dark:border-gray-600" />
                              {/* <!-- Team Switcher --> */}
                              <div className="block px-4 py-2 text-xs text-gray-400">
                                Switch Teams
                              </div>
                              {page.props.auth.user?.all_teams?.map(team => (
                                <form
                                  onSubmit={e => switchToTeam(e, team)}
                                  key={team.id}
                                >
                                  <DropdownLink as="button">
                                    <div className="flex items-center">
                                      {team.id ==
                                        page.props.auth.user
                                          ?.current_team_id && (
                                        <svg
                                          className="mr-2 h-5 w-5 text-green-400"
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                      )}
                                      <div>{team.name}</div>
                                    </div>
                                  </DropdownLink>
                                </form>
                              ))}
                            </>
                          ) : null}
                        </div>
                      </Dropdown>
                    ) : null}
                  </div>
                  {/* <!-- Settings Dropdown --> */}
                  <div className="ml-3 relative">
                    <Dropdown
                      align="right"
                      width="48"
                      renderTrigger={() =>
                        page.props.jetstream.managesProfilePhotos ? (
                          <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={usePhotoUrl(
                                page.props.auth.user?.profile_photo_path!,
                                page.props.auth.user?.profile_photo_url!,
                              )}
                              alt={page.props.auth.user?.name}
                            />
                          </button>
                        ) : (
                          <span className="inline-flex rounded-md">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                            >
                              {page.props.auth.user?.name}
                              <svg
                                className="ml-2 -mr-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </button>
                          </span>
                        )
                      }
                    >
                      {/* <!-- Account Management --> */}
                      <div className="block px-4 py-2 text-xs text-gray-400">
                        Manage Account
                      </div>
                      <DropdownLink href={route('profile.show')}>
                        <User className="inline mr-1" /> Profile
                      </DropdownLink>
                      {page.props.jetstream.hasApiFeatures ? (
                        <DropdownLink href={route('api-tokens.index')}>
                          API Tokens
                        </DropdownLink>
                      ) : null}
                      <div className="border-t border-gray-200 dark:border-gray-600"></div>
                      {/* <!-- Authentication --> */}
                      <form onSubmit={logout}>
                        <DropdownLink as="button">
                          <LogOut className="inline mr-2" />
                          Log Out
                        </DropdownLink>
                      </form>
                    </Dropdown>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="py-0 px-2" variant="secondary">
                    <HelpCircle className="mr-2 h-4 w-4" /> Help
                  </Button>
                  <Button className="py-0 px-2" variant="secondary">
                    <BookDown className="mr-2 h-4 w-4" /> Docs
                  </Button>
                  <div className="ml-3 relative">
                    <Dropdown
                      align="right"
                      width="60"
                      renderTrigger={() => (
                        <Button type="button" className="py-0 px-2">
                          {unreadNotificationsCount! > 0 && (
                            <div className="h-4 w-4 text-sm bg-indigo-500 grid place-content-center rounded-full absolute top-0 right-0 translate-x-2 -translate-y-2">
                              {unreadNotificationsCount}
                            </div>
                          )}
                          <Bell />
                        </Button>
                      )}
                    >
                      <div className="flex items-center justify-between px-4 pt-2 pb-3 text-xs w-60 text-gray-400">
                        <h3>Notifikasi</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() =>
                              router.post(route('notifications.markallasread'))
                            }
                          >
                            <Eye />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => router.reload({ only: ['auth'] })}
                          >
                            <RefreshCcw />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() =>
                              router.delete(
                                route('notifications.delete', 'all'),
                              )
                            }
                          >
                            <Trash />
                          </Button>
                        </div>
                      </div>
                      <hr />
                      {page.props.auth.user?.notifications?.length == 0 && (
                        <p className="block px-4 py-2 text-md font-semibold w-60 text-gray-400">
                          Tidak ada notifikasi terbaru 🔔
                        </p>
                      )}
                      {page.props.auth.user?.notifications?.map(
                        notification => (
                          <DropdownLink
                            hr={true}
                            key={notification.id}
                            href={notification.data.url}
                          >
                            <div className="flex gap-4 justify-between items-center">
                              <div>
                                <h4
                                  className={
                                    notification.read_at ? '' : 'font-semibold'
                                  }
                                >
                                  {notification.data.title}
                                </h4>
                                <p>{notification.data.message}</p>
                                <p className="text-xs text-gray-400">
                                  {new Date(
                                    notification.created_at,
                                  ).toLocaleString('id-ID')}
                                </p>
                              </div>
                              <div className="flex flex-col gap-4 items-center">
                                <Checkbox
                                  className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  onClick={e => {
                                    e.stopPropagation();
                                    e.currentTarget.checked
                                      ? router.post(
                                          route('notifications.markasread', {
                                            id: notification.id,
                                          }),
                                        )
                                      : router.post(
                                          route('notifications.markasunread', {
                                            id: notification.id,
                                          }),
                                        );
                                  }}
                                  checked={notification.read_at != null}
                                  onChange={() => {}}
                                />
                                <button
                                  className="relative z-50"
                                  onClick={e => {
                                    e.preventDefault();
                                    setConfirmingNotificationDeletion(true);
                                    setNotificationToDelete(notification.id);
                                  }}
                                >
                                  <Trash size={20} />
                                </button>
                              </div>
                            </div>
                          </DropdownLink>
                        ),
                      )}
                    </Dropdown>
                  </div>
                  <Button className="py-0 px-2" size="icon">
                    {darkMode ? (
                      <Sun
                        onClick={() => {
                          setDarkMode(false);
                          localStorage.removeItem('theme');
                        }}
                      />
                    ) : (
                      <Moon
                        onClick={() => {
                          setDarkMode(true);
                          localStorage.setItem('theme', 'dark');
                        }}
                      />
                    )}
                  </Button>
                </div>
              </div>

              {/* <!-- Hamburger --> */}
              <div className="flex gap-4 items-center sm:hidden">
                <Dropdown
                  align="right"
                  width="60"
                  renderTrigger={() => (
                    <Button type="button" className="py-0 px-2">
                      <Bell />
                    </Button>
                  )}
                >
                  <div className="px-4 py-2 text-xs w-60 text-gray-400">
                    Notifikasi
                  </div>
                  <hr />
                  {page.props.auth.user?.notifications?.length == 0 && (
                    <p className="block px-4 py-2 text-md font-semibold w-60 text-gray-400">
                      Tidak ada notifikasi terbaru 🔔
                    </p>
                  )}
                  {page.props.auth.user?.notifications?.map(notification => (
                    <DropdownLink
                      key={notification.id}
                      href={notification.data.url}
                    >
                      <h4 className="font-semibold">
                        {notification.data.title}
                      </h4>
                      <p className="ml-2 mb-2">{notification.data.message}</p>
                    </DropdownLink>
                  ))}
                </Dropdown>
                <Button className="py-0 px-2" size="icon">
                  {darkMode ? (
                    <Sun
                      onClick={() => {
                        setDarkMode(false);
                        localStorage.removeItem('theme');
                      }}
                    />
                  ) : (
                    <Moon
                      onClick={() => {
                        setDarkMode(true);
                        localStorage.setItem('theme', 'dark');
                      }}
                    />
                  )}
                </Button>
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(!showingNavigationDropdown)
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={classNames({
                        hidden: showingNavigationDropdown,
                        'inline-flex': !showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={classNames({
                        hidden: !showingNavigationDropdown,
                        'inline-flex': showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Responsive Navigation Menu --> */}
          <div
            className={classNames('sm:hidden', {
              block: showingNavigationDropdown,
              hidden: !showingNavigationDropdown,
            })}
          >
            <div className="pt-2 space-y-1">
              <ResponsiveNavLink
                href={route('dashboard')}
                active={route().current('dashboard')}
              >
                <div className="flex gap-x-2 items-center">
                  <HomeIcon /> Dashboard
                </div>
              </ResponsiveNavLink>
            </div>
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink
                href={route('customers.index')}
                active={route().current('customers.index')}
              >
                <div className="flex gap-x-2 items-center">
                  <PersonStanding /> Customers
                </div>
              </ResponsiveNavLink>
            </div>

            {/* <!-- Responsive Settings Options --> */}
            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center px-4">
                {page.props.jetstream.managesProfilePhotos ? (
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={usePhotoUrl(
                        page.props.auth.user?.profile_photo_path!,
                        page.props.auth.user?.profile_photo_url!,
                      )}
                      alt={page.props.auth.user?.name}
                    />
                  </div>
                ) : null}

                <div>
                  <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                    {page.props.auth.user?.name}
                  </div>
                  <div className="font-medium text-sm text-gray-500">
                    {page.props.auth.user?.email}
                  </div>
                </div>
              </div>

              <div className="px-4 mt-4 flex gap-4">
                <Button className="py-0 px-2" variant="secondary">
                  <HelpCircle className="mr-2 h-4 w-4" /> Help
                </Button>
                <Button className="py-0 px-2" variant="secondary">
                  <BookDown className="mr-2 h-4 w-4" /> Docs
                </Button>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink
                  href={route('profile.show')}
                  active={route().current('profile.show')}
                >
                  <User className="inline mr-2" /> Profile
                </ResponsiveNavLink>

                {page.props.jetstream.hasApiFeatures ? (
                  <ResponsiveNavLink
                    href={route('api-tokens.index')}
                    active={route().current('api-tokens.index')}
                  >
                    API Tokens
                  </ResponsiveNavLink>
                ) : null}

                {/* <!-- Authentication --> */}
                <form method="POST" onSubmit={logout}>
                  <ResponsiveNavLink as="button">
                    <LogOut className="inline mr-2" /> Log Out
                  </ResponsiveNavLink>
                </form>

                {/* <!-- Team Management --> */}
                {page.props.jetstream.hasTeamFeatures ? (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Team
                    </div>

                    {/* <!-- Team Settings --> */}
                    <ResponsiveNavLink
                      href={route('teams.show', [
                        page.props.auth.user?.current_team!,
                      ])}
                      active={route().current('teams.show')}
                    >
                      <Users className="inline mr-2" /> Team Settings
                    </ResponsiveNavLink>

                    {page.props.jetstream.canCreateTeams ? (
                      <ResponsiveNavLink
                        href={route('teams.create')}
                        active={route().current('teams.create')}
                      >
                        <UserPlus className="inline mr-2" /> Create New Team
                      </ResponsiveNavLink>
                    ) : null}

                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                    {/* <!-- Team Switcher --> */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Switch Teams
                    </div>
                    {page.props.auth.user?.all_teams?.map(team => (
                      <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                        <ResponsiveNavLink as="button">
                          <div className="flex items-center">
                            {team.id ==
                              page.props.auth.user?.current_team_id && (
                              <svg
                                className="mr-2 h-5 w-5 text-green-400"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            )}
                            <div>{team.name}</div>
                          </div>
                        </ResponsiveNavLink>
                      </form>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Page Heading --> */}
        {renderHeader ? (
          <header className="mt-16 sm:pl-24 lg:pl-16 bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto py-6 px-6">{renderHeader()}</div>
          </header>
        ) : null}

        {/* <!-- Page Content --> */}
        <main className="sm:pl-16">{children}</main>
      </div>

      {/* Modal Delete Notification */}
      <ConfirmationModal
        isOpen={confirmingNotificationDeletion}
        onClose={() => setConfirmingNotificationDeletion(false)}
      >
        <ConfirmationModal.Content title={'Hapus Notifikasi?'}>
          Anda dapat menghapus notifikasi setelah membacanya. Setelah dihapus
          notifikasi tidak akan ditampilkan kembali dan tidak di archive.
        </ConfirmationModal.Content>

        <ConfirmationModal.Footer>
          <Button onClick={() => setConfirmingNotificationDeletion(false)}>
            Batal
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              form.delete(route('notifications.delete', notificationToDelete), {
                onSuccess: () => {
                  setConfirmingNotificationDeletion(false);
                },
              });
            }}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            <Loader2
              className={`mr-2 h-4 w-4 animate-spin ${
                form.processing ? 'block' : 'hidden'
              }`}
            />
            Hapus Notifikasi
          </Button>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </div>
  );
}
