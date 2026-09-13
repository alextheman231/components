import type { Meta, StoryObj } from "@storybook/react-vite";

import { az } from "@alextheman/utility";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import z from "zod";

import { TextField } from "src/form";
import createFormHook from "src/form/createFormHook";

const meta: Meta = {
  title: "Form Hooks",
};

export default meta;
type Story = StoryObj;

const formSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
  dateOfBirth: az.field(az.fieldDate()),
});

type DemoType = z.output<typeof formSchema>;

export const Form: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [data, setData] = useState<DemoType | null>(null);

    const { useAppForm } = createFormHook({
      fieldComponents: {
        CustomField: TextField,
      },
    });

    const form = useAppForm({
      defaultValues: { firstName: "", surname: "", dateOfBirth: "" },
      onSubmit: async ({ value }) => {
        setSubmitted(true);
        setData(az.with(formSchema).parse(value));
      },
      validators: {
        onChange: formSchema,
      },
    });

    if (!submitted) {
      return (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <form.AppField name="firstName">
                {(field) => {
                  return <field.TextField label="First name" />;
                }}
              </form.AppField>
              <form.AppField name="surname">
                {(field) => {
                  return <field.CustomField label="Surname" />;
                }}
              </form.AppField>
              <form.AppField name="dateOfBirth">
                {(field) => {
                  return <field.DateField fullWidth label="Date of birth" />;
                }}
              </form.AppField>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions>
            <form.AppForm>
              <form.SubmitButton />
            </form.AppForm>
          </CardActions>
        </form>
      );
    }

    return (
      <>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Button
          onClick={() => {
            form.reset();
            setSubmitted(false);
          }}
        >
          Return to form
        </Button>
      </>
    );
  },
};
