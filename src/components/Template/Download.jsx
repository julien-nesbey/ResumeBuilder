//PDF
import ReactToPdf from "react-to-pdf";

//DaisyUI
import { Button } from "react-daisyui";

export const DownloadPDF = (props) => {
  const { template, firstName, lastName, ...other } = props;
  return (
    <ReactToPdf
      targetRef={template}
      filename={`${firstName} ${lastName}'s CV`}
      scale={0.9}
    >
      {({ toPdf }) => (
        <Button onClick={toPdf} className="mx-auto" color="primary" {...other}>
          Download
        </Button>
      )}
    </ReactToPdf>
  );
};
