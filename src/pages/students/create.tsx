import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Student = ({
  showCreateModal,
  setSuccess,
  successed,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/students"
        method="post"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "name",
            type: "string",
            required: true,
          },
          {
            name: "score",
          },
          {
            name: "ielts",
          },
          {
            name: "image",
          },
          {
            name: "image02",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["students"] });
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
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="name"
                type="text"
                placeholder={t("name")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="score"
                type="text"
                placeholder={t("score")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="ielts"
                type="text"
                placeholder={t("ielts")}
                size="large"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                rootClassName="mb-[40px]"
                name="image"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                rootClassName="mb-[40px]"
                name="image02"
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

export default Student;
