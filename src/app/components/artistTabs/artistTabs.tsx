"use client"

import { Dispatch, FC, SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';

import style from './artistTabs.module.scss';

import ArtProcess from '../artProcess/artProcess';
import { Add } from '@/app/icons/icon-add';
import { Form } from '@/app/profile/page';
import MasonryGallery from '../masonry/masonry';
import { Painting } from '@/types/Painting';

const tabs = ['Artworks', 'Collections', 'Art Process'];

type Props = {
  setOpenForm?: Dispatch<SetStateAction<Form>>;
  paintingsList: Painting[];
}

const ArtistTabs: FC<Props> = ({ setOpenForm, paintingsList }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const pathname = usePathname();

  const isProfile = pathname === '/profile';

  const onTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={style.tabs}>
        <div className={style.tabs__container}>
          {tabs.map(tab => (
            <div
              key={tab}
              className={tab === selectedTab ? style.isActive : style.tab}
              onClick={() => onTabSelect(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {(isProfile && setOpenForm) && (
          <button
            type="button"
            className={style.add}
            onClick={() => setOpenForm('painting')}
          >
            <Add />
            {selectedTab}
          </button>
        )}

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>
        {selectedTab === 'Artworks' && <MasonryGallery paintingsList={paintingsList} />}
        {selectedTab === 'Art Process' && <ArtProcess />}
      </div>
    </>
  );
};

export default ArtistTabs;
