export default function NavigationDemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-b from-purple-900 via-purple-800 to-purple-600 text-white py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-signal font-bold mb-6">
              Professional Navigation Demo
            </h1>
            <p className="text-xl sm:text-2xl opacity-90 mb-8">
              Testing navigation overlay on gradient backgrounds
            </p>
            <p className="text-lg opacity-80">
              Scroll down to see how the navigation adapts to different backgrounds
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-signal font-bold mb-6">Navigation Features</h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-4">
                <li>
                  <strong>Responsive Design:</strong> The navigation adapts seamlessly between desktop and mobile viewports
                </li>
                <li>
                  <strong>Theme Support:</strong> Works perfectly in both light and dark modes with proper contrast
                </li>
                <li>
                  <strong>Dropdown Menus:</strong> Services and Insights sections have clean dropdown menus with icons
                </li>
                <li>
                  <strong>Scroll Behavior:</strong> Background transitions from transparent to solid on scroll
                </li>
                <li>
                  <strong>Accessibility:</strong> Proper ARIA labels and keyboard navigation support
                </li>
                <li>
                  <strong>Modern Design:</strong> Uses shadcn/ui components with consistent spacing and typography
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-signal font-bold mb-6">Dark Background Test</h2>
            <p className="text-lg opacity-90">
              The navigation maintains excellent contrast on dark backgrounds, ensuring readability and usability.
            </p>
          </div>
        </div>
      </section>

      {/* Light Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-signal font-bold mb-6">Light Background Test</h2>
            <p className="text-lg">
              On light backgrounds, the navigation switches to dark text with proper hover states and visual hierarchy.
            </p>
          </div>
        </div>
      </section>

      {/* Spacing Demo */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-signal font-bold mb-6">Plenty of Content for Scrolling</h2>
            <p className="text-lg">
              This section provides enough height to test the scroll behavior of the navigation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}