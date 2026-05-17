import React, { useEffect, useRef, useState } from "react";
import "./SidebarProfileMenu.css";
import { ChevronRight, LogOut, Settings, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function SidebarProfileMenu({ user, logOut }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      onClick={() => setShowMenu((prev) => !prev)}
      className="side-nav-footer"
    >
      <div className="flex-row">
        <span className="navbar-profile">
          {user.displayName.charAt(0).toUpperCase()}
        </span>
        <div>
          <p style={{ fontWeight: 600 }}>{user.displayName}</p>
          <p style={{ color: "#c0c3cb", fontSize: "12px" }}>Admin</p>
        </div>
      </div>
      <ChevronRight style={{ marginRight: 8 }} color="#c0c3cb" size={18} />
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            exit={{ opacity: 0, y: 10 }}
            className="profile-menu-wrapper"
          >
            <div className="flex-row profile-menu-header">
              <span>{user.displayName.charAt(0).toUpperCase()}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: "14px" }}>
                  {user.displayName}
                </p>
                <p style={{ color: "gray", fontSize: "13px" }}>Admin</p>
              </div>
            </div>
            <div className="profile-menu-body">
              <p>
                <User size={20} /> Profile
              </p>
              <p>
                <Settings size={20} /> Settings
              </p>
            </div>
            <div className="profile-menu-footer">
              <p onClick={logOut}>
                <LogOut size={20} /> Log Out
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SidebarProfileMenu;
