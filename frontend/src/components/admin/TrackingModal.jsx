import React from "react";

const TrackingModal = ({
  isOpen,
  onClose,
  trackingForm,
  setTrackingForm,
  onSave
}) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-[#111]">
            Manage Tracking
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

  {/* Progress */}

  <div>

    <label className="block text-sm font-semibold mb-2">
      Tracking Progress
    </label>

    <input
  type="range"
  min="0"
  max="100"
  value={trackingForm.progress}
  onChange={(e) =>
    setTrackingForm({
      ...trackingForm,
      progress: Number(e.target.value)
    })
  }
  className="w-full"
/>

<p className="mt-2 text-sm font-bold text-[#e30613]">
  {trackingForm.progress}%
</p>

  </div>

  {/* Current Location */}

  <div>

    <label className="block text-sm font-semibold mb-2">
      Current Location
    </label>

    <select
  value={trackingForm.currentLocation}
  onChange={(e) =>
    setTrackingForm({
      ...trackingForm,
      currentLocation: e.target.value
    })
  }
  className="w-full border rounded-lg p-3"
>

      <option>Beardo Warehouse, Ahmedabad</option>

      <option>Jaipur Distribution Hub</option>

      <option>Ajmer Highway</option>

      <option>Near Vaishali Nagar</option>

      <option>Out For Delivery</option>

      <option>Delivered</option>

    </select>

  </div>

  {/* ETA */}

  <div>

    <label className="block text-sm font-semibold mb-2">
      ETA
    </label>

    <input
  type="text"
  value={trackingForm.eta}
  onChange={(e) =>
    setTrackingForm({
      ...trackingForm,
      eta: e.target.value
    })
  }
  className="w-full border rounded-lg p-3"
/>

  </div>

  <button
  onClick={onSave}
  className="w-full bg-[#e30613] hover:bg-red-700 text-white py-3 rounded-lg font-bold"
>
  Save Tracking
</button>

</div>

      </div>

    </div>

  );

};

export default TrackingModal;