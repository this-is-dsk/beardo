import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const TrackingTimeline = ({ steps, currentStep }) => {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-5">

      <h2 className="text-[20px] font-bold text-[#111] mb-6">
        Tracking History
      </h2>

      <div className="relative">

        {steps.map((step, index) => (

          <div
            key={index}
            className="relative flex gap-4 pb-8 last:pb-0"
          >

            {/* Vertical Line */}

            {index !== steps.length - 1 && (

              <div
                className={`absolute left-[15px] top-8 w-[2px] h-full ${
                  index < currentStep
                    ? "bg-[#e30613]"
                    : "bg-gray-200"
                }`}
              ></div>

            )}

            {/* Circle */}

            <div
              className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-[#e30613]"
                  : "bg-gray-300"
              }`}
            >

              {index <= currentStep ? (

                <FaCheckCircle
                  className="text-white"
                  size={14}
                />

              ) : (

                <FaCircle
                  className="text-white"
                  size={8}
                />

              )}

            </div>

            {/* Text */}

            <div className="flex-1">

              <h3
                className={`font-bold ${
                  index <= currentStep
                    ? "text-[#111]"
                    : "text-gray-400"
                }`}
              >
                {step}
              </h3>

              <p className="text-sm text-gray-500 mt-1">

                {index === currentStep &&
                  "Your package is currently at this stage."}

                {index < currentStep &&
                  "Completed successfully."}

                {index > currentStep &&
                  "Waiting..."}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default TrackingTimeline;