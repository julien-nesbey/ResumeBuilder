//React
import { useState, useEffect } from "react";

//Components
import Navbar from "../components/Navbar";
import TemplateSelection from "../components/Template/TemplateSelection";
import {
  GroupInputText,
  GroupInputTextArea,
  GroupInputSelect,
  GroupInputRadio,
} from "../components/Build/GroupInput";
import { GroupFormPersonalInfo } from "../components/Build/GroupForm";

//Navigation
import { useNavigate } from "react-router-dom";

//Form
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";

//Form Validation
import { ResumeValidation } from "../validations/ResumeValidation";

//Context
import { useValuesContext } from "../context/ValuesContext";
import { useIdContext } from "../context/IdContext";

//DaisyUI
import { InputGroup, Divider, Button } from "react-daisyui";

//API
import { countries } from "../api/api";
import { socials } from "../api/socials";

const Build = () => {
  const navigate = useNavigate();
  const { addValues } = useValuesContext();
  const { getId } = useIdContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  const [templateError, setTemplateError] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setTemplateError(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [templateError]);

  const methods = useForm({
    resolver: yupResolver(ResumeValidation),
  });

  const { register, control, formState, getValues, watch, setValue } = methods;

  const { errors } = formState;

  const {
    fields: SocialFields,
    insert: SocialInsert,
    remove: SocialRemove,
  } = useFieldArray({
    control,
    name: "socials",
  });
  const {
    fields: AcademicFields,
    insert: AcademicInsert,
    remove: AcademicRemove,
  } = useFieldArray({
    control,
    name: "academic",
  });
  const {
    fields: ExperienceFields,
    insert: ExperienceInsert,
    remove: ExperienceRemove,
  } = useFieldArray({
    control,
    name: "experience",
  });
  const {
    fields: AchievementsFields,
    insert: AchievementsInsert,
    remove: AchievementsRemove,
  } = useFieldArray({
    control,
    name: "achievements",
  });
  const {
    fields: LanguageFields,
    insert: LanguageInsert,
    remove: LanguageRemove,
  } = useFieldArray({
    control,
    name: "languages",
  });
  const {
    fields: SkillsFields,
    insert: SkillsInsert,
    remove: SkillsRemove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  useFormPersist("resumeForm", { watch, setValue });

  const onSubmit = async (values) => {
    if (template == null) {
      setTemplateError(true);
      return;
    }
    await addValues({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      countryCode: values.countryCode,
      phone: values.phone,
      address: values.address,
      jobTitle: values.jobTitle,
      profile: values.profile,
      socials: values.socials,
      academic: values.academic,
      experience: values.experience,
      achievements: values.achievements,
      languages: values.languages,
      skills: values.skills,
      activities: values.activities,
    });
    navigate(`/preview/${getId()}/${template}`);
  };

  return (
    <>
      <div id="build-root" className="px-2 mx-auto overflow-hidden">
        <Navbar />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} name="resumeForm">
            {/* Personal Info */}
            <h1 className="text-3xl font-bold">Personal Info (Required)</h1>
            <GroupFormPersonalInfo title={"Personal Info (Required)"}>
              <GroupInputText
                title={"First Name"}
                error={errors.firstName}
                field={"firstName"}
              />

              <GroupInputText
                title={"Last Name"}
                error={errors.lastName}
                field={"lastName"}
              />
            </GroupFormPersonalInfo>

            <GroupFormPersonalInfo>
              <GroupInputSelect
                title={"Country"}
                field="countryCode"
                array={countries}
                error={errors?.countryCode}
                children={countries.map((country, index) => {
                  let code = `+${country.callingCodes[0]}`;
                  return (
                    <option key={index} value={code}>
                      {country.name} - {code}
                    </option>
                  );
                })}
              />

              <GroupInputText
                field={"phone"}
                title={"Phone Number"}
                error={errors?.phone}
                type={"tel"}
              />
              {/* Country */}
            </GroupFormPersonalInfo>

            <GroupFormPersonalInfo>
              <GroupInputText
                title={"Address"}
                error={errors.address}
                field={"address"}
              />

              <GroupInputText
                title={"Email Address"}
                error={errors?.email}
                field="email"
                type="email"
              />
            </GroupFormPersonalInfo>

            <GroupFormPersonalInfo>
              <GroupInputText
                title={"Job Title"}
                field="jobTitle"
                error={errors.jobTitle}
              />

              <GroupInputText
                title={"Profile Picture"}
                error={errors.profilePicture}
                field={"profilePicture"}
              />
            </GroupFormPersonalInfo>

            <GroupFormPersonalInfo>
              <GroupInputTextArea
                title={"Profile"}
                field="profile"
                error={errors.profile}
                cols={155}
                rows={3}
              />
            </GroupFormPersonalInfo>

            <Divider />

            {/* Socials */}
            <h1 className="text-3xl font-bold">Socials (Optional)</h1>
            <div className="flex flex-col my-8 h-full gap-8">
              {SocialFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col flex-1 h-20 w-full gap-4"
                >
                  <p className="mb-4">
                    <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                      Social #{index + 1}
                    </span>
                    <span
                      onClick={() => SocialRemove(index)}
                      className="text-lg font-semibold hover:cursor-pointer"
                    >
                      X
                    </span>
                  </p>
                  <GroupFormPersonalInfo>
                    <GroupInputSelect
                      title={"Platform"}
                      error={
                        errors?.socials != undefined &&
                        errors?.socials[index]?.platform
                      }
                      field={`socials.${index}.platform`}
                      children={socials.map((social, idx) => (
                        <option key={idx} value={social}>
                          {social}
                        </option>
                      ))}
                    />

                    <GroupInputText
                      title={"Link"}
                      error={
                        errors?.socials != undefined &&
                        errors?.socials[index]?.link
                      }
                      field={`socials.${index}.link`}
                    />
                  </GroupFormPersonalInfo>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => SocialInsert(getValues().socials.length)}
              >
                Add Social
              </Button>
            </div>

            <Divider />

            {/* Academic Achievments */}
            <h1 className="text-3xl font-bold">
              Academic Achievements (Required)
            </h1>
            <div className="flex flex-col my-8 h-full gap-8">
              {AcademicFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col flex-1 h-20 w-full gap-4"
                >
                  <p className="mb-4">
                    <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                      Degree #{index + 1}
                    </span>
                    {index >= 1 && (
                      <span
                        onClick={() => AcademicRemove(index)}
                        className="text-lg font-semibold hover:cursor-pointer"
                      >
                        X
                      </span>
                    )}
                  </p>

                  <GroupInputText
                    title={"School Name"}
                    field={`academic.${index}.school`}
                    error={
                      errors?.academic != undefined &&
                      errors?.academic[index]?.school
                    }
                  />

                  <GroupInputText
                    title={"Degree"}
                    field={`academic.${index}.degree`}
                    error={
                      errors?.academic != undefined &&
                      errors?.academic[index]?.degree
                    }
                  />

                  <GroupInputText
                    title={"Specialization"}
                    field={`academic.${index}.specialization`}
                    error={
                      errors?.academic != undefined &&
                      errors?.academic[index]?.specialization
                    }
                  />

                  <div className="flex flex-col gap-4 my-4">
                    <GroupInputText
                      title={"From"}
                      type="month"
                      field={`academic.${index}.period.start`}
                      error={
                        errors?.academic != undefined &&
                        errors?.academic[index]?.period?.start
                      }
                    />

                    {!getValues()?.academic[index]?.period?.present ? (
                      <GroupInputText
                        title={"To"}
                        type="month"
                        field={`academic.${index}.period.end`}
                        error={
                          errors?.academic != undefined &&
                          errors?.academic[index]?.period?.end
                        }
                      />
                    ) : null}

                    <GroupInputText
                      title={"Present"}
                      type="checkbox"
                      field={`academic.${index}.period.present`}
                      error={
                        errors?.academic != undefined &&
                        errors?.academic[index]?.period?.present
                      }
                    />
                  </div>
                  <GroupInputText
                    title={"Location"}
                    field={`academic.${index}.location`}
                    error={
                      errors?.academic != undefined &&
                      errors?.academic[index]?.location
                    }
                  />
                  <Divider />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => AcademicInsert(getValues().academic.length)}
              >
                Add Degree
              </Button>
            </div>

            <Divider />

            {/* Professional Experience */}
            <h1 className="text-3xl font-bold">
              Professional Experience (Optional)
            </h1>
            <div className="flex flex-col my-8 h-full gap-8">
              {ExperienceFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col flex-1 h-20 w-full gap-4"
                >
                  <p className="mb-4">
                    <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                      Experience #{index + 1}
                    </span>
                    <span
                      onClick={() => ExperienceRemove(index)}
                      className="text-lg font-semibold hover:cursor-pointer"
                    >
                      X
                    </span>
                  </p>
                  <GroupInputText
                    title={"Company Name"}
                    field={`experience.${index}.company`}
                    error={
                      errors?.experience != undefined &&
                      errors?.experience[index]?.company
                    }
                  />

                  <GroupInputText
                    title={"Position"}
                    field={`experience.${index}.position`}
                    error={
                      errors?.experience != undefined &&
                      errors?.experience[index]?.position
                    }
                  />

                  <div className="flex flex-col gap-4 my-4">
                    <GroupInputText
                      title={"From"}
                      type="month"
                      field={`experience.${index}.period.start`}
                      error={
                        errors?.experience != undefined &&
                        errors?.experience[index]?.period?.start
                      }
                    />

                    {!getValues()?.experience[index]?.period?.present ? (
                      <GroupInputText
                        title={"To"}
                        type="month"
                        field={`experience.${index}.period.end`}
                        error={
                          errors?.experience != undefined &&
                          errors?.experience[index]?.period?.end
                        }
                      />
                    ) : null}

                    {/* Present */}
                    <GroupInputText
                      title={"Present"}
                      type="checkbox"
                      field={`experience.${index}.period.present`}
                      error={
                        errors?.experience != undefined &&
                        errors?.experience[index]?.period?.present
                      }
                    />
                  </div>

                  <GroupInputText
                    title={"Location"}
                    field={`experience.${index}.location`}
                    error={
                      errors?.experience != undefined &&
                      errors?.experience[index]?.location
                    }
                  />

                  <GroupInputTextArea
                    title={"Main Duties"}
                    field={`experience.${index}.duties`}
                    rows={3}
                    cols={100}
                    placeholder="Separate duties with commas (,)"
                    error={
                      errors?.experience != undefined &&
                      errors?.experience[index]?.duties
                    }
                  />

                  <Divider />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => ExperienceInsert(getValues().experience.length)}
              >
                Add Experience
              </Button>
            </div>

            <Divider />

            {/* Achievements */}
            <h1 className="text-3xl font-bold">Achievements (Optional)</h1>
            <div className="flex flex-col my-8 h-full gap-8">
              {AchievementsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col flex-1 h-20 w-full gap-4"
                >
                  <p className="mb-4">
                    <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                      Achievement #{index + 1}
                    </span>
                    <span
                      onClick={() => AchievementsRemove(index)}
                      className="text-lg font-semibold hover:cursor-pointer"
                    >
                      X
                    </span>
                  </p>
                  <GroupInputText
                    title={"Achievement Name"}
                    field={`achievements.${index}.achievement`}
                    error={
                      errors?.achievements != undefined &&
                      errors?.achievements[index]?.achievement
                    }
                  />

                  <GroupInputText
                    title={"Period"}
                    type={"month"}
                    field={`achievements.${index}.period`}
                    error={
                      errors?.achievements != undefined &&
                      errors?.achievements[index]?.period
                    }
                  />

                  <GroupInputTextArea
                    title={"Description (Optional)"}
                    field={`achievements.${index}.description`}
                    placeholder="Describe your achievement in a simplified way."
                    rows={3}
                    cols={100}
                  />

                  <Divider />
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  AchievementsInsert(getValues().achievements.length)
                }
              >
                Add Achievement
              </Button>
            </div>

            <Divider />

            {/* Languages */}
            <h1 className="text-3xl font-bold">Languages (Required)</h1>
            <div className="flex flex-col my-8 h-full gap-8">
              {LanguageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col flex-1 h-20 w-full gap-4"
                >
                  <p className="mb-4">
                    <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                      Language #{index + 1}
                    </span>
                    {index >= 1 && (
                      <span
                        onClick={() => LanguageRemove(index)}
                        className="text-lg font-semibold hover:cursor-pointer"
                      >
                        X
                      </span>
                    )}
                  </p>
                  <GroupInputText
                    title={"Language"}
                    field={`languages.${index}.language`}
                    error={
                      errors?.languages != undefined &&
                      errors?.languages[index]?.language
                    }
                  />
                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row w-full">
                      <GroupInputRadio
                        title={"Beginner"}
                        field={`languages.${index}.level`}
                        value={"Beginner"}
                        error={
                          errors?.languages != undefined &&
                          errors?.languages[index]?.level
                        }
                      />

                      <GroupInputRadio
                        title={"Intermediate"}
                        field={`languages.${index}.level`}
                        value={"Intermediate"}
                        error={
                          errors?.languages != undefined &&
                          errors?.languages[index]?.level
                        }
                      />
                      <GroupInputRadio
                        title={"Advanced"}
                        field={`languages.${index}.level`}
                        value={"Advanced"}
                        error={
                          errors?.languages != undefined &&
                          errors?.languages[index]?.level
                        }
                      />
                      <GroupInputRadio
                        title={"Native"}
                        field={`languages.${index}.level`}
                        value={"Native"}
                        error={
                          errors?.languages != undefined &&
                          errors?.languages[index]?.level
                        }
                      />
                    </div>
                  </InputGroup>
                  <Divider />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => LanguageInsert(getValues().languages.length)}
              >
                Add Language
              </Button>
            </div>

            <Divider />

            {/* Skills */}
            <h1 className="text-3xl font-bold">Skills (Required)</h1>
            <div className="flex flex-col my-8 h-full gap-8">
              {SkillsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col flex-1 h-20 w-full gap-4"
                >
                  <p className="mb-4">
                    <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                      Skill #{index + 1}
                    </span>
                    {index >= 1 && (
                      <span
                        onClick={() => SkillsRemove(index)}
                        className="text-lg font-semibold hover:cursor-pointer"
                      >
                        X
                      </span>
                    )}
                  </p>
                  <GroupInputText
                    title={"Skill"}
                    field={`skills.${index}.skill`}
                    error={
                      errors?.skills != undefined &&
                      errors?.skills[index]?.skill
                    }
                  />
                  <Divider />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => SkillsInsert(getValues().skills.length)}
              >
                Add Skill
              </Button>
            </div>

            <Button type="submit" className="hidden" id="submit-btn" />
          </form>
        </FormProvider>
        <div className="flex flex-row justify-center items-center">
          <Button
            type="button"
            color="primary"
            size="lg"
            className="mx-4"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            Select Template
          </Button>
        </div>
      </div>
      <TemplateSelection
        isOpen={modalOpen}
        className="bg-secondary"
        handleButtonClick={() => document.getElementById("submit-btn").click()}
        handleTemplate={(id) => setTemplate(id)}
        onClickBackdrop={() => setModalOpen(false)}
        closeModal={() => setModalOpen(false)}
        error={templateError}
      />
    </>
  );
};

export default Build;
