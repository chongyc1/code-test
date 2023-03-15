import styles from '@/styles/home.module.scss';
import { Button, Col, Row } from 'antd';
import Link from 'next/link';

const Home = () => {
  return <>
    <div className={styles.container}>
      <div className={styles.homeTitle}>
        <h2>Code Test - Rick and Morty API</h2>
        <span>CYC 15/Mar/2023</span>
        <Link href="/contact" className={styles.viewLink}>
          <Button>View Contact List</Button>
        </Link>
      </div>
    </div>
  </>;
}

export default Home;