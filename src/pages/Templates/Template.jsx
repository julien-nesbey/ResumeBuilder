//React
import { useRef } from "react";

//React Router
import { useNavigate } from "react-router-dom";

//Context
import { useValuesContext } from "../../context/ValuesContext";

//DaisyUI
import { Button } from "react-daisyui";

//Components
import SocialChoice from "../../components/Template/SocialChoice";

//PDF
import ReactToPdf from "react-to-pdf";

//Styles
import styles from "../../styles/template.module.css";

//Assets
import envelope from "../../assets/envelope-fill.svg";
import map from "../../assets/pin-map-fill.svg";
import telephone from "../../assets/telephone-fill.svg";

const Template = () => {
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
        className={`p-8 self-center bg-white text-zinc-800 ${styles.template}`}
      >
        {/* Body Container */}
        <div className="flex flex-row w-full gap-x-2">
          {/* Left */}
          <div className="flex flex-col w-fit border-r-2 p-4">
            {/* Name */}
            <div className="flex flex-col text-right">
              <h1 className="font-semibold text-4xl">
                {firstName} {lastName}
              </h1>
              <p className="py-2 font-medium">{jobTitle}</p>
            </div>

            {/* Personal Details */}
            <div className="flex flex-col items-end gap-y-2 pt-4">
              <div className="flex flex-row gap-x-4">
                <p className="font-medium">{address}</p>
                <img src={map} />
              </div>
              <div className="flex flex-row gap-x-4">
                <p className="font-medium">
                  {countryCode} {phone}
                </p>
                <img src={telephone} />
              </div>
              <div className="flex flex-row gap-x-4">
                <p className="font-medium">{email}</p>
                <img src={envelope} />
              </div>
            </div>

            {/* Socials */}
            {socials.length > 0 ? (
              <div className="flex flex-col pt-8">
                <div className="flex flex-row items-baseline gap-x-2 pr-4">
                  <h1 className="uppercase font-bold">Socials</h1>
                  <div className="flex-1 bg-gray-300 h-3" />
                </div>
                <div className="flex flex-col pt-4 font-semibold gap-y-4">
                  {socials?.map((social, index) => {
                    return <SocialChoice social={social} key={index} />;
                  })}
                </div>
              </div>
            ) : null}

            {/* Academic */}
            <div className="flex flex-col pt-8">
              <div className="flex flex-row items-baseline gap-x-2 pr-4">
                <h1 className="uppercase font-bold">Academic</h1>
                <div className="flex-1 bg-gray-300 h-3" />
              </div>
              <div className="flex flex-col pt-4 gap-y-4">
                {academic.map((aca, index) => {
                  return (
                    <div key={index} className="flex flex-col pr-4 gap-y-1">
                      <h2 className="flex-1 font-semibold">{aca.school}</h2>
                      <p>
                        {aca.degree} - {aca.specialization}
                      </p>
                      <p>
                        {aca.period.start} -{" "}
                        {aca.period.present ? "Present" : aca.period.end}
                      </p>
                      <p>{aca.location}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-col pt-8">
              <div className="flex flex-row items-baseline gap-x-2 pr-4">
                <h1 className="uppercase font-bold">Languages</h1>
                <div className="flex-1 bg-gray-300 h-3" />
              </div>
              <div className="flex flex-col pt-4 font-semibold gap-y-4">
                {languages.map((lan, index) => {
                  return (
                    <p key={index}>
                      {lan.language} - {lan.level}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col pt-8">
              <div className="flex flex-row items-baseline gap-x-2 pr-4">
                <h1 className="uppercase font-bold">Skills</h1>
                <div className="flex-1 bg-gray-300 h-3" />
              </div>
              <div className="flex flex-row flex-wrap pt-4 gap-y-4">
                {skills.map((skill, index) => {
                  return (
                    <p key={index} className="w-1/2 font-semibold">
                      {skill.skill}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col p-4 gap-y-4 flex-1">
            {/* Profile */}
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row items-baseline gap-x-2 pr-4">
                <h1 className="uppercase font-bold">Profile</h1>
                <div className="flex-1 bg-gray-300 h-3" />
              </div>
              <p className="text-justify text-gray-500 font-medium text-sm">
                {profile}
              </p>
            </div>

            {/* Career */}
            {experience.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-baseline gap-x-2 pr-4">
                  <h1 className="uppercase font-bold">Career</h1>
                  <div className="flex-1 bg-gray-300 h-3" />
                </div>
                <div className="flex flex-col px-4 gap-y-4">
                  {experience.map((exp, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-y-2 font-medium"
                      >
                        <div className="flex flex-row justify-between">
                          <p className="uppercase font-semibold">
                            {exp.company}
                          </p>
                          <p>{exp.location}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <p>{exp.position}</p>
                          <p>
                            {exp.period.start} -{" "}
                            {exp.period.present ? "Present" : exp.period.end}
                          </p>
                        </div>
                        <ul className="pl-4">
                          {exp.duties
                            .trim()
                            .split(",")
                            .map((duty, idx) => {
                              return (
                                <li key={idx} className="list-disc">
                                  {duty}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Achievements */}
            {achievements.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-baseline gap-x-2 pr-4">
                  <h1 className="uppercase font-bold">Achievements</h1>
                  <div className="flex-1 bg-gray-300 h-3" />
                </div>
                <div className="flex flex-col px-4 gap-y-6">
                  {achievements.map((ach, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-y-1 font-medium"
                      >
                        <p className="uppercase font-semibold">
                          {ach.achievement}
                        </p>
                        <p>{ach.period}</p>
                        <p className="text-xs text-justify">
                          {ach?.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-row py-6">
        <ReactToPdf
          targetRef={TemplateRef}
          filename={`${firstName} ${lastName}'s CV`}
          scale={0.9}
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

export default Template;
