import React from 'react';
import GlobalHeader from "../constant/GlobalHeader";
import GlobalFooter from "../constant/GlobalFooter";
const AddLibrary = () => {
  return (
    <>
             <GlobalHeader/>
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Library</h1>

      <p className="mb-4">
        JS Bin allows you to enhance your project by including external JavaScript and CSS libraries.
        Adding a library can help streamline your development, especially when working with frameworks
        or utilities like jQuery, React, or Bootstrap.
      </p>

      <p className="mb-4">
        To add a library, simply open your project and navigate to the “Add Library” section from the toolbar.
        There you’ll see a list of common libraries, or you can paste a CDN link manually into the input field provided.
      </p>

      <p className="mb-4">
        If you're adding JavaScript libraries, make sure they are added in the correct order—dependencies first,
        then plugins or additional modules. For example, if you're using jQuery plugins, jQuery itself must
        be added before them.
      </p>

      <p className="mb-4">
        Similarly, CSS frameworks like Tailwind or Bootstrap can be added to instantly style your HTML
        with minimal effort. Just ensure that the links you add are secure and from a reliable source.
      </p>

      <p className="mb-4">
        Once a library is added, it will automatically load each time your bin runs. You can remove or
        modify the libraries anytime by visiting the same section.
      </p>

      <p className="italic text-sm mt-8 text-center">
        Tip: Always check for the latest version of the library you’re adding to take advantage of new features
        and security updates.
      </p>
    </div>
    <GlobalFooter/>
    
    </>
  );
};

export default AddLibrary;
