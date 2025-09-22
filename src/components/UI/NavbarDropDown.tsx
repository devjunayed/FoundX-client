"use client";
import { useUser } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/AuthService";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";

const NavbarDropDown = () => {
     const router = useRouter();
     const {user} = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" as="button" name={user?.name} src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" onClick={() => handleNavigation("/profile")}>
          Profile
        </DropdownItem>
        <DropdownItem key="settings" onClick={() => handleNavigation("/profile/settings")}>
          Settings
        </DropdownItem>
        <DropdownItem key="create-post" onClick={() => handleNavigation("/profile/create-post")}>
          Create Post
        </DropdownItem>
        
        <DropdownItem onClick={() => logoutUser()} key="delete" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
