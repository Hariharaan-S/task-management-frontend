import {FormInputLabel, Input, Group} from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherOptions }) => {
  return (
    <Group>
      <Input className="form-input" {...otherOptions} />
      {label && (
        <FormInputLabel
          shrink = {otherOptions.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
