import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Vacancy = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/vacancies/${get(selectedCard, "_id")}`}
        method="put"
        fields={[
          {
            name: "title",
            type: "string",
            value: get(selectedCard, "title"),
            required: true,
          },
          {
            name: "description",
            type: "string",
            value: get(selectedCard, "description"),
            required: true,
          },
          {
            name: "week",
            type: "string",
            value: get(selectedCard, "week"),
            required: true,
          },
          {
            name: "clock",
            type: "string",
            value: get(selectedCard, "clock"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["vacancies"] });
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
                className="mb-3 w-[100%]"
                name="title"
                type="text"
                placeholder="Vakansiya nomi"
                size="large"
              />
              <Field
                className="mb-3 w-[100%]"
                component={Fields.Input}
                name="description"
                type="text"
                placeholder="Vakansiya haqida"
                size="large"
              />
              <Field
                className="mb-3 w-[100%]"
                component={Fields.Input}
                name="week"
                type="text"
                placeholder="Ish kunlari"
                size="large"
              />
              <Field
                className="mb-3 w-[100%]"
                component={Fields.Input}
                name="clock"
                type="text"
                placeholder="Ish soatlari"
                size="large"
              />
              <Button
                className="w-full h-auto border-0 py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
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

export default Vacancy;
