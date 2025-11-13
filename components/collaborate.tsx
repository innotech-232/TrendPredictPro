"use client"

import type React from "react"




import { useState } from "react"
import { Users, Mail, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Collaborate() {
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Editor", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Viewer", status: "active" },
  ])
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (inviteEmail) {
      alert(`Invitation sent to ${inviteEmail}`)
      setInviteEmail("")
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collaborate</h1>
        <p className="text-muted-foreground mt-2">Invite team members and manage permissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Current Collaborators
          </h2>
          <div className="space-y-3">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{collaborator.name}</p>
                  <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{collaborator.role}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Invite Collaborator
          </h2>
          <form onSubmit={handleInvite} className="space-y-4">
            <input
              type="email"
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Editor</option>
              <option>Viewer</option>
              <option>Admin</option>
            </select>
            <Button type="submit" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Send Invite
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
