'use client';
import React from 'react';
import { AdminProfileHeader } from '@/app/ui/organisms/AdminProfileHeader';
import { AdminProfileMenuGroup } from '@/app/ui/organisms/AdminProfileMenuGroup';

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminProfileHeader />
      <AdminProfileMenuGroup />
    </div>
  );
}
