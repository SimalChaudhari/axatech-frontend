import { Dropdown, Button, Input } from '../common';

export default function ProductsToolbar({
  search,
  onSearchChange,
  onSearchSubmit,
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
      <form onSubmit={onSearchSubmit} className="flex gap-3 flex-1 min-w-[200px]">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 mb-0 min-w-0"
        />
        <Button
          type="submit"
          variant="primary"
          fullWidth={false}
          className="w-[120px] px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          Search
        </Button>
      </form>
      <Dropdown
        placeholder="All categories"
        value={category}
        onChange={onCategoryChange}
        options={categories}
        className="max-w-[220px]"
      />
    </div>
  );
}
