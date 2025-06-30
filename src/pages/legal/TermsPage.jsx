import React from "react";

const TermsPage = () => {
  return (
    <div className='container mx-auto p-6 max-w-3xl text-neutral-10'>
      <h1 className='text-3xl font-bold mb-4'>Terms of Use</h1>
      <div className='prose prose-invert'>
        {/* Puedes reemplazar esto por un fetch o import dinámico si quieres mostrar el markdown real */}
        <p>
          Welcome to Codepply. By accessing or using our platform, you agree to comply with and be
          bound by these Terms of Use. Please read them carefully. If you do not agree with any part
          of these terms, you must not use our services.
        </p>
        <ol>
          <li>
            <strong>Acceptance of Terms</strong> - By using Codepply, you agree to these terms and
            any future updates.
          </li>
          <li>
            <strong>User Responsibilities</strong> - You are responsible for the accuracy of the
            information you provide. You must not use the platform for unlawful purposes.
          </li>
          <li>
            <strong>Intellectual Property</strong> - All content, trademarks, and data on this site
            are the property of Codepply or its licensors.
          </li>
          <li>
            <strong>Limitation of Liability</strong> - Codepply is not liable for any damages
            arising from the use of the platform.
          </li>
          <li>
            <strong>Changes to Terms</strong> - We may update these terms at any time. Continued use
            of the platform means you accept the new terms.
          </li>
        </ol>
        <p>
          For questions, contact us at{" "}
          <a href='mailto:support@codepply.com'>support@codepply.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
