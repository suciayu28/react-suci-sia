// src/components/Section.jsx
export default function Section({ title, description, children }) {
  return (
    <section className="py-10 border-b border-gray-100 last:border-0">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-gray-500 text-lg">
            {description}
          </p>
        )}
      </div>
      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}