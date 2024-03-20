import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Teacher = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();

  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/teachers/${get(selectedCard, "_id")}`}
        method="put"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "name",
            type: "string",
            value: get(selectedCard, "name"),
            required: true,
          },
          {
            name: "subject",
            type: "string",
            value: get(selectedCard, "subject"),
            required: true,
          },
          {
            name: "description",
            type: "string",
            value: get(selectedCard, "description"),
            required: true,
          },
          {
            name: "image",
            type: "string",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["teachers"] });
          showEditModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                component={Fields.Input}
                className="mb-3 w-full"
                name="name"
                type="text"
                placeholder="Teacher name"
                size="large"
              />
              <Field
                className="mb-3 w-full"
                component={Fields.Input}
                name="subject"
                type="text"
                placeholder="subject"
                size="large"
              />
              <Field
                className="mb-3 w-full"
                component={Fields.Input}
                name="description"
                type="text"
                placeholder="Description"
                size="large"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                className="mb-4"
                name="image"
              />
              <Button
                className="w-full border-0 h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                htmlType="submit"
              >
                Saqlash
              </Button>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Teacher;