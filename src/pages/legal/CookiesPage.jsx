import React from "react";

const CookiesPage = () => {
  return (
    <div className='container mx-auto p-6 max-w-3xl text-neutral-10'>
      <h1 className='text-3xl font-bold mb-4'>Cookie Policy</h1>
      <div className='prose prose-invert'>
        <p>Codepply uses cookies to improve your experience on our platform.</p>
        <ol>
          <li>
            <strong>What Are Cookies?</strong> - Cookies are small text files stored on your device
            to help websites remember information about you.
          </li>
          <li>
            <strong>How We Use Cookies</strong> - To remember your preferences and to analyze site
            usage and improve our services.
          </li>
          <li>
            <strong>Managing Cookies</strong> - You can control or delete cookies through your
            browser settings.
          </li>
          <li>
            <strong>Third-Party Cookies</strong> - Some cookies may be set by third-party services
            we use (e.g., analytics).
          </li>
        </ol>
        <p>
          For questions about our cookie policy, contact{" "}
          <a href='mailto:privacy@codepply.com'>privacy@codepply.com</a>.
        </p>
      </div>
    </div>
  );
};

export default CookiesPage;
