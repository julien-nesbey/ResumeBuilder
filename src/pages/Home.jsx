import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container flex flex-col mx-auto h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="mb-4 text-lg">
          <q>Resume Builder</q> let's you create your own Resume without any
          cost at all!
        </p>
        <Link
          role={"button"}
          to="/build"
          className="p-2 border border-red-400 hover:bg-red-300 hover:text-black"
        >
          Build CV
        </Link>
      </div>
    </div>
  );
};

export default Home;
