/* eslint-disable react/display-name */
import { STORAGE_KEY } from "@/constants/keys";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SmallLoader } from "./loader";
import { clientLocalStorage } from "./storage";
import { decodeToken } from "./token";

const withAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
    useEffect(() => {
      (async function () {
        const token = clientLocalStorage()?.getItem(STORAGE_KEY.ACCESS_TOKEN);
        if (!token) {
          await router.replace("/");
        } else {
          await decodeToken(token).then(async (res: any) => {
            if (res && res?.role === "admin") {
                setIsLoggedIn(true)
            } else if (res && res?.role !== "admin") {
                setIsLoggedIn(false)
              await router.replace("/");
            } else {
              setIsLoggedIn(true);
            }
          });
        }
      })();
    }, [router]);

    if (isLoggedIn) {
      return <Component {...props} />;
    }

    return (
      <div>
        <SmallLoader />
      </div>
    );
  };
};

export default withAuth;


export const withAuthUser = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
    useEffect(() => {
      (async function () {
        const token = clientLocalStorage()?.getItem(STORAGE_KEY.ACCESS_TOKEN);
        if (!token) {
          await router.replace("/");
        } else {
          await decodeToken(token).then(async (res: any) => {
            if (res && res?.role === "user") {
                setIsLoggedIn(true)
            } else if (res && res?.role !== "user") {
                setIsLoggedIn(false)
              await router.replace("/");
            } else {
              setIsLoggedIn(true);
            }
          });
        }
      })();
    }, [router]);

    if (isLoggedIn) {
      return <Component {...props} />;
    }

    return (
      <div>
        <SmallLoader />
      </div>
    );
  };
};
