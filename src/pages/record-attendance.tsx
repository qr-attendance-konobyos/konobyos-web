import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import React from "react";
import { validate } from "uuid";
import { AttendanceTypes, useCreateAttendanceMutation } from "../api";
import "./attendance.scss";

export const RecordAttendance = () => {
  const [type, setType] = React.useState<AttendanceTypes>("LATE");
  const [quickMode, setQuickMode] = React.useState("off");
  const [foundUser, setFoundUser] = React.useState<string | null>(null);
  const attendanceMutation = useCreateAttendanceMutation();

  const handleReadCode = (code: IDetectedBarcode) => {
    if (code.format != "text") return;
    const value = code.rawValue;

    // make sure it's a valid uuid
    if (!validate(value)) return;

    if (quickMode == "on") {
      // create attendance if quick mode is on
      // create attendance
      attendanceMutation.mutate({
        studentId: value,
        type,
      });
      return;
    } else {
      // show found user and ask for confirmation
      setFoundUser(value);
    }
  };

  function handleRecord() {
    if (foundUser) {
      attendanceMutation
        .mutateAsync({
          studentId: foundUser,
          type,
        })
        .then(() => setFoundUser(null));
    }
  }

  return (
    <div className="record-attendance">
      <h2>Record Attendance</h2>
      {attendanceMutation.isPending ? (
        <div className="loading" />
      ) : (
        <>
          <SelectType
            label="Type"
            value={type}
            onSelect={setType}
            options={[
              { label: "PRESENT", val: "PRESENT" },
              { label: "ABSENT", val: "ABSENT" },
              { label: "LATE", val: "LATE" },
            ]}
          />
          <SelectType
            label="Quick Mode"
            options={[
              { label: "OFF", val: "off" },
              { label: "ON", val: "on" },
            ]}
            value={quickMode}
            onSelect={setQuickMode}
          />
          <h2>Scan</h2>
          {!foundUser && (
            <Scanner
              classNames={{ container: "qr-scanner" }}
              onScan={(codes) => codes.map(handleReadCode)}
            />
          )}

          {foundUser && (
            <div className="action-button">
              <button className="button primary" onClick={handleRecord}>
                Record
              </button>
              <button className="button outline" onClick={handleRecord}>
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function SelectType<T>(props: {
  value: string;
  label: string;
  onSelect: (val: T) => void;
  options: { label: string; val: T }[];
}) {
  return (
    <div>
      <span>{props.label}</span>
      <div className="select-button">
        {props.options.map((option) => (
          <button
            key={`${option.val}`}
            className={`button ${props.value == option.val ? "active" : ""}`}
            onClick={() => props.onSelect(option.val)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
