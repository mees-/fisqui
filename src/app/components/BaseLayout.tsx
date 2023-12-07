import { PropsWithChildren } from "react"

interface BaseLayoutProps extends PropsWithChildren {
  subtitle?: string
}

export default function BaseLayout({ children, subtitle }: BaseLayoutProps) {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <header className="flex flex-row items-center justify-start">
        <h1 className="text-3xl font-bold">Fisqui</h1>
        {subtitle && <h2 className="text-xl">{subtitle}</h2>}
      </header>
      {children}
      <footer className="flex flex-row items-center justify-between">
        <p>Fisqui</p>
      </footer>
    </div>
  )
}
