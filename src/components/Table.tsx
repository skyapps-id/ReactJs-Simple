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
  width?: number | string;
  editable?: boolean;
  // eslint-disable-next-line
  render?: any;
}

interface IProps {
  columns: Columns[];
  data: Item[];
  isFilterVisible: boolean;
  // eslint-disable-next-line
  updateData?: (id: string, payload: any) => void;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  // eslint-disable-next-line
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

const initFilter: Item[] = [];
const TableComponent: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [dataFilter, setDataFilter] = useState(initFilter);
  const [editingKey, setEditingKey] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchGenre, setSearchGenre] = useState('');

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
      const row = await form.validateFields();
      const data = props.isFilterVisible && dataFilter.length ? dataFilter : props.data;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1 && newData[index]) {
        // Implement Dispatch Update and Reload Data
        if (props.updateData) {
          props.updateData(String(index), row);
        }
        setEditingKey('');
      } else {
        // Implement Dispatch eload Data
        setEditingKey('');
      }
    } catch (errInfo) {
      // eslint-disable-next-line
      console.log('Validate Failed:', errInfo);
    }
  };

  const summary = props.isFilterVisible
    ? () => (
        <Table.Summary fixed={'top'}>
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={1} />
            <Table.Summary.Cell index={2} colSpan={1}>
              <Input
                name="searchTitle"
                value={searchTitle}
                onChange={handleChange}
                placeholder="Search Title"
              />
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} colSpan={1} />
            <Table.Summary.Cell index={4} colSpan={1}>
              <Input
                name="searchGenre"
                value={searchGenre}
                onChange={handleChange}
                placeholder="Search Genre"
              />
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )
    : () => <></>;
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let title = searchTitle;
    let genre = searchGenre;
    if (e.currentTarget.name === 'searchTitle') {
      title = e.currentTarget.value;
      setSearchTitle(e.currentTarget.value);
    }
    if (e.currentTarget.name === 'searchGenre') {
      genre = e.currentTarget.value;
      setSearchGenre(e.currentTarget.value);
    }
    handleSearch(title, genre);
  };

  const handleSearch = (searchTitle: string, searchGenre: string) => {
    setDataFilter(
      props.data.filter(
        (obj) =>
          obj.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
          obj.genre.toLowerCase().includes(searchGenre.toLowerCase())
      )
    );
  };

  const columns: Columns[] = [
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'operation',
      width: 80,
      // eslint-disable-next-line
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
        dataSource={props.isFilterVisible && dataFilter.length ? dataFilter : props.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        scroll={{ y: 320 }}
        pagination={{
          onChange: cancel
        }}
        summary={summary}
      />
    </Form>
  );
};

export default TableComponent;
