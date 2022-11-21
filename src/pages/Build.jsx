//React
import { useState, useEffect } from "react";

//Components
import Navbar from "../components/Navbar";
import TemplateSelection from "../components/TemplateSelection";

//Navigation
import { useNavigate } from "react-router-dom";

//Form
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";

//Form Validation
import { ResumeValidation } from "../validations/ResumeValidation";

//Context
import { useValuesContext } from "../context/ValuesContext";
import { useIdContext } from "../context/IdContext";

//DaisyUI
import { Input, InputGroup, Textarea, Divider, Button } from "react-daisyui";

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

  const {
    handleSubmit,
    register,
    control,
    formState,
    getValues,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(ResumeValidation),
  });

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
        <form onSubmit={handleSubmit(onSubmit)} name="resumeForm">
          {/* Personal Info */}
          <h1 className="text-3xl font-bold">Personal Info (Required)</h1>
          <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">First Name</span>
                <Input
                  className={`w-2/4 ${errors?.firstName && "border-error"}`}
                  {...register("firstName")}
                />
              </div>
              <small className="text-error">{errors?.firstName?.message}</small>
            </InputGroup>
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Last Name</span>
                <Input
                  className={`w-2/4 ${errors?.lastName && "border-error"}`}
                  {...register("lastName")}
                />
              </div>
              <small className="text-error">{errors?.lastName?.message}</small>
            </InputGroup>
          </div>

          <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Country</span>
                <select
                  className={`select w-2/4 border-2 ${
                    errors?.countryCode && "border-error"
                  }`}
                  {...register("countryCode")}
                >
                  <option value="">Select a country</option>
                  {countries.map((country, index) => {
                    let code = `+${country.callingCodes[0]}`;
                    return (
                      <option key={index} value={code}>
                        {country.name} - {code}
                      </option>
                    );
                  })}
                </select>
              </div>
              <small className="text-error">
                {errors?.countryCode?.message}
              </small>
            </InputGroup>
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Phone Number</span>
                <Input
                  type={"tel"}
                  className={`w-2/4 ${errors?.phone && "border-error"}`}
                  {...register("phone")}
                />
              </div>
              <small className="text-error">{errors?.phone?.message}</small>
            </InputGroup>
            {/* Country */}
          </div>

          <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Address</span>
                <Input
                  className={`w-2/4 ${errors?.address && "border-error"}`}
                  {...register("address")}
                />
              </div>
              <small className="text-error">{errors?.address?.message}</small>
            </InputGroup>
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Email Address</span>
                <Input
                  type={"email"}
                  className={`w-2/4 ${errors?.email && "border-error"}`}
                  {...register("email")}
                />
              </div>
              <small className="text-error">{errors?.email?.message}</small>
            </InputGroup>
          </div>

          <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Job Title</span>
                <Input
                  className={`w-2/4 ${errors?.jobTitle && "border-error"}`}
                  {...register("jobTitle")}
                />
              </div>
              <small className="text-error">{errors?.jobTitle?.message}</small>
            </InputGroup>
            <InputGroup className="hidden select-none sm:flex sm:invisible">
              <div className="flex flex-row">
                <span className="label-text">Job Title</span>
                <Input
                  className={`w-2/4 ${errors?.jobTitle && "border-error"}`}
                />
              </div>
              <small className="text-error">{errors?.jobTitle?.message}</small>
            </InputGroup>
          </div>

          <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
            <InputGroup className="flex flex-col">
              <div className="flex flex-row">
                <span className="label-text">Profile</span>
                <Textarea
                  spellCheck={false}
                  rows={3}
                  cols={150}
                  {...register("profile")}
                  className={`${errors?.profile && "border-error"} h-auto`}
                ></Textarea>
              </div>
              <small className="text-error">{errors?.profile?.message}</small>
            </InputGroup>
          </div>

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
                <div className="flex flex-col gap-4 my-4 sm:flex-row sm:justify-around">
                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="label-text">Platform</span>
                      <select
                        {...register(`socials.${index}.platform`)}
                        className={`select w-2/4 ${
                          errors?.socials != undefined &&
                          errors?.socials[index]?.platform &&
                          "border-error"
                        }`}
                      >
                        <option value="">Select a Social Platform</option>
                        {socials.map((social, idx) => (
                          <option key={idx} value={social}>
                            {social}
                          </option>
                        ))}
                      </select>
                    </div>
                    <small className="text-error">
                      {errors?.socials != undefined &&
                        errors?.socials[index]?.platform?.message}
                    </small>
                  </InputGroup>

                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="label label-text">Link</span>
                      <Input
                        {...register(`socials.${index}.link`)}
                        className={`w-2/4 ${
                          errors?.socials != undefined &&
                          errors?.socials[index]?.link &&
                          "border-error"
                        }`}
                      />
                    </div>
                    <small className="text-error">
                      {errors?.socials != undefined &&
                        errors?.socials[index]?.link?.message}
                    </small>
                  </InputGroup>
                </div>
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
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">School Name</span>
                    <Input
                      {...register(`academic.${index}.school`)}
                      className={`w-2/4 ${
                        errors?.academic != undefined &&
                        errors?.academic[index]?.school &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.academic != undefined &&
                      errors?.academic[index]?.school?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Degree</span>
                    <Input
                      {...register(`academic.${index}.degree`)}
                      className={`w-2/4 ${
                        errors?.academic != undefined &&
                        errors?.academic[index]?.degree &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.academic != undefined &&
                      errors?.academic[index]?.degree?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Specialization</span>
                    <Input
                      {...register(`academic.${index}.specialization`)}
                      className={`w-2/4 ${
                        errors?.academic != undefined &&
                        errors?.academic[index]?.specialization &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.academic != undefined &&
                      errors?.academic[index]?.specialization?.message}
                  </small>
                </InputGroup>
                <div className="flex flex-col gap-4 my-4">
                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="label-text">From</span>
                      <Input
                        type={"month"}
                        {...register(`academic.${index}.period.start`)}
                        className={`${
                          errors?.academic != undefined &&
                          errors?.academic[index]?.period?.start &&
                          "border-error"
                        }`}
                      />
                    </div>
                    <small className="text-error">
                      {errors.academic != undefined &&
                        errors?.academic[index]?.period?.start?.message}
                    </small>
                  </InputGroup>
                  {!getValues()?.academic[index]?.period?.present ? (
                    <InputGroup className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="label-text">To</span>
                        <Input
                          type={"month"}
                          {...register(`academic.${index}.period.end`)}
                          className={`${
                            errors?.academic != undefined &&
                            errors?.academic[index]?.period?.end &&
                            "border-error"
                          }`}
                        />
                      </div>
                      <small className="text-error">
                        {errors.academic != undefined &&
                          errors?.academic[index]?.period?.end?.message}
                      </small>
                    </InputGroup>
                  ) : null}

                  {/* Present */}
                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="label-text">Present</span>
                      <Input
                        type={"checkbox"}
                        {...register(`academic.${index}.period.present`)}
                        className="checkbox"
                      />
                    </div>
                  </InputGroup>
                </div>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Location</span>
                    <Input
                      {...register(`academic.${index}.location`)}
                      className={`w-2/4 ${
                        errors?.academic != undefined &&
                        errors?.academic[index]?.location &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.academic != undefined &&
                      errors?.academic[index]?.location?.message}
                  </small>
                </InputGroup>
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
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Company Name</span>
                    <Input
                      {...register(`experience.${index}.company`)}
                      className={`w-2/4 ${
                        errors?.experience != undefined &&
                        errors?.experience[index]?.company &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.experience != undefined &&
                      errors?.experience[index]?.company?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Position</span>
                    <Input
                      {...register(`experience.${index}.position`)}
                      className={`w-2/4 ${
                        errors?.experience != undefined &&
                        errors?.experience[index]?.position &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.experience != undefined &&
                      errors?.experience[index]?.position?.message}
                  </small>
                </InputGroup>
                <div className="flex flex-col gap-4 my-4">
                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="label-text">From</span>
                      <Input
                        type={"month"}
                        {...register(`experience.${index}.period.start`)}
                        className={`${
                          errors?.experience != undefined &&
                          errors?.experience[index]?.period?.start &&
                          "border-error"
                        }`}
                      />
                    </div>
                    <small className="text-error">
                      {errors.experience != undefined &&
                        errors?.experience[index]?.period?.start?.message}
                    </small>
                  </InputGroup>
                  {!getValues()?.experience[index]?.period?.present ? (
                    <InputGroup className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="label-text">To</span>
                        <Input
                          type={"month"}
                          {...register(`experience.${index}.period.end`)}
                          className={`${
                            errors?.experience != undefined &&
                            errors?.experience[index]?.period?.end &&
                            "border-error"
                          }`}
                        />
                      </div>
                      <small className="text-error">
                        {errors.experience != undefined &&
                          errors?.experience[index]?.period?.end?.message}
                      </small>
                    </InputGroup>
                  ) : null}

                  {/* Present */}
                  <InputGroup className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="label-text">Present</span>
                      <Input
                        type={"checkbox"}
                        {...register(`experience.${index}.period.present`)}
                        className="checkbox"
                      />
                    </div>
                  </InputGroup>
                </div>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Location</span>
                    <Input
                      {...register(`experience.${index}.location`)}
                      className={`w-2/4 ${
                        errors?.experience != undefined &&
                        errors?.experience[index]?.location &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.experience != undefined &&
                      errors?.experience[index]?.location?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Main Duties</span>
                    <Textarea
                      rows={3}
                      cols={100}
                      placeholder="Separate with commas (,)"
                      {...register(`experience.${index}.duties`)}
                      className={`${
                        errors?.experience != undefined &&
                        errors?.experience[index]?.duties &&
                        "border-error"
                      }`}
                    ></Textarea>
                  </div>
                  <small className="text-error">
                    {errors.experience != undefined &&
                      errors?.experience[index]?.duties?.message}
                  </small>
                </InputGroup>
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
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Achievement Name</span>
                    <Input
                      {...register(`achievements.${index}.achievement`)}
                      className={`w-2/4 ${
                        errors?.achievements != undefined &&
                        errors?.achievements[index]?.achievement &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.achievements != undefined &&
                      errors?.achievements[index]?.achievement?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Period</span>
                    <Input
                      type={"month"}
                      {...register(`achievements.${index}.period`)}
                      className={`w-2/4 ${
                        errors?.achievements != undefined &&
                        errors?.achievements[index]?.period &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.achievements != undefined &&
                      errors?.achievements[index]?.period?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Description (Optional)</span>
                    <Textarea
                      cols={100}
                      rows={3}
                      {...register(`achievements.${index}.description`)}
                    ></Textarea>
                  </div>
                </InputGroup>
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
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Language</span>
                    <Input
                      {...register(`languages.${index}.language`)}
                      className={`w-2/4 ${
                        errors?.languages != undefined &&
                        errors?.languages[index]?.language &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.languages != undefined &&
                      errors?.languages[index]?.language?.message}
                  </small>
                </InputGroup>
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-2/4 justify-center items-center">
                      <Input
                        type={"radio"}
                        value="Beginner"
                        {...register(`languages.${index}.level`)}
                        className="w-3/12 accent-black outline-hidden"
                      />
                      <small
                        className={`text-lg font-semibold ${
                          errors.languages != undefined &&
                          errors.languages[index]?.level &&
                          "text-error"
                        }`}
                      >
                        Beginner
                      </small>
                    </div>
                    <div className="flex flex-col w-2/4 justify-center items-center">
                      <Input
                        type={"radio"}
                        value="Intermediate"
                        {...register(`languages.${index}.level`)}
                        className="w-3/12 accent-black"
                      />
                      <small
                        className={`text-lg font-semibold ${
                          errors.languages != undefined &&
                          errors.languages[index]?.level &&
                          "text-error"
                        }`}
                      >
                        Intermediate
                      </small>
                    </div>
                    <div className="flex flex-col w-2/4 justify-center items-center">
                      <Input
                        type={"radio"}
                        value="Advanced"
                        {...register(`languages.${index}.level`)}
                        className="w-3/12 outline-error accent-black"
                      />
                      <small
                        className={`text-lg font-semibold ${
                          errors.languages != undefined &&
                          errors.languages[index]?.level &&
                          "text-error"
                        }`}
                      >
                        Advanced
                      </small>
                    </div>
                    <div className="flex flex-col w-2/4 justify-center items-center">
                      <Input
                        type={"radio"}
                        value="Native"
                        {...register(`languages.${index}.level`)}
                        className="w-3/12 accent-black"
                      />
                      <small
                        className={`text-lg font-semibold ${
                          errors.languages != undefined &&
                          errors.languages[index]?.level &&
                          "text-error"
                        }`}
                      >
                        Native
                      </small>
                    </div>
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
                <InputGroup className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="label-text">Skill</span>
                    <Input
                      {...register(`skills.${index}.skill`)}
                      className={`w-2/4 ${
                        errors?.skills != undefined &&
                        errors?.skills[index]?.skill &&
                        "border-error"
                      }`}
                    />
                  </div>
                  <small className="text-error">
                    {errors.skills != undefined &&
                      errors?.skills[index]?.skill?.message}
                  </small>
                </InputGroup>
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
        error={templateError}
      />
    </>
  );
};

export default Build;
