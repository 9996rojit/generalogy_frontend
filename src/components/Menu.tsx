import { Link, useNavigate } from "react-router-dom";
import LocalStorageUtil from "../hooks/localStorage";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/dashboard",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/parent.png",
        label: "Relation",
        href: "/relations",
        visible: ["admin", "teacher"],
      },
      // {
      //   icon: "/student.png",
      //   label: "Students",
      //   href: "/list/students",
      //   visible: ["admin", "teacher"],
      // },
      // {
      //   icon: "/parent.png",
      //   label: "Parents",
      //   href: "/list/parents",
      //   visible: ["admin", "teacher"],
      // },
      // {
      //   icon: "/subject.png",
      //   label: "Subjects",
      //   href: "/list/subjects",
      //   visible: ["admin"],
      // },
      // {
      //   icon: "/class.png",
      //   label: "Classes",
      //   href: "/list/classes",
      //   visible: ["admin", "teacher"],
      // },
      // {
      //   icon: "/lesson.png",
      //   label: "Lessons",
      //   href: "/list/lessons",
      //   visible: ["admin", "teacher"],
      // },
      // {
      //   icon: "/exam.png",
      //   label: "Exams",
      //   href: "/list/exams",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/assignment.png",
      //   label: "Assignments",
      //   href: "/list/assignments",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/result.png",
      //   label: "Results",
      //   href: "/list/results",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/attendance.png",
      //   label: "Attendance",
      //   href: "/list/attendance",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/calendar.png",
      //   label: "Events",
      //   href: "/list/events",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/message.png",
      //   label: "Messages",
      //   href: "/list/messages",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/announcement.png",
      //   label: "Announcements",
      //   href: "/list/announcements",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];



const Menu = () => {
  const navigate = useNavigate()
  const role = 'admin'

  const handleLogout = () => {
    LocalStorageUtil.removeItem('authToken')
    navigate('/')
  }
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  to={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <img src={item.icon} width={'20px'} height={'20px'} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
      <div className="mt-4 py-2 md:px-2 flex">
        <img src="./logout.png" width={'20px'} height={'20px'} />
        <button onClick={handleLogout} className="text-sm text-gray-500 ml-2">Logout</button>
      </div>
    </div>
  );
};

export default Menu;
