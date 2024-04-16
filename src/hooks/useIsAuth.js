import { useEffect, useState } from "react";
import { useRouter } from "../utils/navigation";

export default function useIsAuthUser() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      router.push("/");
    }
  }, [router]);

  return isAuth;
}
