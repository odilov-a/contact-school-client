import React, { useState } from "react";
import { Menu } from "antd";
import { FileImageOutlined, UserOutlined, BookOutlined, EditOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  Translation,
  LogOut,
  Light,
  Dark,
} from "assets/images/icons";
import useStore from "store";
// import Avatar from "assets/images/avatar.png";
import { useHooks } from "hooks";
import { storage } from "services";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  route?: string;
}

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const Navigation: React.FC = () => {
  const {
    logOut,
    changeTheme,
    system: { theme }
  } = useStore((state) => state);
  const [openKeys, setOpenKeys] = useState<string[]>(["sub1"]);
  const [isDarkMode, setIsDarkMode] = useState(storage.get("theme") == "light" ? false : true);
  const { navigate, t } = useHooks();
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const items: MenuItem[] = [
    {
      key: "blogs",
      label: "bloglar",
      icon: <EditOutlined />,
      route: "/blogs",
    },
    {
      key: "vacancies",
      label: "vakansiya",
      icon: <UserAddOutlined />,
      route: "/vacancies",
    },
    {
      key: "galleries",
      label: "galereya",
      icon: <FileImageOutlined />,
      route: "/galleries",
    },
    {
      key: "teachers",
      label: "teacher",
      icon: <UserOutlined />,
      route: "/teachers",
    },
    {
      key: "programs",
      label: "programs",
      icon: <BookOutlined />,
      route: "/programs",
    },
    {
      key: "telegram-courses",
      label: "telegram-courses",
      icon: <SettingOutlined />,
      route: "/telegram-courses",
    },
    {
      key: "telegram-vacancies",
      label: "telegram-vacancies",
      icon: <SettingOutlined />,
      route: "/telegram-vacancies",
    },
    {
      key: "translations",
      label: "tarjimalar",
      icon: <Translation />,
      route: "/translations",
    },
    // {
    //   key: "sub4",
    //   label: "Navigation Five",
    //   icon: <Translation />,
    //   children: [
    //     { key: "9", label: "Option 9", route: "/" },
    //     { key: "10", label: "Option 10", route: "/" },
    //     { key: "11", label: "Option 11", route: "/" },
    //     { key: "12", label: "Option 12", route: "/" },
    //   ],
    // },
  ];

  document.body.classList.add(isDarkMode ? "dark" : "light");
  const changeThemeFunc = () => {
    setIsDarkMode((prevMode) => !prevMode);
    changeTheme(isDarkMode ? "light" : "dark");
    storage.set("theme", isDarkMode ? "light" : "dark");
    if (!isDarkMode) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className="h-full w-[280px] dark:bg-[#222638]"
      defaultSelectedKeys={["Arizalar"]}
      style={{ transition: "none" }}
    >
      {/* <div> */}
      <div className="flex justify-center text-center text-[20px] font-[500] mt-[30px] mb-[60px] cursor-pointer dark:text-[#9EA3B5]">
        {/* <img src={Logo} alt="logo" /> */}
        <Link to="/">{t("Contact School")}</Link>
      </div>
      {items.map((menuItem, i) => (
        <React.Fragment key={menuItem.key + i}>
          {menuItem.children ? (
            <Menu.SubMenu
              key={menuItem.key + i}
              icon={menuItem.icon}
              //@ts-ignore
              title={t(menuItem.label)}
            >
              {menuItem.children.map((childItem) => (
                <Menu.Item
                  key={childItem.key}
                  className="left-sidebar text-[#9EA3B5] text-[17px]"
                >
                  {childItem.route ? (
                    <Link className="capitalize" to={childItem.route}>{childItem.label}</Link>
                  ) : (
                    <>{childItem.route}</>
                  )}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={menuItem.key}
              className="left-sidebar text-[#9EA3B5] text-[17px]"
              icon={menuItem.icon}
            >
              {menuItem.route ? (
                <Link className="capitalize" to={menuItem.route}>{menuItem.label}</Link>
              ) : (
                <>{menuItem.route}</>
              )}
            </Menu.Item>
          )}
        </React.Fragment>
      ))}
      {/* </div> */}
      <div>
        <div className="absolute bottom-[36px] left-[20%]">
          <div className="flex justify-center bottom-[120px] h-[80px]">
            <div className="profile-panel transition-all ease-in-out duration-300">
              {/* <img
                className="sider-avatar cursor-pointer w-[105px] relative z-1 h-[95px] rounded-[12px]"
                src={Avatar}
                alt="user-avatar"
                onClick={() => {
                  navigate("/profile");
                }}
              /> */}
              <div className="username-input w-[175px] relative z-10 px-[6px] py-[4px] rounded-[16px] bg-[#E6ECFE] flex justify-between items-center">
                <Link
                  to="/profile"
                  className="inline-block text-[12px] py-[14px] px-[8px] transition rounded-[8px] hover:bg-[#DADFF1] hover:text-[#000]"
                >
                  Username
                </Link>
                <div
                  className="log-out cursor-pointer transition-all ease-in-out duration-300  p-[4px] hover:bg-[#DADFF1] rounded-[10px]"
                  onClick={() => {
                    logOut();
                    storage.remove("token");
                    navigate("/");
                  }}
                >
                  <LogOut />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-[#9EA3B5] text-[16px]">{t("Light")}</span>
            <label className="relative inline-block w-[70px] h-[34px] mx-[15px]">
              <input
                type="checkbox"
                onChange={changeThemeFunc}
                checked={isDarkMode}
                className="w-0 h-0 opacity-0"
              />
              <span className="slider round">
                <div className="dark-icon absolute top-[6px] left-[7px]">
                  <Dark />
                </div>
                <div className="light-icon absolute top-[6px] right-[7px]">
                  <Light />
                </div>
              </span>
            </label>
            <span className="text-[#9EA3B5] text-[16px]">{t("Dark")}</span>
          </div>
        </div>
      </div>
    </Menu>
  );
};
{
  /* <Dropdown
  className="mr-5"
  menu={{
    items,
    onClick: (value) => {
      if (get(value, "key") === "4") {
        logOut();
        storage.remove("token");
        navigate("/");
      }
    },
  }}
>
  <Avatar size={35} icon={<UserOutlined width={"20px"} />} />
</Dropdown>; */
}
export default Navigation;
