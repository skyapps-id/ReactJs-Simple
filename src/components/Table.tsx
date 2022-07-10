import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { SaveOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

interface Item {
  key: string;
  title: string;
  views: number;
  genre: string;
  descriptions: string;
}

interface Columns {
  title: string;
  key: string;
  dataIndex?: string;
  width?: number;
  editable?: boolean;
  render?: any;
}

interface IProps {
  columns: Columns[];
  data: Item[];
  summary: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
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

const TableComponent: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const newData = [...props.data];
      const index = newData.findIndex((item) => key === item.key);
      console.log(newData[index])
      if (index > -1) {
        // Implement Dispatch Update and Reload Data
        setEditingKey('');
      } else {
        // Implement Dispatch eload Data
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns: Columns[] = [
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'operation',
      width: 80,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              <SaveOutlined />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <CloseOutlined />
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined />
          </Typography.Link>
        );
      }
    }
  ];

  const mergedColumns = props.columns.concat(columns).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'views' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={props.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        scroll={{ y: 380 }}
        pagination={{
          onChange: cancel
        }}
        summary={props.summary}
      />
    </Form>
  );
};

export default TableComponent;
