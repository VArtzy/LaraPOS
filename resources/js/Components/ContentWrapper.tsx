import React from 'react';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
