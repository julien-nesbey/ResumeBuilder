//Assets
import linkedin from "../assets/socials/linkedin.svg";
import github from "../assets/socials/github.svg";
import facebook from "../assets/socials/facebook.svg";
import instagram from "../assets/socials/instagram.svg";
import twitter from "../assets/socials/twitter.svg";
import youtube from "../assets/socials/youtube.svg";

const SocialChoice = ({ social, index }) => {
  let platform;
  switch (social.platform.toLowerCase()) {
    case "linkedin":
      platform = linkedin;
      break;
    case "github":
      platform = github;
      break;
    case "facebook":
      platform = facebook;
      break;
    case "instagram":
      platform = instagram;
      break;
    case "twitter":
      platform = twitter;
      break;
    case "youtube":
      platform = youtube;
      break;
  }
  return (
    <div key={index}>
      <img src={platform} alt={social} />
      <a href={social.link} target="_blank" className="text-zinc-800">
        {social.link}
      </a>
    </div>
  );
};

export default SocialChoice;
