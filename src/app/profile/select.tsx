import {
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  mediums,
  styles,
  subjects,
  supports
} from './subjects';
// interface Style {
//   name: string;
//   _links: {
//     self: {
//       href: string;
//     },
//     style: {
//       href: string;
//     }
//   }
// }

type Checkbox = 'styles' | 'subjects' | 'mediums' | 'supports';

type Props = {
  selectedItem: string;
  selectedIds: number[];
  checkboxItem: Checkbox;
  onSelect: React.Dispatch<SetStateAction<number[]>>;
  setSelectedItem: React.Dispatch<SetStateAction<string>>;
};

const Select: React.FC<Props> = ({
  onSelect,
  selectedIds,
  checkboxItem,
  selectedItem,
  setSelectedItem,
}) => {
  const selectRef = useRef<any>(null);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);

  const handleClickOutside = (event: any) => {
    if (!selectRef?.current?.contains(event.target)) {
      setIsCheckboxActive(false);
    }
  };

  const toUpperCasedTitle = (title: string) => (
    title.slice(0, 1).toUpperCase() + title.slice(1)
  );

  const getItems = () => {
    switch (checkboxItem) {
      case 'styles':
        return styles;

      case 'mediums':
        return mediums;

      case 'subjects':
        return subjects;

      case 'supports':
        return supports;


      default: return null;
    }
  }

  const items = getItems();

  const handleSelectItem = (id: number, value: string) => {
    if (selectedIds.includes(id)) {
      onSelect(currentIds => currentIds.filter(current => current !== id));

      return;
    }
    
    if (selectedIds.length >= 3) {
      return;
    }

    onSelect(currentIds => [...currentIds, id]);
    setSelectedItem(value);
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectRef]);

  return (
    <div className="field profile-item">
      <label className="label required-field">
        {toUpperCasedTitle(checkboxItem)}
      </label>

      <div
        ref={selectRef}
        className="control"
      >
        <div
          onClick={() => setIsCheckboxActive(!isCheckboxActive)}
          className={`dropdown profile-item ${isCheckboxActive ? 'is-active' : ''}`}
        >
          <div className="dropdown-trigger profile-item">
            <button
              className="button profile-item"
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
            >
              <span>
                {selectedItem.length
                  ? selectedItem
                  : `choose ${checkboxItem}`}
              </span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>

          <div
            className="dropdown-menu profile-item"
            id="dropdown-menu2"
            role="menu"
          >
            <div className="dropdown-content">
              {items && (
                items.map(([index, item]) => (
                  <label key={item} className="radio">
                    <input
                      type="checkbox"
                      value={item}
                      name={checkboxItem}
                      onChange={() => handleSelectItem(index, item)}
                      checked={selectedIds.includes(index)}
                    />
                    {item}
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
