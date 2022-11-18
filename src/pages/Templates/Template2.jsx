//React
import { useRef } from "react";

//React Router
import { useNavigate } from "react-router-dom";

//Context
import { useValuesContext } from "../../context/ValuesContext";

//DaisyUI
import { Button } from "react-daisyui";

//PDF
import ReactToPdf from "react-to-pdf";

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
    jobTitle,
    profile,
    socials,
    academic,
    experience,
    achievements,
    languages,
    skills,
  } = getValues();

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
          <p className="text-gray-500 p-2">{jobTitle}</p>
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
            {socials.length > 0 && (
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
                    <div key={index}>
                      <img src={platform} alt={social.platform.toLowerCase()} />
                      <a
                        href={social.link}
                        target="_blank"
                        className="text-gray-500"
                      >
                        {social.link}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col p-4 pl-8 gap-y-8 flex-1">
            {/* Profile */}
            <div className="flex flex-col border-b-2 gap-y-4">
              <h1 className={`${styles.h1}`}>Profile</h1>
              <div className="pb-8">
                <p className="text-gray-500 text-justify text-sm">{profile}</p>
              </div>
            </div>

            {/* Experience */}
            {experience.length > 0 && (
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
            )}

            {/* Education */}
            <div className="flex flex-col border-b-2 gap-y-4">
              <h1 className={`${styles.h1}`}>Education</h1>
              <div className="flex flex-col gap-y-4 pb-8">
                {academic.map((edu, index) => {
                  return (
                    <div className="flex flex-col gap-y-2" key={index}>
                      <div className="flex flex-row">
                        <h2 className={`flex-1 ${styles.h2}`}>{edu.school}</h2>
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
            {achievements.length > 0 && (
              <div className="flex flex-col border-b-2 gap-y-4">
                <h1 className={`${styles.h1}`}>Achievements</h1>
                <div className="flex flex-col gap-y-4 pb-8">
                  {achievements.map((ach, index) => {
                    return (
                      <div className="flex flex-col gap-y-2" key={index}>
                        <h2 className={`flex-1 ${styles.h2}`}>
                          {ach.achievement}
                        </h2>
                        <p>{ach.period}</p>
                        <p className="text-justify text-gray-500 text-sm">
                          {ach?.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row py-6">
        <ReactToPdf
          targetRef={TemplateRef}
          filename={`${firstName} ${lastName}'s CV`}
          scale={0.8}
          options={{
            orientation: "portrait",
            unit: "in",
            format: [8.5, 11.9],
          }}
        >
          {({ toPdf }) => (
            <Button onClick={toPdf} className="mx-auto" color="primary">
              Download
            </Button>
          )}
        </ReactToPdf>

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
