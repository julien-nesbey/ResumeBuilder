//React
import { useRef } from "react";

//React Router
import { useNavigate } from "react-router-dom";

//Context
import { useValuesContext } from "../../context/ValuesContext";

//DaisyUI
import { Button } from "react-daisyui";

//PDF
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

//Styles
import styles from "../../styles/template2.module.css";

//Assets
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/github.svg";
import facebook from "../../assets/facebook.svg";

const Template2 = () => {
  const TemplateRef = useRef();
  const navigate = useNavigate();
  const { getValues } = useValuesContext();

  const {
    firstName,
    lastName,
    countryCode,
    phone,
    email,
    address,
    profile,
    socials,
    academic,
    experience,
    achievements,
    languages,
    skills,
  } = getValues();

  const downloadPDF = async () => {
    const template = TemplateRef.current;
    await toJpeg(template, { quality: 1 }).then((url) => {
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(url);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(url, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${firstName} ${lastName}'s CV.pdf`);
    });
  };

  return (
    <div data-theme="dark" className="flex flex-col min-h-screen m-8">
      <div
        ref={TemplateRef}
        className={`p-8 self-center bg-white text-zinc-800 ${styles.template2}`}
      >
        {/* Header */}
        <div className="flex flex-col border-b-2 p-4">
          <h1 className={`text-5xl font-medium ${styles.name__title}`}>
            {firstName} {lastName}
          </h1>
        </div>

        {/* Body Container */}
        <div className="flex flex-row w-full">
          {/* Left Side */}
          <div className="flex flex-col border-r-2 w-fit p-4 gap-y-8">
            {/* Details */}
            <div className="flex flex-col gap-y-4">
              <h1 className={`mb-4 ${styles.h1}`}>Details</h1>

              {/* Address */}
              <div className="flex flex-col">
                <h2 className={`text-zinc-800 ${styles.h2}`}>Address</h2>
                <p className="text-gray-500 font-medium">{address}</p>
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <h2 className={`text-zinc-800 ${styles.h2}`}>Phone</h2>
                <p className="text-gray-500 font-medium">
                  {countryCode} {phone}
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <h2 className={`text-zinc-800 ${styles.h2}`}>Email</h2>
                <p className="text-gray-500 font-medium">{email}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-y-4">
              <h1 className={`mb-4 ${styles.h1}`}>Skills</h1>

              <div className="flex flex-row flex-wrap gap-y-1">
                {skills.map((skill, index) => {
                  return (
                    <p key={index} className="font-medium w-1/2">
                      {skill.skill}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-y-4">
              <h1 className={`mb-4 ${styles.h1}`}>Languages</h1>

              {languages.map((language, index) => {
                return (
                  <p key={index} className="font-medium">
                    {language.language} - {language.level}
                  </p>
                );
              })}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-y-4">
              <h1 className={`mb-4 ${styles.h1}`}>Socials</h1>
              {socials?.map((social, index) => {
                let platform;
                if (social.platform.toLowerCase() == "linkedin") {
                  platform = linkedin;
                } else if (social.platform.toLowerCase() == "github") {
                  platform = github;
                } else if (social.platform.toLowerCase() == "facebook") {
                  platform = facebook;
                }
                return (
                  <div>
                    <img src={platform} alt={social.platform.toLowerCase()} />
                    <a
                      href={social.link}
                      target="_blank"
                      key={index}
                      className="text-gray-500"
                    >
                      {social.link}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col p-4 pl-8 gap-y-8">
            {/* Profile */}
            <div className="flex flex-col border-b-2 gap-y-4">
              <h1 className={`${styles.h1}`}>Profile</h1>
              <div className="pb-8">
                <p className="text-gray-500 text-justify text-sm">{profile}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex flex-col border-b-2 gap-y-4">
              <h1 className={`${styles.h1}`}>Experience</h1>
              <div className="flex flex-col gap-y-4 pb-8">
                {experience.map((exp, index) => {
                  return (
                    <div className="flex flex-col gap-y-2" key={index}>
                      <div className="flex flex-row justify-around">
                        <h2 className="flex-1">{exp.company}</h2>
                        <p>{exp.location}</p>
                      </div>
                      <p>{exp.position}</p>
                      <p>
                        {exp.period.start} - {exp.period.end}
                      </p>
                      <ul className="list-disc pl-4 text-sm">
                        {exp.duties
                          .trim()
                          .split(",")
                          .map((duty, dutyIndex) => (
                            <li key={dutyIndex}>{duty}</li>
                          ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Education */}
            <div className="flex flex-col border-b-2 gap-y-4">
              <h1 className={`${styles.h1}`}>Education</h1>
              <div className="flex flex-col gap-y-4 pb-8">
                {academic.map((edu, index) => {
                  return (
                    <div className="flex flex-col gap-y-2" key={index}>
                      <div className="flex flex-row">
                        <h2 className="flex-1">{edu.school}</h2>
                        <p>{edu.location}</p>
                      </div>
                      <p>
                        {edu.period.start} - {edu.period.end}
                      </p>
                      <p>
                        {edu.degree} - {edu.specialization}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="flex flex-col border-b-2 gap-y-4">
              <h1 className={`${styles.h1}`}>Achievements</h1>
              <div className="flex flex-col gap-y-4 pb-8">
                {achievements.map((ach, index) => {
                  return (
                    <div className="flex flex-col gap-y-2" key={index}>
                      <h2 className="flex-1">{ach.achievement}</h2>
                      <p>{ach.period}</p>
                      <p className="text-justify text-gray-500 text-sm">
                        {ach?.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row py-6">
        <Button onClick={downloadPDF} className="mx-auto" color="primary">
          Download
        </Button>
        <Button
          onClick={() => navigate("/build")}
          className="mx-auto"
          color="primary"
        >
          Modify
        </Button>
      </div>
    </div>
  );
};

export default Template2;
