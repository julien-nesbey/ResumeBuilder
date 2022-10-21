//React Router
import { useNavigate } from "react-router-dom";

//Daisy UI
import { Button } from "react-daisyui";

//Assets
import NotFoundImage from "../assets/NotFound.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-4">
      <h1 className="text-3xl font-bold">404 Not Found Error</h1>
      <p className="text-lg font-semibold">Oh Snap! Double check your URL</p>
      <img src={NotFoundImage} className="sm:w-2/5" />
      <Button onClick={() => navigate("/")} className="font-medium">
        Home Page
      </Button>
    </div>
  );
};

export default NotFound;
