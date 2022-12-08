import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ImagePreview from '../LoadImagePreview/ImagePreview';
import './CardDetailed.css';
import MapZone from '../MapZone/MapZone';
import useAuth from '../../auth/useAuth';
import capitalize from '../../functions/capitalize';
import defaultImage from '../../assets/lightning-bolt-test1.png';

const CardDetailed = ({ vals: { title, description, coordinates, tags, pictureFile } }) => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <div className="CardDetailed">
      <div className="picture-zone">
        <ImagePreview imageFile={pictureFile} defaultImage={defaultImage}></ImagePreview>

        <FontAwesomeIcon icon={faHeart} className="favHeart" />
        <div className="title-line">
          <div className="container">
            <div className="block"></div>
            <div className="text">{title}</div>
            {title}
          </div>
          <div className="container">
            <div className="block"></div>
            <div className="text">{capitalize(currentUser.username, 'WoRd')}</div>
            {capitalize(currentUser.username, 'WoRd')}
          </div>
        </div>
      </div>
      <div className="tag-list">
        {tags.map((tagEl) => {
          return (
            <div key={tagEl.tagName} className="tag-el">
              {tagEl.tagName}
            </div>
          );
        })}
      </div>

      <div className="description">{description}</div>
      <MapZone coordinates={coordinates} />
    </div>
  );
};

export default CardDetailed;
