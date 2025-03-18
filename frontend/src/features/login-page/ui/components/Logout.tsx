import { LogoutIcon } from "@/shared/icons/Logout";
import { useLogout } from "@/shared/hooks/useLogout";

function LogoutButton() {
  const logout = useLogout();

  return (
    <nav className="flex select-none flex-col items-center gap-6">
      <button className="w-full" onClick={logout}>
        <div
          className={
            "font-nanum-b flex cursor-pointer flex-col items-center gap-2 text-center"
          }
        >
          <LogoutIcon />
          <span className="font-nanum-eb text-xs">logout</span>
        </div>
      </button>
    </nav>
  );
}

export { LogoutButton };
