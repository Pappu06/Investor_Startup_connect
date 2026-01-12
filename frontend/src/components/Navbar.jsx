import { Layout, Dropdown, Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        👤 {user?.name}
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={logout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#001529",
        padding: "0 24px"
      }}
    >
      {/* LOGO */}
      <h2 style={{ color: "white", margin: 0, cursor: "pointer" }}
          onClick={() =>
            navigate(user?.role === "business" ? "/business" : "/investor")
          }>
        🌉 Bridge
      </h2>

      {/* PROFILE DROPDOWN */}
      <Dropdown overlay={menu} placement="bottomRight">
        <div style={{ cursor: "pointer", color: "white" }}>
          <Avatar icon={<UserOutlined />} />
          <span style={{ marginLeft: "8px" }}>
            {user?.name}
          </span>
        </div>
      </Dropdown>
    </Header>
  );
}
