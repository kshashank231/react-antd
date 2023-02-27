import React, { useState } from "react";
import { Card, Button, Input } from 'antd';
import { Table } from 'antd';

export const Countries = ({data, handleDelete, handleFilter }) => {
  const [val, setVal] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const filterVals = (e) => {
    const filterKey = e.target.value;
    setVal(filterKey);
    handleFilter(filterKey);
  }

  const columns = [
    {
      title: <Input
        placeholder="search"
        value={val}
        onChange={filterVals}
      />,
      dataIndex: 'name',
    }
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE
    ],
  };

  const deleteSelected = () => {
    console.log(selectedRowKeys)
    handleDelete(selectedRowKeys)
    setSelectedRowKeys([])
  }

  return (
    <Card style={{ marginTop: 16 }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey='name'
      />
      <Button type="primary" danger onClick={deleteSelected}> Delete Selected </Button>
    </Card>
  )
}