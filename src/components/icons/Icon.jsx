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

// Kebab / more actions (vertical three dots)
export function DotsVerticalIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--dots-vertical]" className={className} />;
}

// Chevron down (dropdowns)
export function ChevronDownIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-down]" className={className} />;
}

// Chevron left/right (pagination)
export function ChevronLeftIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-left]" className={className} />;
}

export function ChevronRightIcon({ className = '' }) {
  return <Icon iconClass="icon-[mdi--chevron-right]" className={className} />;
}

// Admin nav
export function DashboardIcon({ className = '' }) {
  return <Icon iconClass="icon-[line-md--speedometer-loop]" className={className} />;
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
