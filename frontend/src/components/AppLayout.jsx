import { Layout } from "antd";
import Navbar from "./Navbar";

const { Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "24px" }}>
        {children}
      </Content>
    </Layout>
  );
}
