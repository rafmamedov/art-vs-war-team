"use client"

import { Dispatch, FC, SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';

import style from './artistTabs.module.scss';

import ArtProcess from '../artProcess/artProcess';
import { Add } from '@/app/icons/add';
import { Form } from '@/app/profile/page';
import MasonryGallery from '@/app/gallery/masonry-catalog/masonry-catalog';

const tabs = ['Artworks', 'Collections', 'Art Process'];

const arr = [
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
];

type Props = {
  setOpenForm: Dispatch<SetStateAction<Form>>;
}

const ArtistTabs: FC<Props> = ({ setOpenForm }) => {
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

        {isProfile && (
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
        {selectedTab === 'Artworks' && <MasonryGallery images={arr} />}
        {selectedTab === 'Art Process' && <ArtProcess />}
      </div>
    </>
  );
};

export default ArtistTabs;
