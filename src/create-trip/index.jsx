import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useActionData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { LogIn } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseconfg";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { error } from "console";
function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value });
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });

  async function OnGenerateTrip() {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }
    // greater than somenumber we can do pop up or something
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all the section!!");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noofDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());

  }

  async function SaveAiTrip(TripData) {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/"+docId);
  }

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
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  }
  // sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 div
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px:5 mt:10"> 
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🚞</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">what's your destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you going
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => {
              handleInputChange("noOfDays", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">whats you budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-4">
            {SelectBudgetOptions.map((items, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange("budget", items.title);
                  }}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                    formData?.budget == items.title && "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl ">{items.icon}</h2>
                  <h2 className="font-bold text-lg">{items.title}</h2>
                  <h2 className="text-sm text-gray-500">{items.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            who do you want to travel with{" "}
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-4">
            {SelectTravelsList.map((items, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange("traveller", items.people);
                  }}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                    formData?.traveller == items.people &&
                    "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl ">{items.icon}</h2>
                  <h2 className="font-bold text-lg">{items.title}</h2>
                  <h2 className="text-sm text-gray-500">{items.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex ">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {" "}
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
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

export default CreateTrip;
