"use client"

import { useState } from "react"
import { Bell, Lock, Eye, Globe, Save } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    twoFactor: false,
    darkMode: false,
    publicProfile: true,
    language: "en",
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your preferences and account settings</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified about important updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle("notifications")}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Email Updates</p>
              <p className="text-sm text-muted-foreground">Receive weekly trend reports</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={() => handleToggle("emailUpdates")}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={() => handleToggle("twoFactor")}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Privacy & Display
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Public Profile</p>
              <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
            </div>
            <input
              type="checkbox"
              checked={settings.publicProfile}
              onChange={() => handleToggle("publicProfile")}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle dark theme (coming soon)</p>
            </div>
            <input type="checkbox" disabled className="w-5 h-5 cursor-not-allowed opacity-50" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Localization
        </h2>
        <select
          value={settings.language}
          onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="hi">हिन्दी</option>
        </select>
      </Card>

      <Button onClick={handleSave} className="w-full" size="lg">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  )
}
