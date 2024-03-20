import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";
import useStore from "store"

const Profile = ({ showUpdateModal }: any): JSX.Element => {
  const { get } = useHooks();
  const { auth: { data } } = useStore(state => state)

  return (
    <div>
      <Container.Form
        url={`user/${get(data, "_id")}`}
        name="profile"
        method="put"
        fields={[
          {
            name: "newLogin",
            type: "string",
            required: true,
          },
          {
            name: "newPassword",
            type: "string",
            required: true,
          },
          {
            name: "address",
            type: "string",
          },
          {
            name: "number",
            type: "string",
          },
          {
            name: "telegram",
            type: "string",
          },
          {
            name: "instagram",
            type: "string",
          },
          {
            name: "youtube",
            type: "string",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          showUpdateModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isLoading }) => {
          return (
            <div>
              <Field
                component={Fields.Input}
                rootClassName="mb-5"
                name="login"
                type="text"
                placeholder="Username"
                size="large"
              />
              <Field
                rootClassName="mb-5"
                component={Fields.Input}
                name="password"
                type="text"
                placeholder="password"
                size="large"
              />
              <Field
                rootClassName="mb-5"
                component={Fields.Input}
                name="address"
                type="text"
                placeholder="address"
                size="large"
              />
              <Field
                rootClassName="mb-5"
                component={Fields.Input}
                name="number"
                type="text"
                placeholder="number"
                size="large"
              />
              <Field
                rootClassName="mb-5"
                component={Fields.Input}
                name="telegram"
                type="text"
                placeholder="telegram"
                size="large"
              />
              <Field
                rootClassName="mb-5"
                component={Fields.Input}
                name="instagram"
                type="text"
                placeholder="instagram"
                size="large"
              />
              <Field
                rootClassName="mb-5"
                component={Fields.Input}
                name="youtube"
                type="text"
                placeholder="youtube"
                size="large"
              />
              <Button
                className="w-full h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                htmlType="submit"
              >
                Saqlash
              </Button>
            </div>
          );
        }}
      </Container.Form>
    </div >
  );
};

export default Profile;