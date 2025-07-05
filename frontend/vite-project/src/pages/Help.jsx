import React from "react";
import GlobalHeader from "../constant/GlobalHeader";
import GlobalFooter from "../constant/GlobalFooter";
export default function Help() {
  return (
<>

    <GlobalHeader/>
<div className="max-w-4xl mx-auto mt-20 p-8 bg-white border border-gray-300 rounded shadow-sm font-sans text-gray-900">
      <h1 className="text-4xl font-semibold mb-8">JS Bin Help</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is JS Bin?</h2>
        <p>
          JS Bin is a simple, browser-based tool for experimenting with JavaScript, HTML, and CSS. Write code and see the results instantly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How do I add a library?</h2>
        <p>
          To add a library, click the "Add Library" button or open the library panel. Enter the library name or choose from the list, then include it in your bin.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saving Your Work</h2>
        <p>
          You can save your bin to your account or generate a URL to share your work with others.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shortcuts & Tips</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Use Ctrl+Enter (Cmd+Enter on Mac) to run your code.</li>
          <li>Double-click the panel separators to expand or collapse them.</li>
          <li>Check the console panel for errors and debugging information.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
        <p>
          If you have questions or want to report bugs, please reach out to the development team through the contact page or GitHub repository.
        </p>
      </section>
    </div>

    <GlobalFooter/>
</>
    
  );
}
