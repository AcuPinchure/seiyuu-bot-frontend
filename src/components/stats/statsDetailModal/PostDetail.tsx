import { Typography } from "@mui/material";
import { Check, X } from "@phosphor-icons/react";

interface PostDetailProps {
  startDate: string;
  endDate: string;
  interval: string; // toLocaleString
  posts: string; // toLocaleString
  scheduledInterval: string;
  actualInterval: string;
  isActive: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({
  startDate,
  endDate,
  interval,
  posts,
  scheduledInterval,
  actualInterval,
  isActive,
}) => {
  const tableContent = [
    {
      title: "Start Date",
      value: startDate,
    },
    {
      title: "End Date",
      value: endDate,
    },
    {
      title: "Interval",
      value: interval,
    },
    {
      title: "Posts",
      value: posts,
    },
    {
      title: "Sceduled Interval",
      value: scheduledInterval,
    },
    {
      title: "Actual Interval",
      value: actualInterval,
    },
    {
      title: "Is Active",
      value: isActive ? <Check /> : <X />,
    },
  ];

  return (
    <table>
      <tbody>
        {tableContent.map((row) => (
          <tr>
            <td>
              <Typography variant="body1" fontWeight={500} mr={2} my={0.5}>
                {row.title}
              </Typography>
            </td>
            <td>
              <Typography variant="body1">{row.value}</Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostDetail;
