import { useRouter } from 'next/router';
import styles from '@/styles/contact_page.module.scss';
import { Avatar, Card, Col, message, Row, Spin, Table } from 'antd';
import { useEffect } from 'react';
import { EpisodeType } from '@/hooks/useContactDetail';
import ContactInfo from '@/components/ContactInfo';
import { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import { getContactDetail } from '@/apis/contact';
import { getEpisodeList } from '@/apis/episode';

type ContactDetailType = {
  name: string,
  avatar: string,
  status: string,
  gender: string,
  species: string,
  location: {
    name: string,
  },
  origin: {
    name: string,
  },
  episodes: Array<EpisodeType>,
}

interface ContactDetailProps {
  title: string;
  detail: ContactDetailType;
  loading: boolean;
}

const ContactDetail = ({ title = '', detail, loading }: ContactDetailProps) => {
  const router = useRouter();

  // const [loading, detail] = useContactDetail(router.query.id as string);

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
    if (loading === true) {
      router.push("/contact");
      message.error("Invalid Contact");
    }
  }, [loading, router])

  return <>
    <Head>
      <title>{title} - SleekFlow</title>
      <meta name="description" content={`View information about ${title}`} />
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
          {/* <small className='block'>Total In {detail?.episodes.length}
            &nbsp;Episode{detail?.episodes.length === 1 ? '' : 's'}
          </small><br /> */}
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

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  var loading = true;
  var detail: Partial<ContactDetailType> = {};
  // fetch data from an API using the ID
  const ret = await getContactDetail(id as string);
  if (ret.status === 200) {
    var allEpList = Array.isArray(ret.data.episode) ? ret.data.episode : [];
    const allEps = allEpList.map((ep: string) => ep.replace('https://rickandmortyapi.com/api/episode/', '')).join(',');

    const epData = await getEpisodeList(allEps);
    var epList = [];
    if (epData.status === 200) {
      //some character only got 1 ep , the api not return [{...}] but return {...}
      epList = Array.isArray(epData.data) ? epData.data : epData.data.id !== undefined ? [epData.data] : [];
    }
    detail = {
      name: ret.data.name,
      avatar: ret.data.image,
      status: ret.data.status,
      gender: ret.data.gender,
      species: ret.data.species,
      location: {
        name: ret.data.location?.name,
      },
      origin: {
        name: ret.data.origin?.name,
      },
      episodes: epList,
    };
    loading = false;
  }

  // pass the data to the component
  return {
    props: {
      title: ret.data.name,
      loading: loading,
      detail: detail,
    },
  };
};

export default ContactDetail;
