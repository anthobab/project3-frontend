import React, { useEffect, useState } from 'react';

import './TagSearch.css';

const TagSearch = ({ myTags, handleOnchanged }) => {
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

  useEffect(() => {
    // console.log('mytags Updated', myTags);
    return () => {};
  }, [myTags]);

  const onSearch = (tagObj) => {
    // setMyTags((curval) => {
    //   curval.push(tagObj);
    //   return curval;
    // });
    // what to do :
    setValue('');
    handleOnchanged(tagObj);
    // console.log('myTags ', myTags);
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
              onClick={() => {
                onSearch(tagsList.find((el) => el.tagName === item.tagName));
              }}
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
