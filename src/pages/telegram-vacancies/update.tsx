import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const TelegramVacancies = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`telegram-vacancies/vacancy/${get(selectedCard, "_id")}`}
        method="put"
        fields={[
          {
            name: "telegramBotToken",
            type: "string",
            value: get(selectedCard, "telegramBotToken"),
            required: true,
          },
          {
            name: "telegramChannelChatId",
            type: "string",
            value: get(selectedCard, "telegramChannelChatId"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["telegram-vacancies"] });
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
                name="telegramBotToken"
                type="text"
                placeholder="telegramBotToken"
                size="large"
              />
              <Field
                className="mb-3 w-full"
                component={Fields.Input}
                name="telegramChannelChatId"
                type="text"
                placeholder="telegramChannelChatId"
                size="large"
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

export default TelegramVacancies;
