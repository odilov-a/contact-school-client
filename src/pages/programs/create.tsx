import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Program = ({
  showCreateModal,
  setSuccess,
  successed,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/programs"
        method="post"
        fields={[
          {
            name: "title",
            type: "string",
            required: true,
          },
          {
            name: "description",
            type: "string",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["programs"] });
          setSuccess((prev: any) => !prev);
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                rootClassName="mb-[10px] w-[450px]"
                component={Fields.Input}
                name="title"
                type="text"
                placeholder={t("title")}
                size="large"
              />
              <Field
                rootClassName="mb-[10px] w-[450px]"
                component={Fields.Input}
                name="description"
                type="text"
                placeholder={t("description")}
                size="large"
              />
              <Button
                title="Saqlash"
                className="w-full mt-[20px]"
                htmlType="submit"
                size="large"
              />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Program;
