import "../css/infoBox.css";

// Used to display temp and humidity from the database
// prettier-ignore
export default function InfoBox({ infoName, value}: { infoName: string; value: String | number | undefined; }) {
  return (
    <div className="info-box">
      <h2>{infoName}</h2>
      <p>{value}</p>
    </div>
  );
}
