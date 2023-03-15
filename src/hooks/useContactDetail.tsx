import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getContactDetail } from '@/apis/contact';
import { getEpisodeList } from '@/apis/episode';

export type EpisodeType = {
  name: string;
  air_date: string;
  episode: string;
};

type ContactDetailType = {
  avatar: string,
  name: string,
  status: string,
  gender: string,
  location: {
    name: string,
    url: string,
  },
  origin: {
    name: string,
    url: string,
  },
  species: string,
  episodes: EpisodeType[];
}

const useContactTable = (id: string): [boolean, ContactDetailType | undefined] => {

  const [loading, setLoading] = useState<boolean>(false);

  const [detail, setDetail] = useState<ContactDetailType | undefined>({
    avatar: "",
    name: "",
    status: "",
    gender: "",
    location: { name: "", url: "" },
    origin: { name: "", url: "" },
    species: "",
    episodes: [],
  });

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      const ret = await getContactDetail(id);
      if (ret.status === 200) {
        var allEpList = Array.isArray(ret.data.episode) ? ret.data.episode : [];
        const allEps = allEpList.map((ep: string) => ep.replace('https://rickandmortyapi.com/api/episode/', '')).join(',');

        const epData = await getEpisodeList(allEps);
        var epList = [];
        if (epData.status === 200) {
          //some character only got 1 ep , the api not return [{...}] but return {...}
          epList = Array.isArray(epData.data) ? epData.data : epData.data.id !== undefined ? [epData.data] : [];
        }

        setDetail({
          avatar: ret.data.image,
          name: ret.data.name,
          status: ret.data.status,
          gender: ret.data.gender,
          location: ret.data.location,
          origin: ret.data.origin,
          species: ret.data.species,
          episodes: epList,
        })
      } else {
        setDetail(undefined);
      }
      setLoading(false);
    };
    if (id !== undefined) {
      getDetail();
    }
  }, [id])

  return [loading, detail];

};
export default useContactTable;