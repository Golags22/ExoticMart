import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="text-white text-xl font-bold">
      <img 
      className="w-20 h-20 items-center justify-center"
      src="\logos\logo.svg"
       />
    </Link>
  );
}