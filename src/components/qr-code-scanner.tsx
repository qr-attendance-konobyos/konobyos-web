import {
  Html5Qrcode,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import React, { useEffect } from "react";

const safetyList: Html5Qrcode[] = [];
function clearDuplicate(scanner: Html5Qrcode) {
  if (safetyList.includes(scanner)) return;
  safetyList.push(scanner);
  if (safetyList.length > 1) {
    if (safetyList[0].isScanning) safetyList[0].stop();
    safetyList.shift();
  }
}

export const QrCodeScanner: React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
    onRead?: QrcodeSuccessCallback;
    onError?: QrcodeErrorCallback;
    id: string;
  }
> = ({ onRead, onError, ...props }) => {
  useEffect(() => {
    const scanner = new Html5Qrcode(props.id, {
      verbose: false,
    });
    clearDuplicate(scanner);

    function clear() {
      if (scanner.isScanning) {
        scanner.stop();
      }
    }

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 5,
          aspectRatio: 1,
        },
        (...par) => {
          onRead?.(...par);
          clear();
        },
        (...par) => {
          onError?.(...par);
        }
      )
      .then(() => {
        clearDuplicate(scanner);
      });

    return () => clear();
  }, [onError, onRead, props.id]);

  return <div {...props} />;
};
