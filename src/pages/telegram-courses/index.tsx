import { useState } from "react";
import { Col, Row, Card, Modal } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import Update from "./update";
import { Edit } from "assets/images/icons";

const TelegramCourses = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [createModal, showCreateModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [successed, setSuccess] = useState<boolean>(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    data: null;
  }>({
    isOpen: false,
    data: null,
  });
  const { mutate } = usePost();
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };
  return (
    <div className="flex">
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title="Edit"
        width={500}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="telegram-courses" url="/telegram-courses">
          {({ items, isLoading }) => {
            return (
              <div>
                <Row
                  justify="space-between"
                  className="h-[75vh] overflow-y-auto mt-[15px]"
                >
                  {items.map((card) => {
                    return (
                      <>
                        <Col className="gutter-row mb-5" span={24}>
                          <Card
                            className="bg-[#f2f2f2] border-[#f2f2f2] dark:bg-[#30354E] dark:border-[#30354E]"
                          >
                            <Meta
                              className="pb-[40px]"
                              title={
                                <div className="mb-3">
                                  <p className="dark:text-[#e5e7eb]">telegramBotToken: {(get(card, "telegramBotToken", "none"))}</p>
                                </div>
                              }
                              description={
                                <div className="mb-3">
                                  <p className="dark:text-[#e5e7eb]">telegramChannelChatId: {(get(card, "telegramChannelChatId", "none"))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={() => onEdit(card)}
                              >
                                <Edit />
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default TelegramCourses;