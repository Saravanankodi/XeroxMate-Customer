import type { Metadata } from 'next'

import SignIn from '@/components/forms/SignIn'
import { Label } from '@/components/ui'
import ServiceCard from '@/components/ui/ServiceCard';
import { Lock, Tag, Zap } from 'lucide-react';
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your XeroxMate account to manage print orders.',
}

const page = () => {
  return (
    <>
      <SignIn/>
    </>
  )
}

export default page