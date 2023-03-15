import { Col, Input, Row, Table } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useContactTable, { ContactType } from '@/hooks/useContactTable';

const ContactPage = () => {

  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [data, columns, tableSetting, handleTableChange] = useContactTable(name);

  const handleOnRow = (record: ContactType) => {
    return {
      onClick: () => {
        router.push(`/contact/${record.id}`);
      },
    };
  };

  useEffect(() => {
    //delay after user stop typing
    const delayTyping = setTimeout(() => {
      setName(search);
    }, 500);

    return () => clearTimeout(delayTyping);
  }, [search]);


  return <>
    <div className="content__root">
      <h1>Contacts:</h1>
      <Row>
        <Col span={8}>
          <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
      </Row>
      <br />
      <Table
        columns={columns}
        rowKey={(data) => data.id}
        dataSource={data}
        pagination={{
          position: ['topRight', 'bottomRight'],
          showSizeChanger: false,
          pageSize: 20,
          total: tableSetting.totalRecord,
          showTotal: (total, range) => `Total ${total} records`,
        }}
        loading={tableSetting.loading}
        onChange={handleTableChange}
        onRow={handleOnRow}
      />
    </div>
  </>;
}

export default ContactPage;