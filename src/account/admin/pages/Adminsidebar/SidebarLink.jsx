import { Link, useLocation } from "react-router-dom";

export default function SidebarLink({ link, collapsed, badgeCount }) {
  const { pathname } = useLocation();
  const isActive = pathname === link.path;

  const Icon = link.icon;

  return (
    <Link
      to={link.path}
      className={`
        relative
        group
        flex items-center
        ${collapsed ? 'justify-center' : 'gap-3'}
        px-3 py-3
        rounded-xl
        transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200' 
          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
        }
        ${collapsed ? 'w-full' : 'w-full'}
      `}
    >
      {/* Active Indicator Bar */}
      {isActive && !collapsed && (
        <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
      )}

      {/* Icon with hover animation */}
      <div className={`
        transition-transform duration-300
        group-hover:scale-110
        ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-red-600'}
      `}>
        <Icon size={20} />
      </div>

      {/* Link Name */}
      {!collapsed && (
        <span className="flex-1 font-medium text-left">
          {link.name}
        </span>
      )}

      {/* Badge */}
      {!collapsed && badgeCount > 0 && (
        <span className="
          px-2 py-1
          text-xs font-bold
          bg-white text-red-600
          rounded-full
          shadow-sm
          animate-pulse
        ">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="
          absolute left-full ml-2
          px-3 py-1.5
          bg-gray-900 text-white text-sm
          rounded-lg
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200
          whitespace-nowrap
          z-50
          shadow-lg
          pointer-events-none
        ">
          {link.name}
          {badgeCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {badgeCount}
            </span>
          )}
          <div className="
            absolute left-[-4px] top-1/2 -translate-y-1/2
            w-2 h-2
            bg-gray-900
            rotate-45
          " />
        </div>
      )}

      {/* Ripple effect on click (optional) */}
      <div className="
        absolute inset-0
        rounded-xl
        overflow-hidden
        pointer-events-none
      ">
        <div className="
          absolute inset-0
          opacity-0
          group-active:opacity-100
          transition-opacity
          bg-white/20
        " />
      </div>
    </Link>
  );
}