"use client";

import { useEffect, useRef, useState } from "react";

import style from "./filter.module.scss";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  resetPageNumber,
  setPaintings,
} from "@/app/redux/slices/paintingsSlice";
import { useAppDispatch } from "@/types/ReduxHooks";
import { getPaintings } from "@/utils/api";

import { FilterIcon } from "@/app/icons/icon-filter";
import { CloseIcon } from "@/app/icons/icon-close";
import RangeSlider from "./rangeSlider/rangeSlider";
import StylesCheckBox from "./stylesCheckbox/stylesCheckbox";
import SizesSection from "./sizesSection/sizesSection";

const Filter = ({ filtersData }: any) => {
  const {
    maxPrice,
    minPrice,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    styles,
    subjects,
    mediums,
    supports,
  } = filtersData;

  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [priceRanges, setPriceRanges] = useState<number[]>([
    minPrice,
    maxPrice,
  ]);
  const [widthRanges, setWidthRanges] = useState<number[]>([
    minWidth,
    maxWidth,
  ]);
  const [heightRanges, setHeightRanges] = useState<number[]>([
    minHeight,
    maxHeight,
  ]);
  const [styleCheckOptions, setStyleCheckOptions] = useState<string[]>([]);
  const [subjectCheckOptions, setSubjectCheckOptions] = useState<string[]>([]);
  const [mediumCheckOptions, setMediumCheckOptions] = useState<string[]>([]);
  const [supportCheckOptions, setSupportCheckOptions] = useState<string[]>([]);

  const menuRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sum =
    styleCheckOptions.length +
    subjectCheckOptions.length +
    mediumCheckOptions.length +
    supportCheckOptions.length;

  const getFilteringPaintings = async (searchParams: any) => {
    const paintings = await getPaintings(searchParams);
    dispatch(setPaintings(paintings));
  };

  const handleFilterPaintings = () => {
    setIsMenuOpen(!isMenuOpen);
    const params = new URLSearchParams(window.location.search);
    params.delete("page");
    dispatch(resetPageNumber());

    if (priceRanges[0] !== minPrice || priceRanges[1] !== maxPrice) {
      params.set("priceBetween", priceRanges.join(","));
    } else {
      params.delete("priceBetween");
    }

    if (styleCheckOptions.length) {
      params.set("styleIn", styleCheckOptions.join(","));
    } else {
      params.delete("styleIn");
    }
    if (subjectCheckOptions.length) {
      params.set("subjectIn", subjectCheckOptions.join(","));
    } else {
      params.delete("subjectIn");
    }

    if (mediumCheckOptions.length) {
      params.set("mediumIn", mediumCheckOptions.join(","));
    } else {
      params.delete("mediumIn");
    }

    if (supportCheckOptions.length) {
      params.set("supportIn", supportCheckOptions.join(","));
    } else {
      params.delete("supportIn");
    }

    router.replace(`${pathname}?${params.toString()}`);

    getFilteringPaintings(params.toString());
  };

  const removeAllSearchParameters = (params: URLSearchParams) => {
    const allSearchParams = [
      "page",
      "priceBetween",
      "styleIn",
      "subjectIn",
      "mediumIn",
      "supportIn",
    ];

    allSearchParams.forEach((param) => params.delete(param));
  };

  const handleClearFilters = () => {
    setIsMenuOpen(false);
    dispatch(resetPageNumber());

    const params = new URLSearchParams(window.location.search);
    removeAllSearchParameters(params);
    router.replace(`${pathname}?${params.toString()}`);

    setPriceRanges([minPrice, maxPrice]);
    setStyleCheckOptions([]);
    setSubjectCheckOptions([]);
    setMediumCheckOptions([]);
    setSupportCheckOptions([]);

    getFilteringPaintings(params.toString());
  };

  useEffect(() => {
    const style = searchParams.get("styleIn");
    const subject = searchParams.get("subjectIn");
    const medium = searchParams.get("mediumIn");
    const support = searchParams.get("supportIn");
    const price = searchParams.get("priceBetween");

    if (style) {
      setStyleCheckOptions(style.split(","));
    }

    if (subject) {
      setSubjectCheckOptions(subject.split(","));
    }

    if (medium) {
      setMediumCheckOptions(medium.split(","));
    }

    if (support) {
      setSupportCheckOptions(support.split(","));
    }

    if (price) {
      const priceNumbers = price.split(",").map((item) => Number(item));
      setPriceRanges(priceNumbers);
    }
  }, []);

  useEffect(() => {
    const handleCloseDropdown = (event: any) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCloseDropdown);

    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  });

  return (
    <div className={style.wrapper} ref={menuRef}>
      <div className={style.select} onClick={() => setIsMenuOpen(true)}>
        <FilterIcon />
        <p className={style.title}>Filter</p>
      </div>
      {isMenuOpen && (
        <div className={style.menu}>
          <div
            className={style.menu__wrapper}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={style.menu__container}>
              <FilterIcon />
              <p className={style.menu__title}>Filter</p>
            </div>
            <div>
              <CloseIcon />
            </div>
          </div>
          <div className={style.dropdown}>
            <RangeSlider
              title={"PRICE"}
              valueType={"€"}
              ranges={priceRanges}
              setRanges={setPriceRanges}
              maxValue={maxPrice}
              minValue={minPrice}
            />
            <StylesCheckBox
              title={"STYLE"}
              types={styles}
              styleOptions={styleCheckOptions}
              setCheckedOptions={setStyleCheckOptions}
            />
            <StylesCheckBox
              title={"SUBJECT"}
              types={subjects}
              styleOptions={subjectCheckOptions}
              setCheckedOptions={setSubjectCheckOptions}
            />
            <StylesCheckBox
              title={"MEDIUM"}
              types={mediums}
              styleOptions={mediumCheckOptions}
              setCheckedOptions={setMediumCheckOptions}
            />
            <StylesCheckBox
              title={"SUPPORT"}
              types={supports}
              styleOptions={supportCheckOptions}
              setCheckedOptions={setSupportCheckOptions}
            />
            <SizesSection
              maxWidth={maxWidth}
              minWidth={minWidth}
              maxHeight={maxHeight}
              minHeight={minHeight}
              widthRanges={widthRanges}
              heightRanges={heightRanges}
              setWidthRanges={setWidthRanges}
              setHeightRanges={setHeightRanges}
            />
            <div className={style.buttons}>
              <button
                className={`${style.button} ${style.mainButton}`}
                onClick={handleFilterPaintings}
              >{`Apply filters ${sum > 0 ? `(${sum})` : ""}`}</button>
              <button className={style.button} onClick={handleClearFilters}>
                Discard filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
