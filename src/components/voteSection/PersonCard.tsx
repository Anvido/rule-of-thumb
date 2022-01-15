import { FC } from "react";
import { IPerson } from "../../constants/types/People";
import { formatDistanceStrict } from "date-fns";
import thumbUp from "../../assets/img/thumbs-up.svg";
import thumbDown from "../../assets/img/thumbs-down.svg";

interface PersonCardProps extends IPerson {}

const PersonCard: FC<PersonCardProps> = ({
  name,
  description,
  category,
  picture,
  lastUpdated,
  votes,
}) => {
  const dateText = `${formatDistanceStrict(
    new Date(),
    new Date(lastUpdated)
  )} ago in ${category}`;

  return (
    <li className="person-card">
      <img
        className="person-card__image"
        src={`assets/img/${picture}`}
        alt={name}
      />
      {votes.positive >= votes.negative && (
        <img
          className="person-card__thumb--positive"
          src={thumbUp}
          alt="thumbs up"
        />
      )}
      {votes.positive < votes.negative && (
        <img
          className="person-card__thumb--negative"
          src={thumbDown}
          alt="thumbs down"
        />
      )}
      <div className="person-card__content">
        <div className="content__info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="content__vote">
          <small>{dateText}</small>
          <div className="person-card__actions">
            <button className="icon-button" aria-label="thumbs up">
              <img src={thumbUp} alt="thumbs up" />
            </button>
            <button className="icon-button" aria-label="thumbs down">
              <img src={thumbDown} alt="thumbs down" />
            </button>
            <button className="vote-button">Vote Now</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PersonCard;
