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
import { Gift } from "@/types/Gift";
import { GIFT_TITLE, PAGE_SIZE, PAGE_TITLE } from "@/constants";
import { usePage } from "@/stores";

const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkNjE3N2E5Mjg2ZDI1Njg0NTI2OWEzMTM2ZDNmNjY0MjZhNGQ2NDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmVxZXgtODE4MmMiLCJhdWQiOiJiZXFleC04MTgyYyIsImF1dGhfdGltZSI6MTcxNzMzODY2MywidXNlcl9pZCI6IjBnUFhIQW43cXdROGhGcnhLUUcwYVZwTWZLZTIiLCJzdWIiOiIwZ1BYSEFuN3F3UThoRnJ4S1FHMGFWcE1mS2UyIiwiaWF0IjoxNzE3MzM4NjYzLCJleHAiOjE3MTczNDIyNjMsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFkbWluQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.QvNTlpAiYPm-fJZ_SLw0H4HOmWnfc3G4__TgwAyZqN1FqAzIb7jQbC7J5hu_D0_7FwMa736Y17KeWlwIIVJWjmycr7GtVGjkRMz6i9YSG8xDkBDPqaZ179q1B4Fa4KLUjWdKntB2z1iZaDI1GSzX7S3yWWaT334FJgqVFXzeq1X2yItY03zwPi-fo0F7BQjfmkdGwIU_hw45C-o4mFQwg-W7YkPBv3g03eXK07TvtlNKFyrMJijSDsgxNnBcj3tuhnxpNapCG8DKyNOxPrMf1nO_nO7EI4MvjezMMP1YdOirxkclJKsmqXCWdkmdX7WUsyrCuTjN2w-brH5MBZ-bjg";
const domain = "https://dev.loyalty-api.beqex.io/api/admin";

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
        url: `${domain}/gifts/${key}`,
        method: "patch",
        headers: {
          Accept: "/",
          Authorization: `Bearer ${token}`,
        },
        data: row,
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
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["admin-gifts", pageParams],
    queryFn: async () => {
      const res = await axios({
        url: `${domain}/gifts`,
        headers: {
          Accept: "/",
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset: pageParams.offset,
          limit: pageParams.limit,
        },
      });
      return res.data;
    },
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
              giftsData?.pagination.totalItem > pageParams.limit && {
                pageSize: pageParams.limit,
                total: giftsData?.pagination.totalItem,
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
