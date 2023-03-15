import { useRouter } from 'next/router';
import styles from '@/styles/contact_page.module.scss';
import { Avatar, Card, Col, message, Row, Spin, Table } from 'antd';
import { useEffect } from 'react';
import useContactDetail, { EpisodeType } from '@/hooks/useContactDetail';
import ContactInfo from '@/components/ContactInfo';
import { ColumnsType } from 'antd/es/table';
import Head from 'next/head';

const ContactDetail = () => {
  const router = useRouter();

  const [loading, detail] = useContactDetail(router.query.id as string);

  const columns: ColumnsType<EpisodeType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Air Date',
      dataIndex: 'air_date',
    },
    {
      title: 'Episode',
      dataIndex: 'episode',
    }
  ];

  useEffect(() => {
    if (detail === undefined) {
      router.push("/contact");
      message.error("Invalid Contact");
    }
  }, [detail, router])

  return <>
    <Head>
      <title>{detail?.name} - SleekFlow</title>
      <meta name="description" content={`View information about ${detail?.name}`} />
    </Head>
    <Spin spinning={loading}>
      <div className={styles.header}>
        <Row justify="space-around" align="middle" className={styles.header_content}>
          <Col xs={10} sm={8} md={6} lg={6} xl={6}>
            <Avatar size={100} src={detail?.avatar} />
          </Col>
          <Col xs={14} sm={16} md={18} lg={18} xl={18}>
            <span className={styles.contact_name}>{detail?.name}</span>
          </Col>
        </Row>
      </div>
      <div>
        <div className="content__root">
          <h3>Personal Info</h3>
          <Card>
            <ContactInfo title="Status" value={detail?.status} isStatus />
            <ContactInfo title='Gender' value={detail?.gender} />
            <ContactInfo title='Location' value={detail?.location?.name} />
            <ContactInfo title='Origin' value={detail?.origin?.name} />
            <ContactInfo title='Species' value={detail?.species} />
          </Card>
          <br /><hr /><br />
          <h3>Episodes:</h3>
          <small className='block'>Total In {detail?.episodes.length}
            &nbsp;Episode{detail?.episodes.length === 1 ? '' : 's'}
          </small><br />
          <Table
            columns={columns}
            dataSource={detail?.episodes}
            rowKey={(data) => data.episode}
          />
        </div>
      </div>
    </Spin>
  </>;
}

export default ContactDetail;