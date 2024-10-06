import React from 'react';
import GoogleLogo from '@/Components/GoogleLogo';
import { Button } from '@/Components/ui/button';

export default function Oauth() {
  return (
    <>
      <div className="relative my-4 flex items-center justify-center">
        <hr className="absolute my-4 w-full" />
        <h3 className="scroll-m-20 text-2xl bg-white px-4 inline font-semibold tracking-widest relative">
          ATAU
        </h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Button variant="secondary">
          <a className="flex items-center" href="auth/google">
            <GoogleLogo />
            Sign in with Google
          </a>
        </Button>
      </div>
    </>
  );
}
