import React, { useContext, useState } from 'react';
import { MyTagsContext } from '../Forms/FormService';
import './TagSearch.css';

const TagSearch = ({ myTags, onChange }) => {
  const mytagsContext = useContext(MyTagsContext);
  const [value, setValue] = useState('');
  const [tagsList, setTagsList] = useState([
    {
      tagName: 'Tool',
    },
    {
      tagName: 'Service',
    },
    {
      tagName: 'Moving',
    },
    {
      tagName: 'Car',
    },
    {
      tagName: 'Camping gear',
    },
    {
      tagName: 'Trailer',
    },
    {
      tagName: 'Academic support',
    },
    {
      tagName: 'Piano lessons',
    },
  ]);

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (tagObj) => {
    onChange(tagObj);

    // what to do :
    setValue('');
    console.log('myTags ', myTags);
  };
  return (
    <div className="TagSearch">
      <div className="search-inner">
        <input type="text" value={value} placeholder="Search Tag" onChange={onChangeValue} />
        {/* <button onClick={() => onSearch(value)}> Search </button> */}
      </div>

      <div className="dropdown">
        {tagsList
          .filter((item) => {
            const searchTerm = value.toLowerCase();
            const tagName = item.tagName.toLowerCase();
            const notInMyTags = myTags.every((tag) => tag.tagName.toLowerCase() !== tagName);
            return searchTerm && tagName.includes(searchTerm) && notInMyTags; //&& tagName !== searchTerm;
          })
          .slice(0, 10)
          .map((item) => (
            <div
              onClick={() => onSearch(tagsList.find((el) => el.tagName === item.tagName))}
              className="dropdown-row"
              key={item.tagName}
            >
              {item.tagName}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TagSearch;
