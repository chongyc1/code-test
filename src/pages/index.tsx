import styles from '@/styles/home.module.scss';
import { Button, Col, Row } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return <>
    <Head>
      <title>CodeTest - SleekFlow</title>
      <meta name="description" content="A code test - SleekFlow" />
    </Head>
    <div className={styles.container}>
      <div className={styles.homeTitle}>
        <h2>Code Test - Rick and Morty API</h2>
        <span>Chong Yue Chia 15-Mar-2023</span>
        <Link href="/contact" className={styles.viewLink}>
          <Button>View Contact List</Button>
        </Link>
      </div>
    </div>
  </>;
}

export default Home;