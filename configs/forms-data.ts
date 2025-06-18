export const loginFormControls: CommonFormTypes[] = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your Username",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
    required: true,
  },
];

export type CommonFormTypes = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: "input" | "textarea" | "select" | "checkbox" | "radiobutton";
  type?: string;
  required?: boolean;
};
