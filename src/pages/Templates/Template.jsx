//React
import { useRef } from "react";

//React Router
import { useNavigate } from "react-router-dom";

//Context
import { useValuesContext } from "../../context/ValuesContext";

//DaisyUI
import { Button, Divider } from "react-daisyui";

//PDF
import ReactToPdf from "react-to-pdf";

//Assets
import map from "../../assets/pin-map-fill.svg";
import envelope from "../../assets/envelope-fill.svg";
import telephone from "../../assets/telephone-fill.svg";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/github.svg";
import facebook from "../../assets/facebook.svg";

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
    profile,
    socials,
    academic,
    experience,
    achievements,
    languages,
    skills,
    activities,
  } = getValues();

  return (
    <div>
      <div
        className="flex flex-col mx-auto h-auto w-screen"
        data-theme="fantasy"
        ref={TemplateRef}
      >
        {/* Name */}
        <div className="flex flex-col mx-12">
          <h1 className="text-4xl font-normal py-10">
            {firstName && firstName} {lastName && lastName}
          </h1>
          <div className="flex flex-row gap-x-4 flex-wrap w-full justify-center">
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
                <div className="flex-1">
                  <img src={platform} alt={social.platform.toLowerCase()} />
                  <a
                    href={social.link}
                    target="_blank"
                    key={index}
                    className="link link-primary"
                  >
                    {social.link}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <Divider className="px-12" />

        {/* Profile */}
        <div className="self-start py-6 mx-12 text-justify">
          <p>{profile && profile}</p>
        </div>

        {/* Personal Info */}
        <div className="flex flex-row bg-blue-200 text-black mx-12 justify-around items-center py-4">
          <span className="flex flex-row gap-4 text-lg">
            <img src={map} />
            {address && address}
          </span>
          <span className="flex flex-row gap-4 text-lg">
            <img src={envelope} />
            {email && email}
          </span>
          <span className="flex flex-row gap-4 text-lg">
            <img src={telephone} />
            {countryCode && countryCode} {phone && phone}
          </span>
        </div>

        {/* Education & Language Container */}
        <div className="flex flex-row justify-between items-start mx-12 mt-8 gap-8">
          {/* Education */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-x-4">
              <h1 className="text-2xl py-2">Education</h1>
              <div className="h-4 w-full bg-gray-300"></div>
            </div>

            {/* To be repeated */}
            {academic?.map((item, index) => (
              <div key={index}>
                <div className="flex flex-col pl-8">
                  <h3 className="font-semibold">
                    {item.degree} - {item.specialization}
                  </h3>
                  <p className="py-2">{item.school}</p>
                  <p>
                    {item.period.start} - {item.period.end}
                  </p>
                </div>
                <Divider />
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row items-center gap-x-4">
              <h1 className="text-2xl py-2">Languages</h1>
              <div className="h-4 w-full bg-gray-300"></div>
            </div>

            <div className="flex flex-row pl-4 gap-4 flex-wrap">
              {/* To be repeated */}
              {languages?.map((language, index) => (
                <div key={index} className="flex flex-col pl-8 w-1/3">
                  <h3 className="font-semibold">{language.language}</h3>
                  <p>{language.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Experience & Skills */}
        <div className="flex flex-row justify-between items-start mx-12 mt-8 gap-8">
          {/* Professional Experience */}
          {experience?.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="flex-flex-col w-full">
                <div className="flex flex-row items-center gap-x-4">
                  <h1 className="text-2xl py-2">Experience</h1>
                  <div className="h-4 w-full bg-gray-300"></div>
                </div>
                {/* To be repeated */}
                {experience.map((item, index) => (
                  <div key={index}>
                    <div className="flex flex-col pl-8">
                      <h1 className="text-xl font-bold">{item?.position}</h1>
                      <div className="flex flex-row justify-between font-semibold py-2">
                        <p>
                          {item?.company} - {item?.location}
                        </p>
                        <p>
                          {item?.period?.start} - {item?.period?.end}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-md font-medium underline">
                          Main Duties
                        </p>
                        <ul className="list-disc pl-4 text-sm">
                          {item.duties
                            .trim()
                            .split(",")
                            .map((duty, dutyIndex) => (
                              <li key={dutyIndex}>{duty}</li>
                            ))}
                        </ul>
                      </div>
                      <Divider />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="flex-flex-col w-1/2">
              <div className="flex flex-row items-center gap-x-4">
                <h1 className="text-2xl py-2">Skills</h1>
                <div className="h-4 w-full bg-gray-300"></div>
              </div>
              <div className="flex flex-row pl-4 gap-4 flex-wrap">
                {/* To be repeated */}
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="basis-1/3 p-4 font-semibold text-center"
                  >
                    {skill?.skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Achievements & Activities */}
        <div className="flex flex-row justify-between items-start mx-12 mt-8 gap-8">
          {/* Achievements */}
          {achievements?.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center gap-x-4">
                <h1 className="text-2xl py-2">Achievements</h1>
                <div className="h-4 w-full bg-gray-300"></div>
              </div>
              {/* To be repeated */}
              {achievements.map((item, index) => (
                <>
                  <div key={index} className="flex flex-col py-2">
                    <div className="flex flex-row justify-between font-semibold">
                      <h1>{item?.achievement}</h1>
                      <p>{item?.period}</p>
                    </div>
                    <p className="text-justify mt-4">{item?.description}</p>
                    <Divider />
                  </div>
                </>
              ))}
            </div>
          )}

          {/* Activities */}
          {activities?.length > 0 && (
            <div className="flex-flex-col w-1/2">
              <div className="flex flex-row items-center gap-x-4">
                <h1 className="text-2xl py-2">Activities</h1>
                <div className="h-4 w-full bg-gray-300"></div>
              </div>
              <div className="flex flex-row pl-4 gap-4 flex-wrap">
                {/* To be repeated */}
                {activities.map((item, index) => (
                  <div
                    key={index}
                    className="w-1/4 p-4 font-semibold text-center"
                  >
                    {item?.activity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* End Container */}
      </div>
      {/* End Main */}
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

export default Template;
