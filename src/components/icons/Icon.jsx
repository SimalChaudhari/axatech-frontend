/**
 * Icons: common Icon wrapper + all named icons in one file.
 */

function Icon({ iconClass, className = '', ...props }) {
  return (
    <span
      className={`${iconClass} ${className}`.trim()}
      aria-hidden
      {...props}
    />
  );
}

export default Icon;

// Trash / delete
export function TrashIcon({ className = '' }) {
  return <Icon iconClass="icon-[solar--trash-bin-trash-bold]" className={className} />;
}

// Edit / pen
export function PenIcon({ className = '' }) {
  return <Icon iconClass="icon-[solar--pen-bold]" className={className} />;
}

// Search / magnify
export function SearchIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--magnify]" className={className} />;
}

// Close (modal / drawer)
export function CloseIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--close]" className={className} />;
}

// Kebab / more actions (vertical three dots)
export function DotsVerticalIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--dots-vertical]" className={className} />;
}

// Chevron down (dropdowns)
export function ChevronDownIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-down]" className={className} />;
}

// Chevron up (e.g. sort ascending)
export function ChevronUpIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-up]" className={className} />;
}

// Arrow up (solar linear)
export function ArrowUpIcon({ className = '' }) {
  return <Icon iconClass="icon-[solar--arrow-up-linear]" className={className} />;
}

// Chevron left/right (pagination)
export function ChevronLeftIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-left]" className={className} />;
}

export function ChevronRightIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-right]" className={className} />;
}

// Plus (add / new)
export function PlusIcon({ className = '' }) {
  return <Icon iconClass="icon-[pepicons-pop--plus]" className={className} />;
}

// Open in new / external link
export function OpenInNewIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--open-in-new]" className={className} />;
}

// Admin nav
export function DashboardIcon({ className = '' }) {
  return <Icon iconClass="icon-[line-md--speedometer-loop]" className={className} />;
}

// Admin dashboard welcome (duo style)
export function DashboardDuoIcon({ className = '' }) {
  return <Icon iconClass="icon-[duo-icons--dashboard]" className={className} />;
}

export function HomeContentIcon({ className = '' }) {
  return <Icon iconClass="icon-[streamline-plump--home-1-solid]" className={className} />;
}

export function LicensesIcon({ className = '' }) {
  return <Icon iconClass="icon-[game-icons--chalice-drops]" className={className} />;
}

export function CategoriesIcon({ className = '' }) {
  return <Icon iconClass="icon-[solar--tag-bold-duotone]" className={className} />;
}

export function ProductsIcon({ className = '' }) {
  return <Icon iconClass="icon-[streamline-ultimate--products-gifts-bold]" className={className} />;
}

export function ServicesIcon({ className = '' }) {
  return <Icon iconClass="icon-[grommet-icons--services]" className={className} />;
}

export function CloudPlansIcon({ className = '' }) {
  return <Icon iconClass="icon-[emojione-monotone--cloud]" className={className} />;
}

export function EnquiriesIcon({ className = '' }) {
  return <Icon iconClass="icon-[fluent--mail-48-filled]" className={className} />;
}

export function BlogsIcon({ className = '' }) {
  return <Icon iconClass="icon-[streamline-freehand--book-bookmark]" className={className} />;
}

// Header / layout
export function PhoneIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--phone]" className={className} />;
}

export function EmailOutlineIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--email-outline]" className={className} />;
}

export function DownloadIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--download]" className={className} />;
}

export function WeatherSunnyIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--weather-sunny]" className={className} />;
}

export function WeatherNightIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--weather-night]" className={className} />;
}

export function ShieldAccountIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--shield-account]" className={className} />;
}

export function AccountCircleIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--account-circle]" className={className} />;
}

export function CogOutlineIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--cog-outline]" className={className} />;
}

export function AccountOutlineIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--account-outline]" className={className} />;
}

export function LogoutIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--logout]" className={className} />;
}

export function LoginIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--login]" className={className} />;
}

export function CartOutlineIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--cart-outline]" className={className} />;
}

// Menu (hamburger)
export function MenuIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--menu]" className={className} />;
}

// Profile / user (la user-secret)
export function UserSecretIcon({ className = '' }) {
  return <Icon iconClass="icon-[la--user-secret]" className={className} />;
}
