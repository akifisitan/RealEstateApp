import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import { getAnalyticsByUserId } from "../../../services/PropertyService";

export const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  const fetchData = async () => {
    const response = await getAnalyticsByUserId();
    if (response && response.statusCode === 200) {
      const outerList = [];
      for (const [key, value] of Object.entries(response.data)) {
        const innerList = [];
        innerList.push([key, "Number"]);
        for (const [k, v] of Object.entries(value)) {
          innerList.push([k, v]);
        }
        outerList.push(innerList);
      }
      setAnalytics(outerList);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      {isLoading ? (
        <div className="w-12 mx-auto">
          <span className="loading loading-spinner loading-lg text-accent"></span>
        </div>
      ) : analytics.length != 0 && analytics[0].length > 1 ? (
        <div className="h-96 carousel rounded-box mx-auto">
          {analytics.map((item, i) => (
            <div key={i} className="carousel-item">
              <div>
                <Chart
                  chartType="PieChart"
                  data={item}
                  options={{
                    is3D: true,
                    backgroundColor: "#1d232a",
                    legend: {
                      textStyle: {
                        color: "white",
                      },
                    },
                  }}
                  width={"372px"}
                  height={"300px"}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pl-2">No property data</div>
      )}
    </div>
  );
};
