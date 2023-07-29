"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";

import style from "./artistTabs.module.scss";

import { Add } from "@/app/icons/icon-add";
import ArtProcess from "./artProcess/artProcess";
import MasonryGallery from "@/app/components/masonry/masonry";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { Painting } from "@/types/Painting";

const tabs: ArtistTabOptions[] = [
  ArtistTabOptions.artworks,
  ArtistTabOptions.collections,
  ArtistTabOptions.artProcess,
];

type Props = {
  paintingsList: Painting[];
  setOpenForm?: Dispatch<SetStateAction<ArtistTabOptions | null>>;
};

const ArtistTabs: React.FC<Props> = ({
  paintingsList,
  setOpenForm
}) => {
  const [selectedTab, setSelectedTab] = useState(ArtistTabOptions.artworks);
  const pathname = usePathname();

  const isProfile = pathname === "/profile";

  const onTabSelect = (tab: ArtistTabOptions) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={style.tabs}>
        <div className={style.tabs__container}>
          {tabs.map((tab: ArtistTabOptions) => (
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
            onClick={() => setOpenForm(selectedTab)}
          >
            <Add />
            {selectedTab}
          </button>
        )}

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>
        {selectedTab === ArtistTabOptions.artworks && (
          <MasonryGallery paintingsList={paintingsList} />
        )}
        {selectedTab === ArtistTabOptions.artProcess && <ArtProcess />}
      </div>
    </>
  );
};

export default ArtistTabs;
