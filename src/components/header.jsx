import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { PenBox, BriefcaseBusiness, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);
  
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();<div>some randome shit to test if the nav bar is fucked </div> 
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  
  return (
    <>
      <div className="text-center justify-center font-extrabold ">
        <div className="sm:text-base md:text-xl lg:text-3xl tracking-tighter" >
        Veer Madho Singh Bhandari Uttarakhand Technical University, Dehradun, Campus Institute:
        </div>
        <div className="sm:text-xs md:text-lg lg:text-2xl tracking-tighter" >
          Dr. A.P.J. Abdul Kalam Institute of Technology, Tanakpur Champawat
        </div>
      </div>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/apjakit_logo.png" className="h-20 " />
        </Link>          

        <div className="flex gap-8">
        <SignedOut>
          <Button variant="outline" onClick={() => setShowSignIn(true)}>
            Login
          </Button>
        </SignedOut>        
        <SignedIn>
          {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Jobs"
                labelIcon={<BriefcaseBusiness size={15} />}
                href="/my-jobs"
              />
              <UserButton.Link
                label="Saved Jobs"
                labelIcon={<Heart size={15} />}
                href="/saved-jobs"
              />
                {/* <UserButton.Action label="manageAccount" /> */}
              </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header