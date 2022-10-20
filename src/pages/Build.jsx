//Components
import Navbar from "../components/Navbar";

//Navigation
import { useNavigate } from "react-router-dom";

//Form
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";

//Form Validation
import { ResumeValidation } from "../validations/ResumeValidation";

//DaisyUI
import { Input, InputGroup, Textarea, Divider, Button } from "react-daisyui";

//API
import { countries } from "../api";

const Build = () => {
  const navigate = useNavigate();

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
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      academic: [
        {
          school: "",
          degree: "",
          specialization: "",
          period: {
            start: "",
            end: "",
          },
          location: "",
        },
      ],
      languages: [
        {
          language: "",
          level: "",
        },
      ],
    },
  });

  const { errors } = formState;

  useFormPersist("resumeForm", { watch, setValue });

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
  const {
    fields: ActivitiesFields,
    insert: ActivitiesInsert,
    remove: ActivitiesRemove,
  } = useFieldArray({
    control,
    name: "activities",
  });

  const onSubmit = (values) => {
    navigate("/preview", {
      state: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        countryCode: values.countryCode,
        phone: values.phone,
        address: values.address,
        profile: values.profile,
        academic: values.academic,
        experience: values.experience,
        achievements: values.achievements,
        languages: values.languages,
        skills: values.skills,
        activities: values.activities,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto h-screen" data-theme="dark">
        <form onSubmit={handleSubmit(onSubmit)} name="resumeForm">
          {/* Personal Info */}
          <h1 className="text-3xl font-bold">Personal Info (Required)</h1>
          <div className="flex justify-around mb-4">
            <InputGroup>
              <span className="label-text">First Name</span>
              <Input
                className={`w-2/4 ${errors?.firstName && "border-error"}`}
                {...register("firstName")}
              />
              {errors?.firstName?.message}
            </InputGroup>
            <InputGroup>
              <span className="label-text">Last Name</span>
              <Input
                className={`w-2/4 ${errors?.lastName && "border-error"}`}
                {...register("lastName")}
              />
              {errors?.lastName?.message}
            </InputGroup>
          </div>

          <div className="flex justify-around mb-4">
            <InputGroup>
              <span className="label-text">Country</span>
              <select
                className={`select w-2/4 border-2 ${
                  errors?.countryCode && "border-error"
                }`}
                {...register("countryCode")}
              >
                <option value="" selected>
                  Select a country
                </option>
                {countries.map((country, index) => {
                  let code = `+${country.callingCodes[0]}`;
                  return (
                    <option key={index} value={code}>
                      {country.name} - {code}
                    </option>
                  );
                })}
              </select>
              {errors?.countryCode?.message}
            </InputGroup>
            <InputGroup>
              <span className="label-text">Phone Number</span>
              <Input
                className={`w-2/4 ${errors?.phone && "border-error"}`}
                {...register("phone")}
              />
              {errors?.phone?.message}
            </InputGroup>
            {/* Country */}
          </div>

          <div className="flex justify-around mb-4">
            <InputGroup>
              <span className="label-text">Address</span>
              <Input
                className={`w-2/4 ${errors?.address && "border-error"}`}
                {...register("address")}
              />
              {errors?.address?.message}
            </InputGroup>
            <InputGroup>
              <span className="label-text">Email Address</span>
              <Input
                className={`w-2/4 ${errors?.email && "border-error"}`}
                {...register("email")}
              />
              {errors?.email?.message}
            </InputGroup>
          </div>
          <div className="flex justify-around mb-4">
            <InputGroup>
              <span className="label-text">Profile</span>
              <Textarea
                rows={2}
                cols={150}
                {...register("profile")}
                className={`${errors?.profile && "border-error"}`}
              ></Textarea>
              {errors?.profile?.message}
            </InputGroup>
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
                className="flex flex-col flex-1 h-20 w-full gap-2"
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
                <InputGroup>
                  <span className="label-text">School Name</span>
                  <Input
                    {...register(`academic.${index}.school`)}
                    className="w-2/4"
                  />
                  {errors.academic != undefined &&
                    errors?.academic[index]?.school?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Degree</span>
                  <Input
                    {...register(`academic.${index}.degree`)}
                    className="w-2/4"
                  />
                  {errors.academic != undefined &&
                    errors?.academic[index]?.degree?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Specialization</span>
                  <Input
                    {...register(`academic.${index}.specialization`)}
                    className="w-2/4"
                  />
                  {errors.academic != undefined &&
                    errors?.academic[index]?.specialization?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">From</span>
                  <Input
                    type={"month"}
                    {...register(`academic.${index}.period.start`)}
                  />
                  {errors.academic != undefined &&
                    errors?.academic[index]?.period?.start?.message}
                  <span className="label-text">To</span>
                  <Input
                    type={"month"}
                    {...register(`academic.${index}.period.end`)}
                  />
                  {errors.academic != undefined &&
                    errors?.academic[index]?.period?.end?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Location</span>
                  <Input
                    {...register(`academic.${index}.location`)}
                    className="w-2/4"
                  />
                  {errors.academic != undefined &&
                    errors?.academic[index]?.location?.message}
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
                className="flex flex-col flex-1 h-20 w-full gap-2"
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
                <InputGroup>
                  <span className="label-text">Company Name</span>
                  <Input
                    {...register(`experience.${index}.company`)}
                    className="w-2/4"
                  />
                  {errors.experience != undefined &&
                    errors?.experience[index]?.company?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Position</span>
                  <Input
                    {...register(`experience.${index}.position`)}
                    className="w-2/4"
                  />
                  {errors.experience != undefined &&
                    errors?.experience[index]?.position?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">From</span>
                  <Input
                    type={"month"}
                    {...register(`experience.${index}.period.start`)}
                  />
                  {errors.experience != undefined &&
                    errors?.experience[index]?.period?.start?.message}
                  <span className="label-text">To</span>
                  <Input
                    type={"month"}
                    {...register(`experience.${index}.period.end`)}
                  />
                  {errors.experience != undefined &&
                    errors?.experience[index]?.period?.end?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Location</span>
                  <Input
                    {...register(`experience.${index}.location`)}
                    className="w-2/4"
                  />
                  {errors.experience != undefined &&
                    errors?.experience[index]?.location?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Main Duties</span>
                  <Textarea
                    rows={3}
                    cols={100}
                    placeholder="Separate with commas (,)"
                    {...register(`experience.${index}.duties`)}
                  ></Textarea>
                  {errors.experience != undefined &&
                    errors?.experience[index]?.duties?.message}
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
                className="flex flex-col flex-1 h-20 w-full gap-2"
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
                <InputGroup>
                  <span className="label-text">Achievement Name</span>
                  <Input
                    {...register(`achievements.${index}.achievement`)}
                    className="w-2/4"
                  />
                  {errors.achievements != undefined &&
                    errors?.achievements[index]?.achievement?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Period</span>
                  <Input
                    type={"month"}
                    {...register(`achievements.${index}.period`)}
                    className="w-2/4"
                  />
                  {errors.achievements != undefined &&
                    errors?.achievements[index]?.period?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Description (Optional)</span>
                  <Textarea
                    cols={100}
                    rows={3}
                    {...register(`achievements.${index}.description`)}
                  ></Textarea>
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
                className="flex flex-col flex-1 h-20 w-full gap-2"
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
                <InputGroup>
                  <span className="label-text">Language Name</span>
                  <Input
                    {...register(`languages.${index}.language`)}
                    className="w-2/4"
                  />
                  {errors.languages != undefined &&
                    errors?.languages[index]?.language?.message}
                </InputGroup>
                <InputGroup>
                  <span className="label-text">Level</span>
                  <div className="flex flex-col w-2/4 justify-center items-center">
                    <Input
                      type={"radio"}
                      value="25"
                      {...register(`languages.${index}.level`)}
                      className="w-2/4"
                    />
                    <small className="text-lg font-semibold">Beginner</small>
                  </div>
                  <div className="flex flex-col w-2/4 justify-center items-center">
                    <Input
                      type={"radio"}
                      value="50"
                      {...register(`languages.${index}.level`)}
                      className="w-2/4"
                    />
                    <small className="text-lg font-semibold">
                      Intermediate
                    </small>
                  </div>
                  <div className="flex flex-col w-2/4 justify-center items-center">
                    <Input
                      type={"radio"}
                      value="75"
                      {...register(`languages.${index}.level`)}
                      className="w-2/4"
                    />
                    <small className="text-lg font-semibold">Advanced</small>
                  </div>
                  <div className="flex flex-col w-2/4 justify-center items-center">
                    <Input
                      type={"radio"}
                      value="100"
                      {...register(`languages.${index}.level`)}
                      className="w-2/4"
                    />
                    <small className="text-lg font-semibold">Native</small>
                  </div>
                  {errors.languages != undefined &&
                    errors?.languages[index]?.level?.message}
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
          <h1 className="text-3xl font-bold">Skills (Optional)</h1>
          <div className="flex flex-col my-8 h-full gap-8">
            {SkillsFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col flex-1 h-20 w-full gap-2"
              >
                <p className="mb-4">
                  <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                    Skill #{index + 1}
                  </span>
                  <span
                    onClick={() => SkillsRemove(index)}
                    className="text-lg font-semibold hover:cursor-pointer"
                  >
                    X
                  </span>
                </p>
                <InputGroup>
                  <span className="label-text">Skill</span>
                  <Input
                    {...register(`skills.${index}.skill`)}
                    className="w-2/4"
                  />
                  {errors.skills != undefined &&
                    errors?.skills[index]?.skill?.message}
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

          <Divider />

          {/* Activities */}
          <h1 className="text-3xl font-bold">Activities (Optional)</h1>
          <div className="flex flex-col my-8 h-full gap-8">
            {ActivitiesFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col flex-1 h-20 w-full gap-2"
              >
                <p className="mb-4">
                  <span className="bg-primary w-fit p-4 rounded-lg text-lg font-semibold mr-4">
                    Activity #{index + 1}
                  </span>
                  <span
                    onClick={() => ActivitiesRemove(index)}
                    className="text-lg font-semibold hover:cursor-pointer"
                  >
                    X
                  </span>
                </p>
                <InputGroup>
                  <span className="label-text">Activity Name</span>
                  <Input
                    {...register(`activities.${index}.activity`)}
                    className="w-2/4"
                  />
                  {errors.activities != undefined &&
                    errors?.activities[index]?.activity?.message}
                </InputGroup>
                <Divider />
              </div>
            ))}
            <Button
              type="button"
              onClick={() => ActivitiesInsert(getValues().activities.length)}
            >
              Add Activity
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
            onClick={() => document.getElementById("submit-btn").click()}
          >
            Preview CV
          </Button>
        </div>
      </div>
    </>
  );
};

export default Build;
