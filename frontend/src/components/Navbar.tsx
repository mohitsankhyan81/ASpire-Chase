import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="w-full border-b border-violet-500/20 bg-violet-950">
      <nav className="flex h-20 items-center justify-between px-10 lg:px-16">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="1ac5bd22-9346-4c2a-9eb3-6f6d8188ba12.jpg" 
            alt="CHaSErs logo" 
            className="h-11 w-11 rounded-md object-cover"
          />
          <span className="text-2xl font-semibold text-white">
            CHaSErs
          </span>
        </Link>

        <div className="flex items-center gap-12">
          <Link
            to="/task"
            className="text-base text-violet-200 hover:text-white"
          >
            Tasks
          </Link>
        </div>

        <Link
          to="/login"
          className="rounded-md bg-violet-600 px-7 py-2.5 text-base font-medium text-white hover:bg-violet-500"
        >
          Login
        </Link>
      </nav>
    </header>
  )
}

export default Navbar