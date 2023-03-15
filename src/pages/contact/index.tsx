import { Col, Input, Row, Table } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useContactTable, { ContactType } from '@/hooks/useContactTable';
import Head from 'next/head';
import BonusPagination from '@/components/BonusPagination';

const ContactPage = () => {

  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [data, columns, tableSetting, handleTableChange, bonusPageChange] = useContactTable(name);

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
    <Head>
      <title>Contact List - SleekFlow</title>
      <meta name="description" content="View our list of contacts with their related information." />
    </Head>
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
          current: tableSetting.page,
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
      <BonusPagination
        currentPage={tableSetting.page}
        totalRecords={tableSetting.totalRecord}
        onPageChange={(a: number) => bonusPageChange(a)}
      />
    </div>
  </>;
}

export default ContactPage;