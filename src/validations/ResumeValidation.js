import * as yup from "yup";

export const ResumeValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name should contain at least 3 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name should be a least 3 characters long"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches("^[0-9]*$", "Phone number must contain only numbers")
    .min(7, "Phone Number cannot contain less than 7 digits")
    .max(15, "Phone Number cannot contain more than 15 digits"),
  countryCode: yup.string().required("Country Required"),
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches("^[A-Za-z0-9+_.-]+@(.+)$", "Invalid email format"),
  address: yup.string().required("Address is required"),
  profile: yup.string().required("Profile is required"),
  academic: yup
    .array()
    .of(
      yup.object().shape({
        school: yup.string().required("School is required"),
        degree: yup.string().required("Degree is required"),
        specialization: yup.string().required("Specialization is required"),
        period: yup.object().shape({
          start: yup.string().required("Start Date is required"),
          end: yup.string().required("End Date is required"),
        }),
        location: yup.string().required("Location is required"),
      })
    )
    .min(1, "1 Academic Achievement is required"),
  experience: yup
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required("Company is required"),
        position: yup.string().required("Position is required"),
        period: yup.object().shape({
          start: yup.string().required("Start Date is required"),
          end: yup.string().required("End Date is required"),
        }),
        location: yup.string().required("Location is required"),
        duties: yup.string().required("At least 1 duty is required"),
      })
    )
    .notRequired(),
  achievements: yup
    .array()
    .of(
      yup.object().shape({
        achievement: yup.string().required("Achievement is required"),
        period: yup.string().required("Period is required"),
        description: yup.string(),
      })
    )
    .notRequired(),
  languages: yup
    .array()
    .of(
      yup.object().shape({
        language: yup.string().required("Language is required"),
        level: yup.string().required("Level is required"),
      })
    )
    .min(1, "1 language is required"),
  skills: yup.array().of(
    yup.object().shape({
      skill: yup.string().required("Skill is required"),
    })
  ),
  activities: yup.array().of(
    yup.object().shape({
      activity: yup.string().required("Activity is required"),
    })
  ),
});
