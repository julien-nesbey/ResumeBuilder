import React from "react";

import { Modal, Button } from "react-daisyui";

//Template API
import { templatesApi } from "../../api/templatesApi";

const TemplateSelection = (props) => {
  const {
    isOpen,
    handleTemplate,
    handleButtonClick,
    onClickBackdrop,
    closeModal,
    error,
    ...other
  } = props;
  return (
    <div data-theme="fantasy" className="select-none">
      <Modal open={isOpen} onClickBackdrop={onClickBackdrop} {...other}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </Button>
        <Modal.Header className="text-center">
          <h1>Please choose your preferred template.</h1>
          {error ? (
            <small className="text-error py-2">A template is required!</small>
          ) : null}
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row justify-center flex-wrap gap-4">
            {templatesApi.map((temp) => (
              <img
                tabIndex="1"
                src={temp.url}
                alt={temp.name}
                title={temp.name}
                key={temp.id}
                className="w-2/6 flex-1 focus:border-4 focus:border-primary"
                onClick={() => handleTemplate(temp.id)}
              />
            ))}
          </div>
          <Button onClick={handleButtonClick} className="w-full mt-10">
            Preview CV
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TemplateSelection;
