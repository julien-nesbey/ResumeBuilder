//React Router
import { Link } from "react-router-dom";

//Components
import Navbar from "../components/Navbar";

//Image
import CheckCV from "../assets/Check-CV.svg";

const Home = () => {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto select-none overflow-hidden sm:h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10">
        <p className="mb-4 text-2xl font-semibold text-center">
          <q className="text-3xl font-bold">Resume Builder</q> let's you create
          your own Resume without any cost at all!
        </p>
        <Link
          role={"button"}
          to="/build"
          className="p-2 my-4 border text-2xl border-white hover:bg-slate-100 hover:border-black"
        >
          Build CV
        </Link>
      </div>
      <img src={CheckCV} className="rotate-12 sm:w-2/5" width="100%" />
    </div>
  );
};

export default Home;
