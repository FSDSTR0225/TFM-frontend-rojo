import React from "react";

const PrivacyPage = () => {
  return (
    <div className='container mx-auto p-6 max-w-3xl text-neutral-10'>
      <h1 className='text-3xl font-bold mb-4'>Privacy Policy</h1>
      <div className='prose prose-invert'>
        <p>
          At Codepply, we are committed to protecting your privacy. This policy explains how we
          collect, use, and safeguard your information.
        </p>
        <ol>
          <li>
            <strong>Information We Collect</strong> - Personal data you provide (name, email, etc.)
            and usage data (pages visited, actions taken).
          </li>
          <li>
            <strong>How We Use Your Information</strong> - To provide and improve our services, and
            to communicate with you about your account or updates.
          </li>
          <li>
            <strong>Data Sharing</strong> - We do not sell your data. We may share it with trusted
            partners for service delivery.
          </li>
          <li>
            <strong>Your Rights</strong> - You can access, update, or delete your data at any time.
          </li>
          <li>
            <strong>Cookies</strong> - We use cookies to enhance your experience. You can manage
            cookie preferences in your browser.
          </li>
        </ol>
        <p>
          For more details or requests, contact{" "}
          <a href='mailto:privacy@codepply.com'>privacy@codepply.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
