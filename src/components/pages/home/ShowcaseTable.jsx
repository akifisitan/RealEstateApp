import { useNavigate } from "react-router-dom";

export const ShowcaseTable = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = (entry) => {
    navigate("/details", {
      replace: false,
      state: { propertyId: entry.id },
    });
  };

  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-2 pr-4 pt-8">
      {data.map((property) => (
        <div key={property.id}>
          <img
            className="block m-auto cursor-pointer w-32 h-24"
            onClick={() => handleClick(property)}
            src={property.thumbnail}
            alt="property"
          />
          <p className="text-center">
            {property.type} {`(${property.status})`}
            <br />
            {property.price} {`${property.currency}`}
          </p>
        </div>
      ))}
    </div>
  );
};
