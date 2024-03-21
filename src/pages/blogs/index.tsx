import { useState } from "react";
import { Spin, Col, Row, Card, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Update from "./update";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Blog = () => {
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
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить блог?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      className: "dark:text-white ",
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/blogs/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`blogs`],
            });
            notification["success"]({
              message: "Успешно удалена",
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", "Произошло ошибка!"),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modal
        open={createModal}
        onOk={() => showCreateModal(true)}
        onCancel={() => showCreateModal(false)}
        footer={null}
        centered
        title="Create blog"
        width={500}
        destroyOnClose
      >
        <Create {...{ showCreateModal, setSuccess, successed }} />
      </Modal>
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title="Edit blog"
        width={500}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="blogs" url="/blogs">
          {({ items, isLoading }) => {
            return (
              <div>
                <Button
                  title="Create blog"
                  icon={<CreateDoc />}
                  // isLoading={successed}
                  size="large"
                  onClick={() => showCreateModal(true)}
                />
                <Row
                  justify="space-between"
                  className="h-[75vh] mt-[15px] items-stretch"
                >
                  {items.map((card) => {
                    return (
                      <>
                        <Col className="gutter-row mb-5" span={6}>
                          <Card
                            hoverable
                            style={{ width: 260, marginRight: 15 }}
                            className="pb-4 bg-[#f2f2f2] border-[#f2f2f2] dark:bg-[#30354E] dark:border-[#30354E]"
                            cover={
                              <img className="object-cover w-[260px] h-[146px]" alt="" src={get(card, "image[0].medium")} />
                            }
                          >
                            <Meta
                              className="pb-[40px] p-0"
                              title={
                                <div className="mb-1">
                                  <p className="dark:text-[#e5e7eb] block truncate">{(get(card, "title", ""))}</p>
                                  <div className="flex">
                                    <p className="text-[#e5e7eb] mr-1">Views: </p>
                                    <p className="dark:text-[#e5e7eb]">{(get(card, "views", ""))}</p>
                                  </div>
                                </div>
                              }
                              description={
                                <div className="flex justify-between items-center mb-2">
                                  <p className="dark:text-[#e5e7eb] line-clamp-3">{(get(card, "description", ""))}</p>
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
                              <div
                                onClick={() =>
                                  onDeleteHandler(get(card, "_id", ""))
                                }
                                className="deleteBtn"
                              >
                                <Delete />
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

export default Blog;