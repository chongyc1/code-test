import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getContactList } from '@/apis/contact';

type HandleTableChange = (pagination: TablePaginationConfig) => void;
type bonusPageChange = (page: number) => void;

export interface ContactType {
  id: number,
  name: string;
  status: string;
  species: string;
  gender: string;
}

type TableSetting = {
  loading: boolean,
  page: number,
  totalRecord: number,
}

const useContactTable = (name: string): [ContactType[], ColumnsType<ContactType>, TableSetting, HandleTableChange, bonusPageChange] => {
  const columns: ColumnsType<ContactType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(val, r, i) {
        return <span
          className={`is_${val}`}
          key={`status_row_${i}`}>{val}
        </span>;
      },
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

  const bonusPageChange = (page: number) => {
    setPage(page);
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
    page: page,
  };

  return [data, columns, tableSetting, handleTableChange, bonusPageChange];

};
export default useContactTable;