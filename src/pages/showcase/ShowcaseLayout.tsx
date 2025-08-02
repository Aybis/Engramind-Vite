import {
  AnimatedModal,
  LogoutForm,
  ShowcaseHeader,
  SideDrawer,
  UpdateNicknameForm,
} from "../../components/ui";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../../theme/theme-toggle";
import { useNavigate } from "react-router-dom";
import { formatNickname, navbarLinkData } from "../../utils/helper";
import { NavbarLinkData } from "../../interface";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { resetState, settingNickname } from "../../stores/user-slice";
import Cookies from "js-cookie";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet();
  const username = Cookies.get("name");
  const dispatch = useDispatch();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateNickname, setShowUpdateNickname] = useState(false);
  const { nickname } = useSelector((state: any) => state.user);

  const [currentNickname, setCurrentNickname] = useState(nickname || username);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateNickname = async (value: string) => {
    const toastId = toast.loading("Updating nickname...", {
      id: "update-nickname",
      duration: Infinity,
    });
    try {
      setLoading(true);
      dispatch(settingNickname(value));
      Cookies.set("nickname", value);
      setLoading(false);
      toast.success("Nickname updated successfully!", {
        id: toastId,
        duration: 4000,
      });
      setShowUpdateNickname(false);
    } catch (e) {
      toast.error(e?.toString(), {
        id: toastId,
        duration: 4000,
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    Cookies.set("access_token", "");
    Cookies.set("name", "");
    Cookies.set("refresh_token", "");
    Cookies.set("email", "");
    dispatch(resetState());
    navigate("/");
  };
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (nickname) {
      setCurrentNickname(nickname);
    }
  }, [nickname]);

  return (
    <div>
      <div className="relative bg-zinc-50 dark:bg-zinc-900 min-h-screen overflow-auto">
        <ShowcaseHeader
          setShowUpdateNickname={setShowUpdateNickname}
          setShowConfirm={setShowConfirm}
          setIsOpenDrawer={setIsOpenDrawer}
          name={publicKey?.toBase58() ?? ""}
          currentNickname={currentNickname}
        />
        <div className="max-w-7xl mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
          {children}
        </div>
      </div>
      <AnimatedModal
        showCrossIcon={false}
        widthFitContainer
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
      >
        <LogoutForm
          handleLogout={handleLogout}
          setShowConfirm={setShowConfirm}
        />
      </AnimatedModal>
      <AnimatedModal
        customWidth="w-full md:w-[50%]"
        isOpen={showUpdateNickname}
        onClose={() => {
          if (loading) return;
          setShowUpdateNickname(false);
        }}
      >
        <UpdateNicknameForm
          loading={loading}
          currentNickname={currentNickname}
          handleUpdateNickname={handleUpdateNickname}
          setShowUpdateNickname={setShowUpdateNickname}
        />
      </AnimatedModal>
      <SideDrawer
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <nav className="gap-6 text-md flex flex-col text-gray-700 dark:text-gray-300 leading-relaxed">
          {navbarLinkData.map((linkData: NavbarLinkData, index: number) => (
            <Link
              key={linkData.id + index.toString()}
              to={linkData.href}
              className={`hover:text-purple-600 dark:hover:text-purple-400 ${
                (linkData?.includes &&
                  pathname?.includes(linkData?.includes)) ||
                pathname === linkData?.href
                  ? "text-purple-600 font-bold"
                  : ""
              }`}
            >
              {linkData.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 items-start mt-[20px] relative">
          <WalletMultiButton />
          <ThemeToggle customClassName="" />
        </div>
      </SideDrawer>
    </div>
  );
}
