import { PropsWithChildren } from "react"

interface BaseLayoutProps extends PropsWithChildren {
  subTitle?: string
}

export default function BaseLayout({ children, subTitle }: BaseLayoutProps) {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <header className="flex flex-row items-center justify-start">
        <h1 className="text-3xl font-bold">Fisqui</h1>
        {subTitle && <h2 className="text-xl">{subTitle}</h2>}
      </header>
      {children}
      <footer className="flex flex-row items-center justify-between">
        <p>Fisqui</p>
      </footer>
    </div>
  )
}
