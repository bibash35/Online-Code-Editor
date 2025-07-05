import React from "react";
import GlobalHeader from "../constant/GlobalHeader";
import GlobalFooter from "../constant/GlobalFooter";
const Blog = () => {
  return (
       <>
        <GlobalHeader/>
    
     <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">The JS Bin Blog</h1>

      <article className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the JS Bin Blog</h2>
        <p className="text-gray-700 mb-4">
          Hello and welcome! We’re thrilled to introduce the official JS Bin blog—a space where we
          share product updates, developer tips, community highlights, and our roadmap for the
          future.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">What is JS Bin?</h3>
        <p className="text-gray-700 mb-4">
          JS Bin is a web-based collaborative code editor that allows developers to write,
          test, and share HTML, CSS, and JavaScript code in real time. It’s especially useful
          for front-end prototyping, bug testing, or teaching web development concepts. With
          instant preview and live reload, you can see the results of your code without
          switching tabs or refreshing your browser.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Why We Created This Blog</h3>
        <p className="text-gray-700 mb-4">
          Over the years, JS Bin has helped thousands of developers and educators. But we
          realized we needed a better way to share news, communicate changes, and offer best
          practices to our community. This blog is our voice — a direct channel to connect
          with you.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Recent Improvements</h3>
        <p className="text-gray-700 mb-4">
          In the past few months, we’ve made significant enhancements to the editor:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Improved code auto-formatting and syntax highlighting</li>
          <li>Dark mode support</li>
          <li>Faster rendering and live updates</li>
          <li>Mobile responsiveness for tablets and phones</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-2">Tips for Power Users</h3>
        <p className="text-gray-700 mb-4">
          Here are a few lesser-known features you might find useful:
        </p>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li>You can press <strong>Ctrl + Enter</strong> to manually trigger a live reload.</li>
          <li>Use <strong>Shift + Tab</strong> to auto-indent selected lines of code.</li>
          <li>Click the gear icon to toggle auto-run on/off for better performance.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-8 mb-2">Looking Ahead</h3>
        <p className="text-gray-700 mb-4">
          We have big plans for the future of JS Bin, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Plugin support for custom tools and themes</li>
          <li>Cloud saving and user authentication</li>
          <li>Integration with GitHub Gists and CodeSandbox</li>
          <li>More accessible UI features</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-2">Join the Conversation</h3>
        <p className="text-gray-700 mb-4">
          We'd love to hear from you. Whether you have feedback, feature requests, or just want
          to share your favorite JS Bin moment, this blog is open to you. Together, we can
          continue to build a tool that empowers the developer community.
        </p>

        <p className="text-gray-700 mb-6">
          Thanks for being part of our journey!
        </p>

        <footer className="mt-6 text-sm text-gray-500">
          Posted on July 5, 2025 · By the JS Bin Team
        </footer>
      </article>
    </div>
    
        <GlobalFooter/>
       </>
  );
};

export default Blog;
