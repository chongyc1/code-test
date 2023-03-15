import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getContactList } from '@/apis/contact';

type HandleTableChange = (pagination: TablePaginationConfig) => void;

export interface ContactType {
  id: number,
  name: string;
  status: string;
  species: string;
  gender: string;
}

type TableSetting = {
  loading: boolean,
  totalRecord: number,
}

const useContactTable = (name: string): [ContactType[], ColumnsType<ContactType>, TableSetting, HandleTableChange] => {
  const columns: ColumnsType<ContactType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Species',
      dataIndex: 'species',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
  ];

  const [loading, setLoading] = useState<boolean>(true);

  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<ContactType[]>([]);

  const handleTableChange = (
    pagination: TablePaginationConfig
  ) => {
    setPage(pagination.current || 1);
  }
  useEffect(() => {
    const getContact = async () => {
      setLoading(true);
      const ret = await getContactList(page, name);
      if (ret.status === 200) {
        setData(ret.data.results);
        setTotal(ret.data.info.count)
      } else {
        setData([]);
        setTotal(0);
        setPage(1);
      }
      setLoading(false);
    };
    getContact();
  }, [page, name]);

  const tableSetting: TableSetting = {
    loading: loading,
    totalRecord: total,
  };

  return [data, columns, tableSetting, handleTableChange];

};
export default useContactTable;