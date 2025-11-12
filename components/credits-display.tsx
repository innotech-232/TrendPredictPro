"use client"

import { Zap } from "lucide-react"
import Link from "next/link"

export function CreditsDisplay() {
  // In production, fetch from database
  const userCredits = 10

  return (
    <Link href="/pricing">
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
        <Zap className="w-5 h-5" />
        <span className="font-semibold">{userCredits} Credits</span>
      </div>
    </Link>
  )
}
