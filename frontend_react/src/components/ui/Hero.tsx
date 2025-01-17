import Link from "next/link"
import landing from "/public/landing.jpeg"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="flex flex-col overflow-hidden h-fit">
      <main className="flex-1 flex items-center justify-center h-full">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    PortfolioX
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your investment portfolio with our powerful platform. Track performance, analyze trends,
                    and make informed decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/portfolio"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    App
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Meet Our Team
                  </Link>
                </div>
              </div>
              <Image
                src={landing}
                width="550"
                height="550"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
