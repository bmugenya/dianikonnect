import { useNavigate } from "react-router-dom";

function Logo() {
 let navigate = useNavigate();

  return (
   
    <img
      onClick={() => navigate('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/logo.webp" 
      height="100" 
      width="100" 
      alt="Logo" 
    />
    
  )
}

export default Logo
