import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export function AttendanceReport() {
  const reports = [
    {
      date: "2021-10-01",
      present: 20,
      permission: 1,
      absent: 1,
    },
    {
      date: "2021-10-02",
      present: 20,
      permission: 1,
      absent: 1,
    },
    {
      date: "2021-10-03",
      present: 20,
      permission: 1,
      absent: 1,
    },
  ].sort((a, b) => (a.date > b.date ? -1 : 1));
  return (
    <div className="container attendance-report">
      <div className="title-bar">
        <h1>Attendance Report</h1>
        <Link to="/attendance" className="button icon primary">
          <FaPlus />
        </Link>
      </div>
      {reports.map((report) => (
        <AttendanceDateSummeryCard key={report.date} {...report} />
      ))}
    </div>
  );
}

function AttendanceDateSummeryCard(props: {
  date: string;
  present: number;
  permission: number;
  absent: number;
}) {
  const date = props.date;
  return (
    <div className="card">
      <div className="title">{date}</div>
      <div className="content">
        <div className="present">{props.present}</div>
        <div className="permission">{props.permission}</div>
        <div className="absent">{props.absent}</div>
      </div>
    </div>
  );
}
