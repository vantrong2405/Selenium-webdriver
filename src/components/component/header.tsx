'use client'
import Link from "next/link"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { House } from 'lucide-react'
import { AppWindow , Archive , Folders  } from 'lucide-react';
import { Store } from 'lucide-react';
export function Header() {
  const [userData, setUserData] = useState<any>()
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData') as string))
  },[])
  function onLogout() {
    localStorage.removeItem('userData')
    setUserData(undefined)
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-black text-white border-b bg-background">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-4">
        <Link href="#" prefetch={false} className="flex items-center">
          <img 
            src="https://w7.pngwing.com/pngs/175/494/png-transparent-selenium-computer-icons-test-automation-software-testing-selenium-angle-text-logo-thumbnail.png" 
            alt="Acme Inc" 
            className="w-10 h-10" 
          />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/test" prefetch={false} className="text-sm font-medium hover:underline underline-offset-4">
            Selenium WebDriver
          </Link>
        </nav>
      </div>

      {/* Icon Links */}
      <div className="flex items-center justify-between w-44">
        <Link href="/" className="hover:opacity-80">
          <House />
        </Link>
        <Link href="/market" className="hover:opacity-80">
        <Store />
        </Link>
        <Link href="/test" className="hover:opacity-80">
          <Archive />
        </Link>
        <Link href="/test" className="hover:opacity-80">
          <Folders />
        </Link>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {userData ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm font-medium">{userData.name}</div>
                <Button variant="destructive" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="text-sm font-medium">{userData.name}</div>
                    <div className="text-xs text-muted-foreground">{userData.email}</div>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <div>
            <Link href="/auth/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary" className="ms-2">Register</Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function LocateIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
