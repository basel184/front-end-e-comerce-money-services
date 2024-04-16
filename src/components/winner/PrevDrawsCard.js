/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
function PrevDrawsCard({ cardData }) {
  return (
    <a
      href={cardData?.link}
      target="_blank"
      rel="noreferrer"
      className="prev-card-container"
    >
      <img className="cardImg" alt="" src={cardData?.photo} />
      <p id="card-title">{cardData?.title}</p>
    </a>
  );
}

export default PrevDrawsCard;
