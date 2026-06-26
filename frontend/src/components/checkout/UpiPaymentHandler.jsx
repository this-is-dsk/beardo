import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const UpiPaymentHandler = ({ amount, merchantName = "BeardoClone", upiId = "merchant@upi", onSuccess, onCancel }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const upiUrl = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR`;

  useEffect(() => {
    // Check if the device is a mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
        return true;
      }
      return window.innerWidth <= 768;
    };
    
    setIsMobile(checkMobile());
  }, []);

  const handleMobileClick = () => {
    window.location.href = upiUrl;
    // Simulate checking status after returning from app
    setTimeout(() => {
      setPaymentStatus('verifying');
      setTimeout(() => {
        setPaymentStatus('success');
        if (onSuccess) onSuccess('mock_upi_txn_123');
      }, 3000);
    }, 2000);
  };

  const simulateDesktopScan = () => {
    setPaymentStatus('verifying');
    setTimeout(() => {
      setPaymentStatus('success');
      if (onSuccess) onSuccess('mock_upi_txn_desktop_456');
    }, 2000);
  };

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-sm text-center">
      <h3 className="text-xl font-bold uppercase text-white mb-4">UPI Payment</h3>
      
      {paymentStatus === 'pending' && (
        <>
          <p className="text-gray-400 text-sm mb-6">Pay securely via any UPI App</p>
          
          {isMobile ? (
            <button 
              onClick={handleMobileClick}
              className="bg-[#cc0000] text-white px-8 py-4 font-bold uppercase tracking-widest w-full rounded-sm"
            >
              Open UPI App to Pay ₹{amount}
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-sm inline-block mb-4">
                <QRCodeSVG value={upiUrl} size={200} />
              </div>
              <p className="text-gray-400 text-sm mb-4">Scan QR code using any UPI app</p>
              
              {/* Development helper to simulate scan */}
              <button 
                onClick={simulateDesktopScan}
                className="text-xs text-[#cc0000] underline"
              >
                (Dev: Simulate Successful Scan)
              </button>
            </div>
          )}
        </>
      )}

      {paymentStatus === 'verifying' && (
        <div className="py-8">
          <div className="w-8 h-8 border-4 border-[#cc0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-bold animate-pulse">Verifying Payment...</p>
          <p className="text-gray-500 text-xs mt-2">Please do not close this window</p>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div className="py-8 text-[#00cc00]">
          <div className="w-16 h-16 rounded-full border-4 border-[#00cc00] flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <p className="font-bold text-lg">Payment Successful</p>
        </div>
      )}

      <button 
        onClick={onCancel}
        disabled={paymentStatus === 'verifying'}
        className="mt-6 text-gray-500 hover:text-white text-sm transition-colors"
      >
        Cancel Payment
      </button>
    </div>
  );
};
