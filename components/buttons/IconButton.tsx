import { TablerIcon } from "@tabler/icons-react";
import React from "react";

interface IconButtonProps {
  Icon: TablerIcon;
  onClick: () => void;
}

const IconButton = ({ Icon, onClick }: IconButtonProps) => (
  <span
    className="cursor-pointer flex items-center space-x-2"
    onClick={onClick}
  >
    <Icon size={22} />
  </span>
);

export default IconButton;