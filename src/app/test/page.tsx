export default function TestPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-signal font-bold mb-4">Test Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is a test page to verify the header and footer components are working correctly.
      </p>
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-signal font-semibold mb-2">Design System Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <div className="h-20 bg-shadow rounded"></div>
            <p className="text-sm">Shadow</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-indigo rounded"></div>
            <p className="text-sm">Indigo</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-orchid rounded"></div>
            <p className="text-sm">Orchid</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-lilac rounded"></div>
            <p className="text-sm">Lilac</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-lavender rounded"></div>
            <p className="text-sm">Lavender</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-skyward rounded"></div>
            <p className="text-sm">Skyward</p>
          </div>
        </div>
      </div>
    </div>
  );
}