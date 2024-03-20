import { Fields } from "components";
import { FastField, Field } from "formik";
import { Container } from "modules";
import { useState } from "react";
import { Card, Col, Modal, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Update from "./update";
import useStore from "store"
import { useHooks } from "hooks";

const Profile = () => {
  const { get, t } = useHooks();
  const { Meta } = Card;
  const [updateModal, showUpdateModal] = useState(false);
  return (
    <div className="flex">
      <Modal
        open={updateModal}
        onOk={() => showUpdateModal(true)}
        onCancel={() => showUpdateModal(false)}
        footer={null}
        centered
        width={500}
        destroyOnClose
      >
        <Update {...{ showUpdateModal }} />
      </Modal>

      <Container.All name="profile" url="get-me">
        {({ items, isLoading }) => {
          return (
            <div>
              <Row
                justify="space-between"
                className="h-[75vh] overflow-y-auto mt-[15px]"
              >
                <>
                  <Col className="gutter-row mb-5" span={6}>
                    <Card
                      hoverable
                      style={{ width: 750, marginRight: 15 }}
                      className="pb-8"
                    >
                      <Meta
                        className="pb-[40px] flex"
                        title={
                          <div className="mb-3">
                            <p>Yaratilgan: {(get(items, "createdAt", ""))}</p>
                            <p>id: {(get(items, "_id", ""))}</p>
                            <p>Username: {(get(items, "login", ""))}</p>
                          </div>
                        }
                        description={
                          <div className="mb-3">
                            <p>address: {(get(items, "address", "none"))}</p>
                            <p>number: {(get(items, "number", "none"))}</p>
                            <p>telegram: {(get(items, "telegram", "none"))}</p>
                            <p>instagram: {(get(items, "instagram", "none"))}</p>
                            <p>youtube: {(get(items, "youtube", "none"))}</p>
                          </div>
                        }
                      />
                      <div className="btnPanel">
                        <div
                          className="cursor-pointer text-sky-500"
                          onClick={() => showUpdateModal(true)}
                        >
                          <EditOutlined />
                        </div>
                      </div>
                    </Card>
                  </Col>
                </>
              </Row>
            </div>
          );
        }}
      </Container.All>
    </div>
  );
};

export default Profile;
