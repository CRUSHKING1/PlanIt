import React, { useEffect,useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);
  useEffect(() => {
    // console.log(user);
  }, []);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });
  async function GetUserProfile(tokenInfo) {
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDailog(false);
         window.location.reload();
      });
  }
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5  ">
      <a href="/">
   <div className="flex items-center space-x-1">
  <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
  <h2 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
    PlanIt
  </h2>
 
  </div>
   </a>
    
      <div>{user ? <div className="flex  items-center gap-3">
        <a href="/my-trips"><Button variant="outline" className="rounded-full">My trip</Button></a>
        <a href="/create-trip"><Button variant="outline" className="rounded-full">+Create Trip</Button></a>
      

       
        <Popover>
  <PopoverTrigger className="bg-white rounded-full"><img src={user?.picture} alt="userimage" className="h-[35px] w-[35px] rounded-full"/></PopoverTrigger>
  <PopoverContent><h2 className="cursor-pointer" onClick={()=>{
    googleLogout();
    localStorage.clear();
   window.location.reload();
  }}>Logout</h2></PopoverContent>
</Popover>

      </div> : <Button onClick={()=>setOpenDailog(true)}>Sign in</Button>
      
      }</div>
        <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentiction Securely </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    
  );
}

export default Header;
