import React from "react";

const AboutPage = () => {
  return (
    <div className='container mx-auto p-6 max-w-3xl text-neutral-10'>
      <h1 className='text-3xl font-bold mb-4'>About Us</h1>
      <div className='prose prose-invert'>
        <p>
          <strong>Codepply</strong> is a platform dedicated to connecting talented developers with
          innovative companies and projects. Our mission is to make tech recruitment and
          collaboration simple, transparent, and effective for everyone.
        </p>
        <h2 className='text-xl font-semibold mt-4'>What We Do</h2>
        <ul>
          <li>Help developers showcase their skills and find exciting opportunities.</li>
          <li>Enable recruiters to discover and contact top talent easily.</li>
          <li>Foster a community of learning, growth, and professional networking.</li>
        </ul>
        <h2 className='text-xl font-semibold mt-4'>Our Values</h2>
        <ul>
          <li>Transparency</li>
          <li>Diversity & Inclusion</li>
          <li>Innovation</li>
          <li>User Empowerment</li>
        </ul>
        <h2 className='text-xl font-semibold mt-4'>Contact</h2>
        <p>
          For more information, reach out at{" "}
          <a href='mailto:contact@codepply.com'>contact@codepply.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
