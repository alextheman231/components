import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import z from "zod";

import { TextField } from "src/v7";
import createFormHook from "src/v7/hooks/createFormHook";

const meta: Meta = {
  title: "Form Hooks",
};

export default meta;
type Story = StoryObj;

interface DemoType {
  firstName: string;
  surname: string;
}

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
      defaultValues: { firstName: "", surname: "" },
      onSubmit: async ({ value }) => {
        setSubmitted(true);
        setData(value);
      },
      validators: {
        onChange: z.object({
          firstName: z.string(),
          surname: z.string(),
        }),
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
