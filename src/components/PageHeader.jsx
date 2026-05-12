const PageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {title}
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          {Array.isArray(breadcrumb)
            ? breadcrumb.join(" / ")
            : breadcrumb}
        </p>
      </div>

      {/* RIGHT */}
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;