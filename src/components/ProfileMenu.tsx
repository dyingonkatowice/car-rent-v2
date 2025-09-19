import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ProfileMenu = () => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuContent>
        {user?.isAdmin && (
          <DropdownMenuItem>
            <Link to="/admin">Admin Panel</Link>
          </DropdownMenuItem>
        )}
        {/* Add other menu items */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;