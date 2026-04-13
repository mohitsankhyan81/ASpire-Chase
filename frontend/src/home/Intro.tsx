const Intro = () => {
  return (
    <div className="min-h-screen bg-violet-950">
      <main className="px-10 py-24 lg:px-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              CHaSErs
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-violet-200/70">
            Your modern task management platform with a sleek purple aesthetic.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Intro