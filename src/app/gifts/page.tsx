"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, DefaultLayout } from "@/components";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Table,
  TableProps,
  Typography,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Gift } from "@/types/gift";
import { API_GIFT, GIFT_TITLE, PAGE_SIZE } from "@/constants";
import { useAuth, usePage } from "@/stores";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "bool";
  record: Gift;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;
  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
      break;
    case "bool":
      inputNode = (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      );
      break;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

type PageParams = {
  offset: number;
  limit: number;
};

const initData: Gift = {
  id: "",
  title: "",
  description: "",
  assetAmountToExchange: 0,
  assetTypeToExchange: "",
  isActive: false,
};

export default function Gifts() {
  const { userInfo } = useAuth();
  const { setTitle } = usePage();
  useEffect(() => {
    setTitle(GIFT_TITLE);
  }, [setTitle]);

  const [pageParams, setPageParams] = useState<PageParams>({
    offset: 0,
    limit: PAGE_SIZE,
  });
  const [form] = Form.useForm<Gift>();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Gift) => record.id === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Partial<Gift>) => {
    if (!record || !record.id) return;
    form.setFieldsValue({
      ...initData,
      ...record,
    });
    setEditingKey(record.id);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Gift;
      const res = await axios({
        method: "patch",
        url: API_GIFT,
        data: {
          key: key,
          token: userInfo?.idToken,
          row: row,
        },
      });
      setEditingKey("");
      refetch();
      return res.data;
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const {
    data: giftsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-gifts", pageParams],
    queryFn: async () => {
      const res = await axios({
        url: API_GIFT,
        method: "post",
        data: {
          offset: pageParams.offset,
          limit: pageParams.limit,
          token: userInfo?.idToken,
        },
      });
      return res.data;
    },
    enabled: !!userInfo,
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Asset",
      dataIndex: "assetTypeToExchange",
      key: "assetTypeToExchange",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "assetAmountToExchange",
      key: "assetAmountToExchange",
      editable: true,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      editable: true,
      render: (_: any, record: Gift) => (
        <div>{record.isActive ? "true" : "false"}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Gift) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Gift) => ({
        record,
        inputType:
          col.dataIndex === "assetAmountToExchange"
            ? "number"
            : col.dataIndex === "isActive"
              ? "bool"
              : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gifts" />
      <div className="flex flex-col">
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowKey="id"
            columns={mergedColumns}
            dataSource={giftsData?.data || []}
            pagination={
              giftsData?.pagination?.totalItem > pageParams.limit && {
                pageSize: pageParams.limit,
                total: giftsData?.pagination?.totalItem,
                onChange: (page) => {
                  setPageParams({ ...pageParams, offset: page - 1 });
                  setEditingKey("");
                },
              }
            }
            loading={isLoading}
          />
        </Form>
      </div>
    </DefaultLayout>
  );
}
