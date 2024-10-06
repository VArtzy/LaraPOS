import React, { PropsWithChildren } from 'react';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';

interface AuthenticationCard {
  imageUrl?: string;
  headline?: string;
  subheadline?: string;
}

export default function AuthenticationCard({
  children,
  imageUrl = 'login.webp',
  headline = 'Sedikit langkah lagi untuk kemajuan bisnis Anda.',
  subheadline = 'Kelola bisnis Anda dengan mudah dan efisien menggunakan platform kami.',
}: AuthenticationCard & PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="hidden lg:grid items-center isolate">
        <div className="col-span-full row-span-full text-gray-100 max-w-xl mx-auto">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {headline}
          </h1>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mt-6">
            {subheadline}
          </h4>
        </div>
        <img
          className="col-span-full row-span-full w-full h-full object-cover brightness-50 hover:brightness-75 transition-all duration-500 ease-in-out -z-10"
          src={`/images/${imageUrl}`}
          alt="Background image"
        />
      </div>

      <div
        className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}
      >
        <div>
          <AuthenticationCardLogo />
        </div>
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
